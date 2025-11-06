import { ObjectType, Field, InputType } from 'type-graphql';

@ObjectType()
export class Order {
  @Field() id: string;
  @Field() status: string;
  @Field() total: number;
  @Field() createdAt: string;
}

@InputType()
export class OrderInput {
  @Field() status: string;
  @Field() total: number;
}