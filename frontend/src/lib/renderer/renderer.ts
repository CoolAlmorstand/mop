import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer";
import type { IMopRenderer } from "$lib/interfaces/renderer";
import type { Application, Container } from "pixi.js";

export class PixiRenderer implements IMopRenderer {
  private app: Application;  

  //Record<containerIndex, ContainerChild>
  private displayContainers: Record<number, Container> = {};
  private mapRenderer: IPixiMapRenderer;
  private entityRenderer: IEntityRenderer;


  constructor(app: Application, mapRenderer: IPixiMapRenderer, entityRenderer: IEntityRenderer) {
    this.app = app
    this.mapRenderer = mapRenderer
    this.entityRenderer = entityRenderer

    this.mountContainer(0, this.mapRenderer.container) 
    this.mountContainer(1, this.entityRenderer.container)

    this.app.stage.scale.set(4,4)
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



