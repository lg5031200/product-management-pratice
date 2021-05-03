import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { CategoryDto } from '../graphql/dto';
import { CategoryInput } from '../graphql/input';

import { CategoriesService } from './../services/categories.service';

@Resolver(() => CategoryDto)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoryDto])
  async categories() {
    const categories = await this.categoriesService.findAll();

    return categories;
  }

  @Query(() => CategoryDto)
  async category(@Args('id') id: string) {
    const category = await this.categoriesService.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;
  }

  @Mutation(() => CategoryDto)
  async createCategory(@Args('input') input: CategoryInput) {
    const newCategory = await this.categoriesService.create({
      ...input,
    });

    return newCategory;
  }

  @Mutation(() => CategoryDto)
  async updateCategory(
    @Args('id') id: string,
    @Args('input') input: CategoryInput,
  ) {
    const updatedCategory = await this.categoriesService.update(id, input);

    return updatedCategory;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Args('id') id: string) {
    return await this.categoriesService.remove(id);
  }
}
