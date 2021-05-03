import { Field, InputType } from '@nestjs/graphql';
import { Pagination } from '../input/pagination.input';

@InputType()
class FuzzySearchProductInput {
  @Field({ nullable: true })
  title: string;
}

@InputType()
export class SearchProductParam {
  @Field({ nullable: true })
  fuzzy: FuzzySearchProductInput;

  @Field({ nullable: true })
  pagination: Pagination;
}
