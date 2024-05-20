import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { countries, services } from "~/components/constants";
import { locales } from "~/locales.config";
import { createTransport } from "nodemailer";
import { env } from "~/env";

const transport = createTransport({
  host: "mail.google.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    type: "oauth2",
    user: "ryder@ryderhorne.com",
    clientId: env.GMAIL_CLIENT_ID,
    clientSecret: env.GMAIL_CLIENT_SECRET,
    refreshToken: env.GMAIL_REFRESH_TOKEN,
    accessToken: env.GMAIL_ACCESS_TOKEN,
  },
});
export const emailRouter = createTRPCRouter({
  sendContact: publicProcedure.input(z.object({
    email: z.string().email(),
    business: z.string(),
    project: z.string(),
    services: z.array(z.enum(services)),
    website: z.string().url().optional(),
    country: z.enum(countries),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    language: z.enum(locales),
  })).query(async ({ input }) => {
    try {
      await transport.verify();
      const { email, business, project, services, website, country, firstName, lastName, language } = input;
      const body = `First name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\nBusiness: ${business}\nProject: ${project}\nServices: ${services.join(", ")}\nWebsite: ${website ? website : "N/A"}\nCountry: ${country}\nLanguage: ${language}`;
      const subject = `Inquiry from ${firstName} ${lastName}`;
      const from = `${firstName} ${lastName} <contact@ryderhorne.design>`;
      const to = `Ryder Horne Design Support <contact@ryderhorne.design>`;
      const replyTo = `${firstName} ${lastName} <${email}>`;
      await transport.sendMail({
        from,
        to,
        replyTo,
        subject,
        text: body,
      });
      return {
        success: true
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
      };
    }
  }),
});