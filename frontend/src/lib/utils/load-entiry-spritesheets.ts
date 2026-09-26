


import { Assets } from "pixi.js";
import type { Spritesheet } from "pixi.js";
import type { IEntitiesSpritesheets } from "$lib/types";

const spritesheetFiles = import.meta.glob("$lib/assets/sprites/*/*/*.json", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export async function loadEntitySpritesheets(): Promise<IEntitiesSpritesheets> {
  const entitySpritesheets = {} as IEntitiesSpritesheets;

  for (const [spritesheetPath, spritesheetUrl] of Object.entries(spritesheetFiles)) {
    const pathParts = spritesheetPath.split("/");
    const entityType = pathParts.at(-3)! as keyof IEntitiesSpritesheets;
    const spritesheetName = pathParts.at(-2)!;
    const spritesheet = await Assets.load<Spritesheet>(spritesheetUrl);

    entitySpritesheets[entityType] ??= {};
    entitySpritesheets[entityType][spritesheetName] = {
      animations: Object.keys(spritesheet.animations),
      spritesheetName,
      spritesheet,
    };
  }

  return entitySpritesheets;
}
