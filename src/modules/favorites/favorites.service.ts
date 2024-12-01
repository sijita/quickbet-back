import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    private usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  async addMovieToFavorites({ movieId }: CreateFavoriteDto, userId: number) {
    try {
      const user = await this.usersService.findUserById(userId);

      const favorite = this.favoriteRepository.create({
        movieId,
        user,
      });

      await this.favoriteRepository.save(favorite);

      return {
        message: 'Movie added to favorites successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error adding movie to favorites. Please try again later',
      );
    }
  }

  async removeMovieFromFavorites(favoriteId: number) {
    try {
      const favorite = await this.favoriteRepository.findOne({
        where: { id: favoriteId },
      });

      if (!favorite) {
        throw new NotFoundException('Favorite movie not found');
      }

      await this.favoriteRepository.delete(favoriteId);

      return {
        message: 'Movie removed from favorites successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error removing movie from favorites. Please try again later',
      );
    }
  }

  async getUserFavoriteMovies(userId: number) {
    try {
      const favorites = await this.favoriteRepository.find({
        where: { user: { id: userId } },
        select: ['movieId'],
      });

      if (!favorites.length) {
        throw new NotFoundException('No favorite movies found');
      }

      const movieIds = favorites.map((fav) => fav.movieId);

      return this.moviesService.getMoviesByIds(movieIds);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new InternalServerErrorException(
        'Error getting user favorite movies. Please try again later',
      );
    }
  }
}
