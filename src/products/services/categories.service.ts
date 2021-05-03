import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryInput } from '../graphql/input';

import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find({
      relations: ['products'],
    });
  }

  findByIds(ids: string[]) {
    return this.categoryRepo.findByIds(ids);
  }

  findOne(id: string) {
    const category = this.categoryRepo.findOne(id);

    return category;
  }

  create(data: CategoryInput) {
    const newItem = this.categoryRepo.create(data);
    return this.categoryRepo.save(newItem);
  }

  async update(id: string, changes: CategoryInput) {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  async remove(id: string) {
    await this.categoryRepo.delete(id);
    return true;
  }
}
