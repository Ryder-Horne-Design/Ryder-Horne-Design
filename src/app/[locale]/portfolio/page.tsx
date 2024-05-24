import { useTranslations } from "next-intl";
import Image from "next/image";
import { type Params, metadata } from "~/components/metadata";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel";
import { Link } from "~/navigation";

export async function generateMetadata({ params }: { params: Params }) {
  return await metadata({
    params,
    namespace: "portfolio",
  });
};

const websites: {
  namespace: string;
  src: string;
}[] = [
  {
    namespace: "pcb",
    src: "/assets/portfolio/petite-curio-boutique.png",
  },
  {
    namespace: "sr",
    src: "/assets/portfolio/sabercat-robotics.png",
  },
  {
    namespace: "sis",
    src: "/assets/portfolio/sisters-in-stem.png",
  },
];
export default function Portfolio() {
  const t = useTranslations("portfolio");

  return (
    <main className="flex flex-col gap-4 p-4">
      <header className="flex flex-col gap-4 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-400 p-4 text-slate-50 shadow lg:basis-1/2 lg:p-6">
        <h1 className="text-4xl">{t("name")}</h1>
        <p className="text-xl">{t("description")}</p>
      </header>
      <main className="px-12">
        <Carousel>
          <CarouselContent>
            {
              websites.map(({ namespace, src }, index) => (
                <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3" key={index + 1}>
                  <Link href={"/portfolio/" + (index + 1).toString()} className="flex flex-col">
                    <Image src={src} alt={t("websites." + namespace + ".name")} width={2880} height={2048} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 40vw, 80vw" className="rounded-xl mb-2 border-[6px] border-transparent bg-[linear-gradient(to_bottom_right,#0EA5E9,#34D399)] bg-[length:calc(100%+12px)_calc(100%+12px)] bg-[position:-6px_-6px] bg-no-repeat object-cover shadow lg:basis-1/2" />
                    <p className="text-base font-semibold">{t("websites." + namespace + ".name")}</p>
                    <p className="text-sm text-ellipsis line-clamp-1 text-slate-700/80">{t("websites." + namespace + ".description")}</p>
                  </Link>
                </CarouselItem>
              ))
            }
          </CarouselContent>
          <CarouselNext className="-right-12" />
          <CarouselPrevious className="-left-12" />
        </Carousel>
      </main>
    </main>
  );
};