
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer"
import type { ITilesTexureMap } from "$lib/types"

import { Container, Sprite } from "pixi.js"

export class PixiMapRenderer implements IPixiMapRenderer {
  private textureMap: ITilesTexureMap; 
  private tileSize: number = 16;
  container: Container = new Container() 

  constructor(textureMap: ITilesTexureMap) {
    this.textureMap = textureMap
  }

  test(): void {
    const grassTextures = Object.values(this.textureMap.grass ?? {})

    for (let row = 0; row < 4; row++) {
      for (let column = 0; column < 4; column++) {
        const texture = grassTextures[row * 4 + column]
        if (!texture) continue

        const sprite = new Sprite(texture)
        sprite.x = column * this.tileSize * 2
        sprite.y = row * this.tileSize * 2
        sprite.width = this.tileSize
        sprite.height = this.tileSize
        sprite.scale.set(2, 2)
        this.container.addChild(sprite)
      }
    }
  }
}
