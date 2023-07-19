import Fastify from "fastify"
import Mercurius from "mercurius"
import { schema } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const fastify = Fastify({ logger: true });

fastify.register(Mercurius, {
  schema,
  resolvers,
  graphiql: true
});

fastify.get("/", async (request, reply) => {
  return reply.redirect("/graphiql");
});

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();