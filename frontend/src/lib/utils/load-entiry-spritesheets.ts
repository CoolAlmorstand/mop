


import { Assets } from "pixi.js";
import type { Spritesheet } from "pixi.js";
import type { IEntitySpritesheets } from "$lib/types";

const spritesheetFiles = import.meta.glob("$lib/assets/sprites/*/*/*.json", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export async function loadEntitySpritesheets(): Promise<IEntitySpritesheets> {
  const entitySpritesheets = {} as IEntitySpritesheets;

  for (const [spritesheetPath, spritesheetUrl] of Object.entries(spritesheetFiles)) {
    const pathParts = spritesheetPath.split("/");
    const entityType = pathParts.at(-3)! as keyof IEntitySpritesheets;
    const animationName = pathParts.at(-2)!;

    entitySpritesheets[entityType] ??= {};
    entitySpritesheets[entityType][animationName] = await Assets.load<Spritesheet>(spritesheetUrl);
  }

  return entitySpritesheets;
}
