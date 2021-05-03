import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductResolver } from './resolver/product.resolver';
import { CommentsResolver } from './resolver/comment.resolver';
import { CategoriesResolver } from './resolver/category.resolver';

import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { CommentsService } from './services/product-comments.service';

import { Product, Comment, Category } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Comment, Category])],
  providers: [
    ProductResolver,
    CommentsResolver,
    CategoriesResolver,
    ProductsService,
    CommentsService,
    CategoriesService,
  ],
})
export class ProductsModule {}
