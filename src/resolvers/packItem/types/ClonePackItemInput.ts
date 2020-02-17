import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class ClonePackItemInput {
  @Field(() => ID, {
    nullable: true,
    description: `If not provided, the pack item is cloned into the PackItem's Pack`,
  })
  packId?: number;
}
