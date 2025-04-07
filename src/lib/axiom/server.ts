import { axiom } from ".";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";
import { createAxiomRouteHandler, nextJsFormatters } from "@axiomhq/nextjs";
import { env } from "~/env";

export const logger = new Logger({
  transports: [
    new AxiomJSTransport({
      axiom,
      dataset: env.NEXT_PUBLIC_AXIOM_DATASET,
    }),
  ],
  formatters: nextJsFormatters,
});

export const withAxiom = createAxiomRouteHandler(logger);
