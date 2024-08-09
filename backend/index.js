const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { createServer } = require('http');
const { typeDefs, resolvers } = require('./GraphQL');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const connectDB = require('./database');

connectDB();

const app = express();

const httpServer = createServer(app);
async function startApolloServer() {
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: '/graphql',
	});

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});
	await server.start();
	server.applyMiddleware({ app });
	useServer(
		{ schema: makeExecutableSchema({ typeDefs, resolvers }) },
		wsServer
	);

	const PORT = process.env.PORT || 4000;
	httpServer.listen(PORT, () => {
		console.log(
			`Server is running at http://localhost:${PORT}${server.graphqlPath}`
		);
	});
}

startApolloServer();
