import type { Container } from "pixi.js";


export interface IPixiMapRenderer {
  container: Container;

  test(): void;
}
