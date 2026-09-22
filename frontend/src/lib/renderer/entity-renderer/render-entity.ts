import type { IRenderEntity } from "$lib/interfaces/render-entity";
import type { IEntityDirection } from "@mop/shared-types";
import type { Spritesheet } from "pixi.js";
import { AnimatedSprite } from "pixi.js";

export class RenderEntity implements IRenderEntity {

  spriteSheets: Record<string, Spritesheet>;
  currentSpriteSheet: string;
  currentAnimation: string;
  animatedSprite: AnimatedSprite;
  entityType: string;
  direction: IEntityDirection = "s";
  id: string;

  constructor(spriteSheets: Record<string, Spritesheet>, id: string, entityType: string ) {
    this.id = id
    this.entityType = entityType
    this.spriteSheets = spriteSheets


    //initailize defulat Spritesheet 
    const [animationName, defaultSpriteSheet] = Object.entries(spriteSheets)[0]
    this.currentSpriteSheet = animationName
    this.currentAnimation = animationName
    this.animatedSprite = new AnimatedSprite(defaultSpriteSheet.animations[animationName])

  }

  playAnimation(name: string, speed: number, loop: boolean): void {

    if(this.currentAnimation == name && this.animatedSprite.playing) {
      return
    }

    this.changeSpriteSheet(name)
    this.animatedSprite.animationSpeed = speed
    this.animatedSprite.loop = loop
    this.animatedSprite.play()
    this.currentAnimation = name
  }

  stopAnimation(name: string): void {
    if(this.currentSpriteSheet != name) {
      this.animatedSprite.stop()
    }
  }

  changeSpriteSheet(name: string): void {
    const spriteSheet = this.spriteSheets[name]
    const animation = spriteSheet?.animations[name]

    console.log(animation)
    if (!animation) {
      throw new Error(`Animation "${name}" does not exist for entity "${this.id}".`)
    }

    this.currentSpriteSheet = name
    this.animatedSprite.textures = animation
  }
}
