import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommentInput {
  @Field()
  content: string;

  @Field()
  signature: string;
}
