"use server";
import { z } from "zod";
import { countries, services } from "~/components/constants";
import { locales } from "~/locales.config";
import { api } from "~/trpc/server";

const contactData = z.object({
  email: z.string().email(),
  business: z.string(),
  project: z.string(),
  services: z.array(z.enum(services)),
  website: z.string().url().optional(),
  country: z.enum(countries),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  language: z.enum(locales),
});
export async function sendContactAction(data: z.infer<typeof contactData>): Promise<{ success: boolean }> {
  const res = await api.email.sendContact(data);
  return res;
};