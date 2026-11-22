import * as Cloudflare from "@alchemy.run/cloudflare";
import * as Alchemy from "alchemy";
import * as Effect from "effect/Effect";
import "varlock/auto-load";

export default Alchemy.Stack(
  "nawet",
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* nawet() {
    const showcaseWorker = yield* Cloudflare.Website.Astro("showcase", {
      astro: {
        site: "https://nawet-ds.abbes.dev",
      },
      dev: {
        port: 4321,
      },
      domain: "nawet-ds.abbes.dev",
      env: {
        IMAGES: Cloudflare.Images.Images(),
        SESSION: Cloudflare.KV.Namespace("session"),
      },
      rootDir: "../apps/showcase",
    });

    return {
      showcase: showcaseWorker.url,
    };
  })
);
