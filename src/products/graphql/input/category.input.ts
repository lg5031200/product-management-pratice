import { MaxLength } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CategoryInput {
  @Field()
  @MaxLength(30)
  title: string;
}
