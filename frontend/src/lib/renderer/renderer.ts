import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import type { IPixiMapRenderer } from "$lib/interfaces/map-renderer";
import type { IMopRenderer } from "$lib/interfaces/renderer";
import type { ISimulationEngine } from "@mop/simulation-engine";
import type { Application, Container } from "pixi.js";

export class PixiRenderer implements IMopRenderer {
  private app: Application;  

  //Record<containerIndex, ContainerChild>
  private displayContainers: Record<number, Container> = {};
  private mapRenderer: IPixiMapRenderer;
  private entityRenderer: IEntityRenderer;
  private simulation: ISimulationEngine; 

  constructor(app: Application, mapRenderer: IPixiMapRenderer, entityRenderer: IEntityRenderer, simulation: ISimulationEngine) {
    this.app = app
    this.mapRenderer = mapRenderer
    this.entityRenderer = entityRenderer
    this.simulation = simulation

    this.mountContainer(0, this.mapRenderer.container) 
    this.mountContainer(1, this.entityRenderer.container)

    this.app.stage.sortableChildren = true

    this.setupGameListeners()
  }


  private setupGameListeners() {
    this.simulation.event.on("entitiesMove", (entities) => {
      entities.forEach((entity) => this.entityRenderer.moveEntity(entity))
    })

    this.simulation.event.on("createPlayer", (playerEntityId) => {
      const username = this.simulation.getEntity(playerEntityId)?.name
      this.entityRenderer.createNewEntity("player", playerEntityId, username)
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

