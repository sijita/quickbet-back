import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { MoviesModule } from 'src/modules/movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), UsersModule, MoviesModule],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
