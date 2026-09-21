

export type ITilesId = "grass" | "sand"
export type IEntityType = "player" | "sheep"


export type IEntity = {
  x: number;
  y: number;
  hitSize: {width: number, height: number};
  health: number;
  speed: number;
  attack: number;
  id: string;
}

