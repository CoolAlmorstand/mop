import type { IDirectionVector } from "@mop/shared-types";
import type { IMopControls } from "$lib/interfaces/controls";
import type { IGame } from "$lib/interfaces/game";
import { Container, Sprite, Text, Texture, Rectangle, type FederatedPointerEvent } from "pixi.js";

const CONTROL_SIZE = 50;
const JOYSTICK_RADIUS = 30;

export class Controls implements IMopControls {
  container: Container = new Container();

  private controlSurface: Containaer = new Container();

  private game: IGame;
  private screenWidth: number;
  private screenHeight: number;

  private buttonDefinitions: Record<string, {
    x: number;
    y: number;
    width: number
    height: number
  }>;
  
  constructor(game: IGame, screenWidth: number, screenHeight: number) {
    this.game = game;
    this.screenWidth = screenWidth 
    this.screenHeight = screenHeight
  }

  private setupButtonDefinitions(screenWidth: number, screenHeight: number) {
    this.buttonDefinitions["actionButtonA"] = {
      x: screenWidth - 80 - 40 - 8,
      y: screenHeight - 80 - 40 -8,
      width: 40,
      height: 40,
    }

    this.buttonDefinitions["actionButtonB"] = {
      x: screenWidth - 80,
      y: screenHeight - 80 - 40 - 8,
      width: 40,
      height: 40,
    }

    this.buttonDefinitions["actionButtonC"] = {
      x: screenWidth - 80 - 40 - 8,
      y: screenHeight - 80,
      width: 40,
      height: 40,
    }

    this.buttonDefinitions["actionButtonD"] = {
      x: screenWidth - 80,
      y: screenHeight - 80,
      width: 40,
      height: 40,
    }
  }

  private createRectangle(width: number, height: number, alpha: number) {

    const rect = new Sprite(Texture.WHITE)
    rect.width = width
    rect.height =  height
    rect.alpha = alpha

    return rect
  }

  private renderActionButtons() {

    const actionButtons = ["A", "B", "C", "D"]

    actionButtons.forEach((label, index) => {
      const buttonDefinition = this.buttonDefinitions[`actionButton${label}`]

      const buttonContainer = new Container();

      const text = new Text({
        text: label,
        style: {
          fill: "#ccc0ff",
          fontSize: 12,
        } 
      })

      text.position.set(
        buttonDefinition.x,
        buttonDefinition.y
      )

      const button = this.createRectangle(buttonDefinition.width, buttonDefinition.height, 0.8)

      button.position.set(
        buttonDefinition.x,
        buttonDefinition.y
      )

      buttonContainer.addChild(button)
      buttonContainer.addChild(text)
    })

  }
}

