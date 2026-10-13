
import type { Container } from "pixi.js";
import type { IRenderEntity } from "./render-entity";
import type { IEntity, IEntityType } from "@mop/simulation-core";

export interface IEntityRenderer {
  container: Container;
  
  test(entity: IRenderEntity): void;
  createNewEntity(entityType: IEntityType, entityId: string, name: string | null | undefined): void;
  moveEntity(entity: IEntity): void;
}
