import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductDto } from '.';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class CategoryDto {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [ProductDto])
  products: ProductDto[];
}
