import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryDto, CommentDto } from '../dto';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class ProductDto {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  price: number;

  @Field()
  description: string;

  @Field(() => [CategoryDto])
  categories: CategoryDto[];

  @Field(() => [CommentDto])
  comments: CommentDto[];
}
