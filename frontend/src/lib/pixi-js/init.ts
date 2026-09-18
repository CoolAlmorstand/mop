
import { Application } from "pixi.js";

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
