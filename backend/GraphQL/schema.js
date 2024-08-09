const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
	}

	type Message {
		_id: ID!
		sender: User!
		receiver: User!
		content: String!
		createdAt: String!
	}

	type Query {
		users: [User!]
		messages(senderId: ID!, receiverId: ID!): [Message!]
		user(id: ID!): User
	}

	type Mutation {
		sendMessage(senderId: ID!, receiverId: ID!, content: String!): Message
	}

	type Subscription {
		messageSent(sentTo: ID!, sentFrom: ID!): Message
	}
`;

module.exports = typeDefs;
