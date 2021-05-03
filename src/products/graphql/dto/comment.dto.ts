import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class CommentDto {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  signature: string;
}
