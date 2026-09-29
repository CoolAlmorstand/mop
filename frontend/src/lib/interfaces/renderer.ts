import type { Container, EventEmitter } from "pixi.js";

export interface IMopRenderer {
  start(): void;
  pause(): void

  renderTest(): void;
  mountContainer(zIindex: number, container: Container): void;
}












