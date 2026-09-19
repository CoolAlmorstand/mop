import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer";
import type { IMopRenderer } from "$lib/interfaces/renderer";
import type { Application, Container, ContainerChild } from "pixi.js";
import { Graphics } from "pixi.js";

export class PixiRenderer implements IMopRenderer {
  private app: Application;  

  //Record<containerIndex, ContainerChild>
  private displayContainers: Record<number, ContainerChild> = {};
  private mapRenderer: IPixiMapRenderer;


  constructor(app: Application, mapRenderer: IPixiMapRenderer) {
    this.app = app
    this.mapRenderer = mapRenderer

    this.mountContainer(0, this.mapRenderer.container) 
  }

  private mountContainer(zIndex: number, container: Container): void {
    container.zIndex = zIndex

    this.displayContainers[zIndex] = container 
    this.app.stage.addChild(container)
  }

  start(): void {
    this.app.ticker.add((ticker) => {
      // this.displayObjects["a"].y ++ 
      // this.displayObjects["a"].x ++ 
    })  
  }

  pause(): void {
   
  }

  renderTest(): void {
    
    this.mapRenderer.test()
  }
}



