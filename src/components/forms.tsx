"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useLocale, useTranslations } from "next-intl";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { countries, services } from "./constants";
import { sendContactAction } from "~/server/actions";
import { toast } from "sonner";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();

  const contactForm = z.object({
    firstName: z.string().min(2, {
      message: t("name.first.error"),
    }),
    lastName: z.string().min(2, {
      message: t("name.last.error"),
    }),
    email: z.string().email({
      message: t("email.error"),
    }),
    country: z.enum(countries, {
      message: t("country.error"),
    }),
    website: z
      .string()
      .url({
        message: t("website.error"),
      })
      .optional(),
    business: z.string().min(8, {
      message: t("business.error"),
    }),
    project: z.string().min(8, {
      message: t("project.error"),
    }),
    services: z.array(z.enum(services)).min(1, {
      message: t("services.error"),
    }),
  });
  const form = useForm<z.infer<typeof contactForm>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "us",
      website: "",
      business: "",
      project: "",
      services: [],
    },
    resolver: zodResolver(contactForm),
  });

  async function sendContact(data: z.infer<typeof contactForm>) {
    toast(t("status.pending.title"), {
      description: t("status.pending.description"),
    });
    const res = await sendContactAction({
      ...data,
      language: locale,
    });
    if (res.success) {
      toast(t("status.success.title"), {
        description: t("status.success.description"),
      });
    } else {
      toast(t("status.error.title"), {
        description: t("status.error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendContact)}
        className="flex flex-col gap-4"
      >
        <section className="flex flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="md:basis-1/2">
                <FormLabel>{t("name.first.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name.first.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{t("name.first.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="md:basis-1/2">
                <FormLabel>{t("name.last.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("name.last.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{t("name.last.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <section className="flex flex-col gap-2 md:flex-row">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:basis-1/2">
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("email.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{t("email.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="md:basis-1/2">
                <FormLabel>{t("country.label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("country.label")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t("country.label")}</SelectLabel>
                      <SelectSeparator />
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {t("country.options." + country)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>{t("country.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("website.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("website.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("website.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="business"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("business.label")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("business.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("business.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("project.label")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("project.placeholder")} {...field} />
              </FormControl>
              <FormDescription>{t("project.description")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <FormLabel>{t("services.label")}</FormLabel>
              <FormDescription>{t("services.description")}</FormDescription>
              {services.map((service) => (
                <FormField
                  key={service}
                  control={form.control}
                  name="services"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={service}
                        className="flex items-start gap-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(service)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, service])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== service,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {useTranslations("services")(service + ".name")}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t("submit")}</Button>
      </form>
    </Form>
  );
}
