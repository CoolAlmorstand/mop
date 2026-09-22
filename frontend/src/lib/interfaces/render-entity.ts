
import type { IEntityDirection } from "@mop/shared-types";
import type { AnimatedSprite, Spritesheet } from "pixi.js";


export interface IRenderEntity {
  //animation name, spriteSheet
  spriteSheets: Record<string, Spritesheet>;
  currentSpriteSheet: string;
  animatedSprite: AnimatedSprite;

  //what type of entity this is eg creeper, player, sheep
  entityType: string;
  direction: IEntityDirection;
  //uuid
  id: string;

  playAnimation(name: string, speed: number, loop: boolean): void;
  stopAnimation(name: string): void;
  changeSpriteSheet(name: string): void;
}
