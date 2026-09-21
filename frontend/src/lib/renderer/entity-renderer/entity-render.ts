import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import { Container } from "pixi.js";



export class PixiEnitityRenderer implements IEntityRenderer {
  container: Container = new Container()

  constructor() {

  }

  test(): void {
      
  }
}
