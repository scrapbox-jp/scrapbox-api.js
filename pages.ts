import type {
  NotFoundError,
  NotMemberError,
  Page,
} from "https://raw.githubusercontent.com/scrapbox-jp/types/0.0.2/scrapbox.d.ts";
import { isJSON } from "https://deno.land/x/is_json@v1.0.2/mod.ts";
import { createCookieHeaders, Options } from "./options.ts";
import { toLc } from "./lc.ts";

type PageProps = {
  project: string;
  page: string;
  followRename?: boolean;
} & Options;

export const pages = {
  async get(
    { project, page, sid, fetch = globalThis.fetch, followRename = false }:
      PageProps,
  ) {
    const response = await fetch(
      `https://scrapbox.io/api/pages/${project}/${toLc(page)}${
        followRename ? `?followRename=true` : ""
      }`,
      sid !== undefined ? createCookieHeaders(sid) : undefined,
    );

    if (!response.ok) {
      const text = await response.text();
      if (!isJSON(text)) throw Error(response.statusText);

      const json = await response.json();
      switch (json.name) {
        case "NotMemberError":
          return json as NotMemberError;
        case "NotFoundError":
          return json as NotFoundError;
        default:
          throw Error(response.statusText);
      }
    }

    const json = (await response.json()) as Page;
    return json;
  },
};
