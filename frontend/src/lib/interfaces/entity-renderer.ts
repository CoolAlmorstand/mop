
import type { Container } from "pixi.js";
import type { IRenderEntity } from "./render-entity";
import type { IEntityType } from "@mop/shared-types";

export interface IEntityRenderer {
  container: Container;
  
  test(entity: IRenderEntity): void;
  createNewEntity(entityType: IEntityType, entityId: string): void;
}
