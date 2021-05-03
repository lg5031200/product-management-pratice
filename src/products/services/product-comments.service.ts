import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentInput } from '../graphql/input';

import { Comment } from '../entities';
import { ProductsService } from '../services/products.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private readonly productService: ProductsService,
  ) {}

  async create(productId: string, data: CommentInput) {
    const newCommentData = await this.commentRepo.create(data);
    const newComment = await this.commentRepo.save(newCommentData);
    const product = await this.productService.findOne(productId);
    product.comments.push(newComment);
    return this.productService.update(productId, product);
  }

  async remove(id: string) {
    await this.commentRepo.delete(id);
    return true;
  }
}
