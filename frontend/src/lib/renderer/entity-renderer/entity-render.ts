import type { IEntityRenderer } from "$lib/interfaces/entity-renderer";
import type { IEntity, IEntityType } from "@mop/shared-types";
import type { IRenderEntity } from "$lib/interfaces/render-entity";

import { Container } from "pixi.js";
import { RenderEntity } from "./render-entity";
import type { IEntitySpritesheets } from "$lib/types";


export class PixiEnitityRenderer implements IEntityRenderer {
  container: Container = new Container()

  // id, IRenderEntity
  private entities: Record<string, IRenderEntity> = {};
  private entitySpritesheets: IEntitySpritesheets;

  constructor(entitySpritesheets: IEntitySpritesheets) {
    this.entitySpritesheets = entitySpritesheets
  }

  test(entity: IRenderEntity): void {
    this.entities[entity.id] = entity
    this.container.addChild(entity.animatedSprite)

    entity.playAnimation("run_nw", 0.15, true)
  }

  createNewEntity(entityType: IEntityType, entityId: string): void {
    const spritesheet = this.entitySpritesheets[entityType]
    const entity = new RenderEntity(spritesheet, entityId, entityType)

    this.entities[entityId] = entity 
    this.container.addChild(entity.animatedSprite)
  }

  moveEntity(entity: IEntity): void {
    const renderEntity = this.entities[entity.id]
    if (!renderEntity) {
      return
    }

    renderEntity.animatedSprite.position.set(entity.x, entity.y)
    renderEntity.direction = entity.direction

    if (entity.currentAction === "running") {
      renderEntity.playAnimation(`run_${entity.direction}`, 0.15, true)
    }
  }
}
