import { NotFoundException } from '@nestjs/common';
import { ID, Args, Query, Resolver, Mutation } from '@nestjs/graphql';

import { ProductDto } from '../graphql/dto/product.dto';
import { SearchProductParam, ProductInput } from '../graphql/input';

import { ProductsService } from './../services/products.service';

@Resolver(() => ProductDto)
export class ProductResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [ProductDto])
  async paginateProducts(
    @Args('param', {
      defaultValue: {
        pagination: { offset: 0, limit: 10 },
      },
      nullable: true,
    })
    param: SearchProductParam,
  ) {
    const products = await this.productService.findAll(param);

    return products;
  }

  @Query(() => ProductDto)
  async product(@Args('id') id: string) {
    const product = await this.productService.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  @Mutation(() => ProductDto)
  async createProduct(@Args('input') input: ProductInput) {
    const newProduct = await this.productService.create({
      ...input,
    });

    return newProduct;
  }

  @Mutation(() => ProductDto)
  async addProductToCategory(
    @Args({ name: 'productId', type: () => ID }) productId: string,
    @Args({ name: 'categories', type: () => [ID] }) categories: [string],
  ) {
    const updatedProduct = await this.productService.createProductRelations(
      productId,
      categories,
    );

    return updatedProduct;
  }

  @Mutation(() => ProductDto)
  async removeProductFromCategory(
    @Args({ name: 'productId', type: () => ID }) productId: string,
    @Args({ name: 'categoryId', type: () => ID }) categoryId: string,
  ) {
    const updatedProduct = await this.productService.removeProductRelations(
      productId,
      categoryId,
    );

    return updatedProduct;
  }

  @Mutation(() => ProductDto)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: ProductInput,
  ) {
    const updatedProduct = await this.productService.update(id, input);

    return updatedProduct;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string) {
    return await this.productService.remove(id);
  }
}
