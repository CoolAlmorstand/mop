import type { IRenderEntity } from "$lib/interfaces/render-entity";
import type { IEntityDirection } from "@mop/simulation-engine";
import type { IEntitySpritesheets, IEntitySpritesheet } from "$lib/types";

import { AnimatedSprite, Container, Spritesheet, Text } from "pixi.js";

export class RenderEntity implements IRenderEntity {
  private currentSpriteSheet: IEntitySpritesheet;

  spriteSheetsMap: IEntitySpritesheets;
  currentAnimation: string;
  animatedSprite: AnimatedSprite;
  container: Container = new Container(); 
  entityType: string;
  direction: IEntityDirection = "s";
  id: string;

  constructor(spriteSheets: IEntitySpritesheets, id: string, entityType: string ) {
    this.id = id
    this.entityType = entityType
    this.spriteSheetsMap = spriteSheets


    //initailize defulat Spritesheet 
    const defaultSpriteSheet = Object.values(spriteSheets)[0]
    const defaultAnimation = defaultSpriteSheet.animations[0]

    this.currentSpriteSheet = defaultSpriteSheet 
    this.currentAnimation = defaultAnimation

    this.animatedSprite = new AnimatedSprite(defaultSpriteSheet.spritesheet.animations[defaultAnimation])
    this.container.addChild(this.animatedSprite)

  }

  addName(name: string): void {
    const text = new Text({
      text: name,
      style: {
        fill: "white",
        fontSize: 14
      }
    })

    text.x = - ( text.width / 2 ) + ( this.animatedSprite.width / 2) 
    text.y = -10
    const yOffset = this.animatedSprite.height
    

    this.container.addChild(text)
  }

  playAnimation(name: string, speed: number, loop: boolean): void {

    if(this.currentAnimation == name && this.animatedSprite.playing) {
      return
    }

    if(!this.currentSpriteSheet.animations.includes(name)) {
      throw new Error(`animation: ${name} does not exist on current spritesheet: ${this.currentSpriteSheet.spritesheetName}`)
    }

    this.animatedSprite.textures = this.currentSpriteSheet.spritesheet.animations[name]
    this.animatedSprite.animationSpeed = speed
    this.animatedSprite.loop = loop
    this.animatedSprite.play()
    this.currentAnimation = name
  }

  stopAnimation(): void {
    this.animatedSprite.stop()
  }

  changeSpriteSheet(name: string, animationName?: string): void {
    const entitySpritesheet = this.spriteSheetsMap[name]

    if (!entitySpritesheet) {
      throw new Error(`spritesheet "${name}" does not exist for entity "${this.id}".`)
    }

    if(animationName && !entitySpritesheet.animations.includes(animationName)) {
      throw new Error(`animation: ${animationName} does not exist on spritesheet: ${name}`)
    }

    const defaultAnimation = animationName ? animationName : entitySpritesheet.animations[0]
    
    this.currentSpriteSheet = entitySpritesheet
    this.animatedSprite.textures = entitySpritesheet.spritesheet.animations[defaultAnimation] 
  }
}
