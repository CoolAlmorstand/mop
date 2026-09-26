
import type { IEntityDirection } from "@mop/shared-types";
import type { IEntitySpritesheets } from "$lib/types";
import type { AnimatedSprite, Spritesheet } from "pixi.js";


export interface IRenderEntity {
  //animation name, spriteSheet
  spriteSheetsMap: IEntitySpritesheets;
  animatedSprite: AnimatedSprite;

  //what type of entity this is eg creeper, player, sheep
  entityType: string;
  direction: IEntityDirection;
  //uuid
  id: string;

  playAnimation(name: string, speed: number, loop: boolean): void;
  stopAnimation(): void;
  changeSpriteSheet(name: string): void;
}
