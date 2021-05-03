import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ProductInput } from '../graphql/input';
import { SearchProductParam } from '../graphql/input/search-product.input';

import { Product } from '../entities';
import { CategoriesService } from '../services/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll(param: SearchProductParam) {
    const { fuzzy, pagination } = param;
    const options = {
      fuzzy: {},
      pagination: {},
    };

    if (fuzzy) {
      Object.assign(options.fuzzy, { title: Like(`%${fuzzy.title}%`) });
    }
    if (pagination) {
      const { offset, limit } = pagination;
      Object.assign(options.pagination, { skip: offset, take: limit });
    }
    return this.productRepo.find({
      where: options.fuzzy,
      relations: ['categories', 'comments'],
      ...options.pagination,
    });
  }

  findOne(id: string) {
    const product = this.productRepo.findOne(id, {
      relations: ['categories', 'comments'],
    });
    return product;
  }

  create(data: ProductInput) {
    const newItem = this.productRepo.create(data);
    return this.productRepo.save(newItem);
  }

  async update(id: string, changes: ProductInput) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async createProductRelations(id: string, categoryIds: [string]) {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    const categories = await this.categoriesService.findByIds(categoryIds);

    product.categories = categories;
    product.updated_at = new Date();
    return this.productRepo.save(product);
  }

  async removeProductRelations(id: string, categoryId: string) {
    const product = await this.findOne(id);
    const categoryToRemove = await this.categoriesService.findOne(categoryId);
    product.categories = product.categories.filter(
      category => category.id !== categoryToRemove.id,
    );
    product.updated_at = new Date();
    return this.productRepo.save(product);
  }

  async remove(id: string) {
    await this.productRepo.delete(id);
    return true;
  }
}
