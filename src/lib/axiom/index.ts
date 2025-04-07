import { Axiom } from "@axiomhq/js";
import { env } from "~/env";

export const axiom = new Axiom({
  token: env.NEXT_PUBLIC_AXIOM_TOKEN,
});
