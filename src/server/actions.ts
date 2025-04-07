"use server";
import { z } from "zod";
import { api } from "~/trpc/server";
import { contactData } from "./api/routers/email";

export async function sendContactAction(
  data: z.infer<typeof contactData>,
): ReturnType<typeof api.email.sendContact> {
  const res = await api.email.sendContact(data);
  return res;
}
