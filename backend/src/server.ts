import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import cors from "cors";
import { buildSchema } from "type-graphql";
import { OrderResolver } from "./graphql/resolvers/OrderResolver";
import { rateLimiter } from "./middleware/rateLimiter";

const app = express();

// Middleware
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

// Start server
async function start() {
  // Build TypeGraphQL schema
  const schema = await buildSchema({
    resolvers: [OrderResolver],
  });

  // Create Apollo Server
  const server = new ApolloServer({ schema });
  await server.start();

  // Apply GraphQL middleware
  app.use("/graphql", expressMiddleware(server));

  // Start Express
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("Server failed to start:", err);
});