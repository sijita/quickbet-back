import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { axiosClient } from 'src/common/utils/axios-client';

@Injectable()
export class MoviesService {
  async getNowPlayingMovies() {
    try {
      const { data } = await axiosClient.get('/movie/now_playing');

      return data.results;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching now playing movies. Please try again later.`,
      );
    }
  }

  async getUpcomingMovies() {
    try {
      const { data } = await axiosClient.get('/movie/upcoming');

      return data.results;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching upcoming movies. Please try again later.`,
      );
    }
  }

  async getTopRatedMovies() {
    try {
      const { data } = await axiosClient.get('/movie/top_rated');

      return data.results;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching top rated movies. Please try again later.`,
      );
    }
  }

  async getMovieDetails(id: string) {
    try {
      const { data } = await axiosClient.get(`/movie/${id}`);

      return data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching movie details. Please try again later.`,
      );
    }
  }

  async getMoviesCategories() {
    try {
      const { data } = await axiosClient.get('/genre/movie/list');

      return data.genres;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching movie categories. Please try again later.`,
      );
    }
  }

  async getMoviesByFilter(filter: string, value: string) {
    try {
      const params = new URLSearchParams();

      switch (filter) {
        case 'genre':
          params.append('with_genres', value);
          break;
        case 'popularity':
          params.append('sort_by', `popularity.${value}`);
          break;
        case 'title':
          params.append('query', value);
        default:
          throw new BadRequestException(
            `The filter '${filter}' is not supported. Please try again.`,
          );
      }

      const { data } = await axiosClient.get(
        `/discover/movie?${params.toString()}`,
      );

      return data.results;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching movies by filter. Please try again later.`,
      );
    }
  }

  async getMoviesByIds(ids: number[]) {
    try {
      if (!ids.length) {
        throw new BadRequestException('No movie IDs provided');
      }

      const moviesPromises = ids.map((id) =>
        this.getMovieDetails(id.toString()),
      );

      const movies = await Promise.all(moviesPromises);

      return movies;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new InternalServerErrorException(
        `Error fetching movies by ids. Please try again later.`,
      );
    }
  }
}
