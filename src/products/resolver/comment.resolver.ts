import { Args, Resolver, Mutation } from '@nestjs/graphql';

import { CommentDto, ProductDto } from '../graphql/dto';
import { CommentInput } from '../graphql/input';

import { CommentsService } from '../services/product-comments.service';

@Resolver(() => CommentDto)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => ProductDto)
  async addComment(
    @Args('productId') productId: string,
    @Args('input') input: CommentInput,
  ) {
    const newComment = await this.commentsService.create(productId, input);
    return newComment;
  }

  @Mutation(() => Boolean)
  async deleteComment(@Args('id') id: string) {
    return await this.commentsService.remove(id);
  }
}
