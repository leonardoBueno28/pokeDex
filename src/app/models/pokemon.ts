export interface Pokemon {
  id: number;
  name: string;
  types: any[];
  weight: number;
  sprites: spritesImage;
  moves: any[];
  image: string;
  color: string;
  url: string;
}

export interface spritesImage {
  front_default: string;
  front_shiny: string;
  front_female: string;
  front_shiny_female: string;
  back_default: string;
  back_shiny: string;
  back_female: string;
  back_shiny_female: string;
}
