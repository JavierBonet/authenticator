import { ObjectId } from "mongodb";

export interface Movie {
  _id: ObjectId;
  title: string;
  director: Director;
  year: number;
  genre: string[];
  rating: number;
  cast: CastEntity[];
  plot_summary: string;
  locations: LocationsEntity[];
}
interface Director {
  name: string;
  nationality: string;
  birth_year: number;
  previous_works: PreviousWorksEntity[];
}
interface PreviousWorksEntity {
  title: string;
  year: number;
}
interface CastEntity {
  name: string;
  role: string;
  age: number;
  nationality: string;
}
interface LocationsEntity {
  name: string;
  type: string;
  description: string;
}

export interface Product {
  _id: ObjectId;
  name: string;
  manufacturer: Manufacturer;
  category: string;
  description: string;
  specs: Specs;
  usage_tips: string[];
}
interface Manufacturer {
  name: string;
  country: string;
  founded_year: number;
  products: ProductsEntity[];
}
type ProductsEntity = Record<string, string | undefined>;

type Specs = Record<string, string | string[] | undefined>;

export interface ProgrammingLanguage {
  name: string;
  developer: string;
  first_appeared: number;
  paradigm: string[];
  typing_discipline: string;
  usage: string[];
}
