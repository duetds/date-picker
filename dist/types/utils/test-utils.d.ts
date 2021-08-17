import { E2EPage } from "@stencil/core/testing";
import { Page as PuppeteerPage } from "puppeteer";
export declare type DuetE2EPage = E2EPage & Pick<PuppeteerPage, "screenshot" | "viewport">;
declare type DuetE2EPageOptions = {
  html: string;
  viewportWidth: number;
};
export declare function createPage(optionsOrHtml?: string | DuetE2EPageOptions): Promise<DuetE2EPage>;
export {};
