import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import type { IRenderEntity } from "$lib/interfaces/render-entity";
import { Container } from "pixi.js";



export class PixiEnitityRenderer implements IEntityRenderer {
  container: Container = new Container()

  // id, IRenderEntity
  private entities: Record<string, IRenderEntity> = {};

  constructor() {

  }

  test(entity: IRenderEntity): void {
    this.entities[entity.id] = entity
    this.container.addChild(entity.animatedSprite)

    entity.playAnimation("run_nw", 0.15, true)
  }
}
