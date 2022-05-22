const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

const { ApolloServerPluginUsageReporting } = require("apollo-server-core");

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginUsageReporting({
        fieldLevelInstrumentation: 0.5,
      }),
    ],
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);