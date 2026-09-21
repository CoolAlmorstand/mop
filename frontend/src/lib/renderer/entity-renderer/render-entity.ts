import type { IRenderEntity } from "$lib/interfaces/render-entity";
import type { Spritesheet } from "pixi.js";
import { AnimatedSprite } from "pixi.js";

export class RenderEntity implements IRenderEntity {

  spriteSheets: Record<string, Spritesheet>;
  currentSpriteSheet: string;
  animatedSprite: AnimatedSprite;
  id: string;

  constructor(spriteSheets: Record<string, Spritesheet>, id: string ) {
    this.id = id
    this.spriteSheets = spriteSheets

    //initailize defulat Spritesheet 
    const [animationName, defaultSpriteSheet] = Object.entries(spriteSheets)[0]
    this.currentSpriteSheet = animationName
    this.animatedSprite = new AnimatedSprite(defaultSpriteSheet.animations[animationName])

  }

  playAnimation(name: string, speed: number, loop: boolean): void {
    this.changeSpriteSheet(name)
    this.animatedSprite.animationSpeed = speed
    this.animatedSprite.loop = loop
    this.animatedSprite.play()
  }

  stopAnimation(name: string): void {
    if(this.currentSpriteSheet != name) {
      this.animatedSprite.stop()
    }
  }

  changeSpriteSheet(name: string): void {
    const spriteSheet = this.spriteSheets[name]
    const animation = spriteSheet?.animations[name]

    if (!animation) {
      throw new Error(`Animation "${name}" does not exist for entity "${this.id}".`)
    }

    this.currentSpriteSheet = name
    this.animatedSprite.textures = animation
  }
}
