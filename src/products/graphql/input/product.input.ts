import { Length, MaxLength } from 'class-validator';
import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class ProductInput {
  @Field({ nullable: true })
  @MaxLength(30)
  title: string;

  @Field(() => Int, { nullable: true })
  price: number;

  @Field({ nullable: true })
  @Length(30, 255)
  description: string;
}
