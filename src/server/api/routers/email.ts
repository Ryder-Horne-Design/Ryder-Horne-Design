import { Resend } from "resend";
import { z } from "zod";
import { countries, services } from "~/components/constants";
import { env } from "~/env";
import { routing } from "~/i18n/routing";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ContactEmail } from "~/components/emails";
import { logger } from "~/lib/axiom/server";

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
    const { email, firstName, lastName } = input;
    const subject = `Inquiry from ${firstName} ${lastName}`;
    const from = `${firstName} ${lastName} <team@contact.ryderhorne.design>`;
    const to = [
      `${firstName} ${lastName} <${email}>`,
      "Ryder Horne Design Support <contact@ryderhorne.design>",
    ];
    const replyTo = `Ryder Horne Design Support <contact@ryderhorne.design>`;
    const res = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      react: await ContactEmail({
        name: `${firstName} ${lastName}`,
        input,
      }),
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
