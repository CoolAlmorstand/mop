import type { IDirectionVector } from "@mop/shared-types";
import type { IMopControls } from "$lib/interfaces/controls";
import type { IGame } from "$lib/interfaces/game";
import { Container, Sprite, Text, Texture, Rectangle, type FederatedPointerEvent } from "pixi.js";

const CONTROL_SIZE = 50;
const JOYSTICK_RADIUS = 30;

export class Controls implements IMopControls {
  container: Container = new Container();

  private controlSurface: Container = new Container();

  private game: IGame;
  private screenWidth: number;
  private screenHeight: number;

  private buttonDefinitions: Record<string, {
    x: number;
    y: number;
    width: number
    height: number
  }> = {};
  
  constructor(game: IGame, screenWidth: number, screenHeight: number) {
    this.game = game;
    this.screenWidth = screenWidth 
    this.screenHeight = screenHeight

    this.setupButtonDefinitions(screenWidth, screenHeight)
    this.renderActionButtons()
  }

  private setupButtonDefinitions(screenWidth: number, screenHeight: number) {

    const actionButtonsSize = 55
    const actionButtonCornerPadding = 80

    this.buttonDefinitions["actionButtonA"] = {
      x: screenWidth - actionButtonCornerPadding - ( actionButtonsSize * 1 ) - 8,
      y: screenHeight - actionButtonCornerPadding - ( actionButtonsSize * 1 ) - 8,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonB"] = {
      x: screenWidth - actionButtonCornerPadding,
      y: screenHeight - actionButtonCornerPadding - ( actionButtonsSize * 1 ) - 8,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonC"] = {
      x: screenWidth - actionButtonCornerPadding - ( actionButtonsSize * 1 ) - 8,
      y: screenHeight - actionButtonCornerPadding,
      width: actionButtonsSize,
      height: actionButtonsSize,
    }

    this.buttonDefinitions["actionButtonD"] = {
      x: screenWidth - actionButtonCornerPadding,
      y: screenHeight - actionButtonCornerPadding,
      width: actionButtonsSize,
      height: actionButtonsSize,
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
          fill: "red",
          fontSize: 26,
        } 
      })

      text.position.set(
        buttonDefinition.x + ( buttonDefinition.width / 2 ),
        buttonDefinition.y + ( buttonDefinition.height / 2 )
      )

      text.anchor.set(0.5, 0.5)

      const button = this.createRectangle(buttonDefinition.width, buttonDefinition.height, 0.8)

      button.position.set(
        buttonDefinition.x,
        buttonDefinition.y
      )


      console.log(buttonDefinition)

      buttonContainer.addChild(button)
      buttonContainer.addChild(text)
      this.container.addChild(buttonContainer)
    })

  }
}

