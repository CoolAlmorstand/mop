import type { IMopRenderer } from "$lib/interfaces/renderer";
import type { Application, ContainerChild } from "pixi.js";
import { Graphics } from "pixi.js";

export class PixiRenderer implements IMopRenderer {
  private app: Application;  

  //Record<entityId, ContainerChild>
  private displayObjects: Record<string, ContainerChild> = {};


  constructor(app: Application) {
    this.app = app
  }

  start(): void {
    this.app.ticker.add((ticker) => {
      this.displayObjects["a"].y ++ 
      this.displayObjects["a"].x ++ 
    })  

  }

  pause(): void {
   
  }

  renderTest(): void {
    const rectangle = new Graphics().rect(20, 20, 40, 40).fill("#ffffff") 

    this.displayObjects["a"] = rectangle
    this.app.stage.addChild(rectangle)
  }
}



