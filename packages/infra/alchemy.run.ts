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
  Effect.gen(function* () {
    const showcaseWorker = yield* Cloudflare.Website.Astro("showcase", {
      rootDir: "../../apps/showcase",
      env: {
        SESSION: Cloudflare.KV.Namespace("session"),
        IMAGES: Cloudflare.Images.Images(),
      },
      dev: {
        port: 4321,
      },
    });

    return {
      showcase: showcaseWorker.url,
    };
  }),
);
