import { Resend } from "resend";
import { z } from "zod";
import { countries, services } from "~/components/constants";
import { env } from "~/env";
import { routing } from "~/i18n/routing";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ContactEmail } from "~/components/emails";
import { logger } from "~/lib/axiom/server";
import { getTranslations } from "next-intl/server";
import { render } from "@react-email/components";

export const contactData = z.object({
  email: z.string().email(),
  business: z.string(),
  project: z.string(),
  services: z.array(z.enum(services)),
  website: z.string().url().optional(),
  country: z.enum(countries),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  language: z.enum(routing.locales),
});

const resend = new Resend(env.RESEND_API_KEY);
export const emailRouter = createTRPCRouter({
  sendContact: publicProcedure.input(contactData).query(async ({ input }) => {
    const t = await getTranslations("contact.form.confirmation_email");
    const { email, firstName, lastName } = input;
    const subject = t("title");
    const from = `${firstName} ${lastName} <support@team.ryderhorne.design>`;
    const to = [
      `${firstName} ${lastName} <${email}>`,
      // contact@ryderhorne.design does not send to the Google Group for some reason; find a fix if possible
      "Ryder Horne <ryder@ryderhorne.com>",
    ];
    const replyTo = "Ryder Horne Design Support <contact@ryderhorne.design>";
    const react = await ContactEmail({
      name: `${firstName} ${lastName}`,
      input,
    });
    const text = await render(react, {
      plainText: true,
    });
    const res = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      react,
      text,
    });
    if (res.error) {
      logger.error(
        `[sendContact] ${res.error.name}: ${res.error.message}`,
        res.error,
      );
      throw new Error(res.error.message, { cause: res.error.name });
    }
    return res;
  }),
});
