import type { Container, EventEmitter } from "pixi.js";
import type EventEmmitter from "eventemitter3"

export interface IMopRenderer {
  event: EventEmitter;

  start(): void;
  pause(): void

  renderTest(): void;
  mountContainer(zIindex: number, container: Container): void;
}
