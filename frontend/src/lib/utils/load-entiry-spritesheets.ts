


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
    const spritesheetName = pathParts.at(-2)!;
    const spritesheet = await Assets.load<Spritesheet>(spritesheetUrl);

    entitySpritesheets[entityType] ??= {};
    entitySpritesheets[entityType][spritesheetName] = {
      animations: Object.keys(spritesheet.animations),
      spritesheet,
    };
  }

  return entitySpritesheets;
}
