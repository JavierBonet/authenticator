import { config } from '../config';
import axios from 'axios';
import FetchApì from './fetchApi';
import {
  Movie,
  Product,
  ProgrammingLanguage,
} from '../../../common/interfaces';

const baseUrl = `${config.backendUrl}/api/v1`;

axios.defaults.withCredentials = true;

class EntitiesApi {
  private fetchApi: FetchApì;

  constructor(setToken: (token: string) => void, getToken: () => string) {
    this.fetchApi = FetchApì.getInstance(setToken, getToken);
  }

  private async fetchData<T>(endpoint: string) {
    return this.fetchApi.get<T>(`${baseUrl}/${endpoint}`);
  }

  /**
   * Fetches the list of products from the API.
   * @returns {Promise<{ products: Product[] }>} A promise that resolves with an object containing the list of products.
   */
  async getProducts(): Promise<{ products: Product[] }> {
    return this.fetchData<{ products: Product[] }>('products').then(
      (response) => {
        return { products: response.data.products };
      }
    );
  }

  /**
   * Fetches the list of movies from the API.
   * @returns {Promise<{ movies: Movie[] }>} A promise that resolves with an object containing the list of movies.
   */
  async getMovies(): Promise<{ movies: Movie[] }> {
    return this.fetchData<{ movies: Movie[] }>('movies').then((response) => {
      return { movies: response.data.movies };
    });
  }

  /**
   * Fetches the list of programming languages from the API.
   * @returns {Promise<{ programmingLanguages: ProgrammingLanguage[] }>} A promise that resolves with an object containing the list of programming languages.
   */
  async getProgrammingLanguages(): Promise<{
    programmingLanguages: ProgrammingLanguage[];
  }> {
    return this.fetchData<{ programmingLanguages: ProgrammingLanguage[] }>(
      'programming-languages'
    ).then((response) => {
      return { programmingLanguages: response.data.programmingLanguages };
    });
  }
}

export default EntitiesApi;
