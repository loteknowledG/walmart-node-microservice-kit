import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Order, OrderInput } from "../types";

// In-memory mock data
const mockOrders: Order[] = [
  {
    id: "1",
    status: "pending",
    total: 99.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    status: "shipped",
    total: 149.50,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

@Resolver(Order)
export class OrderResolver {
  @Query(() => [Order])
  async orders(@Arg("status", { nullable: true }) status?: string): Promise<Order[]> {
    if (status) {
      return mockOrders.filter((o) => o.status === status);
    }
    return mockOrders;
  }

  @Mutation(() => Order)
  async createOrder(@Arg("input") input: OrderInput): Promise<Order> {
    const newOrder: Order = {
      ...input,
      id: String(mockOrders.length + 1),
      createdAt: new Date().toISOString(),
    };
    mockOrders.push(newOrder);
    return newOrder;
  }
}