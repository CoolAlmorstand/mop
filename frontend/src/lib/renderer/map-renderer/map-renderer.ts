
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer"
import { Container, Graphics } from "pixi.js"

export class PixiMapRenderer implements IPixiMapRenderer {
  container: Container = new Container() 

  constructor() {

  }

  test(): void {
    const rectangle = new Graphics().rect(20, 20, 40, 40).fill("#ffffff")
    this.container.addChild(rectangle)
  }
}
