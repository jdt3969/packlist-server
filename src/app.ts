import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { handler } from '@/utils/jwt';

import resolvers from '@/resolvers';

const path = '/graphql';

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req, user: req.user }),
  });

  const app = express();

  app.use('/ping', (_, res) => {
    res.json({
      started: new Date(Date.now() - 1000 * Math.floor(process.uptime())),
      uptime: process.uptime() * 1.0,
    });
  });

  app.use(handler);

  apolloServer.applyMiddleware({ app, path });

  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/graphql');
  });
};

main();
