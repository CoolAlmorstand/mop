
import type { Container } from "pixi.js";
import type { IRenderEntity } from "./render-entity";

export interface IEntityRenderer {
  container: Container;
  
  test(entity: IRenderEntity): void;
}
