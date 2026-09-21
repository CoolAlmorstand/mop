
import type { AnimatedSprite, Spritesheet } from "pixi.js";


export interface IRenderEntity {
  //animation name, spriteSheet
  spriteSheets: Record<string, Spritesheet>;
  currentSpriteSheet: string;
  animatedSprite: AnimatedSprite;
  id: string;

  playAnimation(name: string, speed: number, loop: boolean): void;
  stopAnimation(name: string): void;
  changeSpriteSheet(name: string): void;
}
