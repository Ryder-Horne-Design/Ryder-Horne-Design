import { getImageProps } from "next/image";
import { type ImgProps } from "next/dist/shared/lib/get-img-props";
import { getFormatter, getTranslations } from "next-intl/server";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { z } from "zod";
import { contactData } from "~/server/api/routers/email";
import { env } from "~/env";
import { languages } from "./constants";
import { Locale } from "next-intl";

function prefixImageSrcs(props: ImgProps): ImgProps {
  props.src = `https://ryderhorne.design${props.src}`;
  props.srcSet = props.srcSet
    ?.split(", ")
    .map((srcSet) => {
      return `https://ryderhorne.design${srcSet}`;
    })
    .join(", ");
  return props;
}

export async function ContactEmail({
  name,
  input,
}: {
  name: `${string} ${string}`;
  input: z.infer<typeof contactData>;
}) {
  const formatter = await getFormatter();
  const noNamespaceT = await getTranslations();
  const servicesT = await getTranslations("services");
  const formT = await getTranslations("contact.form");
  const t = await getTranslations("contact.form.confirmation_email");

  const { props } = getImageProps({
    src: "https://ryderhorne.design/assets/og/banner.png",
    alt: noNamespaceT("banner"),
    width: 1200,
    height: 630,
    sizes: "100vw",
    style: {
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
      height: "5rem",
    },
  });
  const nextImg =
    env.NODE_ENV === "production" ? prefixImageSrcs(props) : props;

  return (
    <Html lang={input.language}>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <Tailwind>
        <Body className="m-auto bg-slate-50 p-4 font-sans text-lg text-slate-950">
          <Preview>{t("preview")}</Preview>
          <Container className="rounded-3xl border-2 border-solid border-slate-200 p-4 shadow-lg">
            <Section className="mb-6">
              <Img {...nextImg} className="rounded-xl" />
            </Section>
            <Heading as="h1" className="mb-3 text-3xl font-bold">
              {t("title")}
            </Heading>
            <Text>{t("text", { name })}</Text>
            <Section className="text-sm text-slate-500">
              <Text className="my-0 text-base font-semibold">{t("info")}</Text>
              {Object.keys(input).map((key) => {
                if (key !== "services" && key !== "language") {
                  const field =
                    key !== "firstName" && key !== "lastName"
                      ? formT(
                          `${key as keyof Omit<typeof input, "firstName" | "lastName" | "language">}.label`,
                        )
                      : formT(
                          `name.${(key as keyof Pick<typeof input, "firstName" | "lastName">).replace("Name", "") as "first" | "last"}.label`,
                        );

                  return (
                    <Text className="m-0 pl-2" key={key}>
                      {t("input", {
                        field,
                        value:
                          input[key as keyof Omit<typeof input, "services">] ??
                          "N/A",
                      })}
                    </Text>
                  );
                } else if (key === "services") {
                  const field = formT("services.label");

                  const toFormat = input[
                    key as keyof Pick<typeof input, "services">
                  ]!.map((service) => servicesT(`${service}.name`));

                  return (
                    <Text className="m-0 pl-2" key={key}>
                      {t("input", {
                        field,
                        value: formatter.list(toFormat, {
                          type: "conjunction",
                        }),
                      })}
                    </Text>
                  );
                } else if (key === "language") {
                  return (
                    <Text className="m-0 pl-2" key={key}>
                      {t("input", {
                        field: noNamespaceT("language"),
                        value:
                          languages[
                            input[key as keyof Pick<typeof input, "language">]
                          ],
                      })}
                    </Text>
                  );
                }
              })}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
