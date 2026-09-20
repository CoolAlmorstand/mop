
import { Application, TextureStyle } from "pixi.js";

TextureStyle.defaultOptions.scaleMode = "nearest";

export async function createPixiApp(width: number, height: number, container: HTMLDivElement): Promise<Application> {

  const app = new Application()

  await app.init({
    width,
    height,
    background: "#FF0000"
  })

  container.appendChild(app.canvas)


  return app
}
