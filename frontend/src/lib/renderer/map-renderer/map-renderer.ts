
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer"
import type { ITilesTexureMap } from "$lib/types"

import { Container, Graphics } from "pixi.js"

export class PixiMapRenderer implements IPixiMapRenderer {
  private textureMap: ITilesTexureMap; 
  container: Container = new Container() 

  constructor(textureMap: ITilesTexureMap) {
    this.textureMap = textureMap
  }

  test(): void {
    const rectangle = new Graphics().rect(20, 20, 40, 40).fill("#ffffff")
    this.container.addChild(rectangle)
  }
}
