"use client";
import { axiom } from ".";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";
import { createUseLogger, createWebVitalsComponent } from "@axiomhq/react";
import { nextJsFormatters } from "@axiomhq/nextjs/client";

export const logger = new Logger({
  transports: [
    new AxiomJSTransport({
      axiom,
      dataset: process.env.NEXT_PUBLIC_AXIOM_DATASET!,
    }),
  ],
  formatters: nextJsFormatters,
});

export const useLogger = createUseLogger(logger);
export const WebVitals = createWebVitalsComponent(logger);
