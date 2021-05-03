import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field(() => Int)
  offset: number;

  @Field(() => Int)
  limit: number;
}
