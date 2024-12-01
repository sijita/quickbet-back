import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('now-playing')
  async getNowPlayingMovies() {
    return await this.moviesService.getNowPlayingMovies();
  }

  @Get('upcoming')
  async getUpcomingMovies() {
    return await this.moviesService.getUpcomingMovies();
  }

  @Get('top-rated')
  async getTopRatedMovies() {
    return await this.moviesService.getTopRatedMovies();
  }

  @Get('categories')
  async getMoviesCategories() {
    return await this.moviesService.getMoviesCategories();
  }

  @Get('filter/:filter/:value')
  async getMoviesByFilter(
    @Param('filter') filter: string,
    @Param('value') value: string,
  ) {
    return await this.moviesService.getMoviesByFilter(filter, value);
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: string) {
    return await this.moviesService.getMovieDetails(id);
  }
}
