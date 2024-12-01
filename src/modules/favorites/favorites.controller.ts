import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserFavoriteMovies(@Request() req) {
    return await this.favoritesService.getUserFavoriteMovies(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async addMovieToFavorites(
    @Body() { movieId }: CreateFavoriteDto,
    @Request() req,
  ) {
    return await this.favoritesService.addMovieToFavorites(
      { movieId },
      req.user.id,
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeMovieFromFavorites(@Param('id') favoriteId: number) {
    return await this.favoritesService.removeMovieFromFavorites(favoriteId);
  }
}
