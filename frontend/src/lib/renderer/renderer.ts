import type { IMopControls } from "$lib/interfaces/controls";
import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import type { IGame } from "$lib/interfaces/game";
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer";
import type { IMopRenderer } from "$lib/interfaces/renderer";
import type { Application, Container } from "pixi.js";

export class PixiRenderer implements IMopRenderer {
  private app: Application;  

  //Record<containerIndex, ContainerChild>
  private displayContainers: Record<number, Container> = {};
  private mapRenderer: IPixiMapRenderer;
  private entityRenderer: IEntityRenderer;
  private game: IGame

  constructor(app: Application, mapRenderer: IPixiMapRenderer, entityRenderer: IEntityRenderer, game: IGame) {
    this.app = app
    this.mapRenderer = mapRenderer
    this.entityRenderer = entityRenderer
    this.game = game

    this.mountContainer(0, this.mapRenderer.container) 
    this.mountContainer(1, this.entityRenderer.container)

    this.app.stage.sortableChildren = true

    this.setupGameListeners()
  }


  private setupGameListeners() {
    this.game.event.on("entitiesMove", (entities) => {
      entities.forEach((entity) => this.entityRenderer.moveEntity(entity))
    })

    this.game.event.on("createPlayer", (playerEntityId) => {
      this.entityRenderer.createNewEntity("player", playerEntityId)
    })
  }

  mountContainer(zIndex: number, container: Container): void {
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

