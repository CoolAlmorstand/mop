
import { XMLParser } from "fast-xml-parser";
import { Rectangle, Texture } from "pixi.js";
import type { ITilesTexturemap, TileOrientation } from "$lib/types";

type Tileset = {
  tileset: {
    tilewidth: number | string;
    tileheight: number | string;
    columns: number | string;
    image: { source: string };
    tile?: { id: number | string; type?: string } | { id: number | string; type?: string }[];
    properties?: {
      property:
        | { name: string; value?: string }
        | { name: string; value?: string }[];
    };
  };
};

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });

const tilesetFiles = {
  ...import.meta.glob("$lib/assets/tiles/*/*.{tsx,tmx}", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
  ...import.meta.glob("$lib/assets/sprites/tiles/*/*.{tsx,tmx}", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
} as Record<string, string>;

const imageFiles = {
  ...import.meta.glob("$lib/assets/tiles/**/*.{png,jpg,jpeg,webp,avif}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  ...import.meta.glob("$lib/assets/sprites/tiles/**/*.{png,jpg,jpeg,webp,avif}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
} as Record<string, string>;

function getImageUrl(tilesetPath: string, imageSource: string): string | undefined {
  const directory = tilesetPath.slice(0, tilesetPath.lastIndexOf("/") + 1);
  return imageFiles[`${directory}${imageSource}`];
}

function getTileId(tileset: Tileset["tileset"]): keyof ITilesTexturemap | undefined {
  const properties = tileset.properties?.property;
  const tileIdProperty = (Array.isArray(properties) ? properties : properties ? [properties] : []).find(
    (property) => property.name === "tileId",
  );

  return tileIdProperty?.value as keyof ITilesTexturemap | undefined;
}

export function getTileTextureMap(): ITilesTexturemap {
  const textureMap: ITilesTexturemap = {};

  for (const [tilesetPath, xml] of Object.entries(tilesetFiles)) {
    const { tileset } = parser.parse(xml) as Tileset;
    const imageUrl = getImageUrl(tilesetPath, tileset.image.source);

    if (!imageUrl) continue;

    const tileId = getTileId(tileset);
    if (!tileId) continue;

    const sourceTexture = Texture.from(imageUrl);
    const tileWidth = Number(tileset.tilewidth);
    const tileHeight = Number(tileset.tileheight);
    const columns = Number(tileset.columns);
    const tiles = Array.isArray(tileset.tile) ? tileset.tile : tileset.tile ? [tileset.tile] : [];

    textureMap[tileId] ??= {};

    for (const tile of tiles) {
      if (!tile.type) continue;

      const index = Number(tile.id);
      textureMap[tileId][tile.type as TileOrientation] = new Texture({
        source: sourceTexture.source,
        frame: new Rectangle(
          (index % columns) * tileWidth,
          Math.floor(index / columns) * tileHeight,
          tileWidth,
          tileHeight,
        ),
      });
    }
  }

  return textureMap;
}
