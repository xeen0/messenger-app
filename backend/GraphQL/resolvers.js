const User = require('../Models/User');
const Message = require('../Models/Message');
const { PubSub } = require('graphql-subscriptions');
const { withFilter } = require('graphql-subscriptions');

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

const resolvers = {
	Query: {
		user: async (_, { id }) => {
			return await User.findById(id);
		},
		users: async (_, {}) => {
			return await User.find();
		},
		messages: async (_, { senderId, receiverId }) => {
			console.log({senderId, receiverId})
			return await Message.find({
				$or: [
					{ sender: senderId, receiver: receiverId },
					{ sender: receiverId, receiver: senderId },
				],
			})
				.populate('sender', 'username')
				.populate('receiver', 'username')
				.sort({ createdAt: 1 });
		},
	},
	Mutation: {
		sendMessage: async (_, { senderId, receiverId, content }) => {
			const sender = await User.findById(senderId);
			const receiver = await User.findById(receiverId);

			if (!sender || !receiver) {
				throw new Error('User not found');
			}

			const message = new Message({
				sender: sender,
				receiver: receiver,
				content,
			});

			await message.save();

			pubsub.publish(MESSAGE_SENT, { messageSent: message });

			return message;
		},
	},
	Subscription: {
		messageSent: {
			subscribe: withFilter(
				() => pubsub.asyncIterator(MESSAGE_SENT),
				(payload, variables) => {
					console.log({ variables});
					console.log(payload.messageSent.sender._id,payload.messageSent.receiver._id)
					console.log((payload.messageSent.receiver._id.toString() === variables.sentTo ),
					payload.messageSent.sender._id.toString() === variables.sentFrom)
					return (
						payload.messageSent.sender._id.toString() === variables.sentTo &&
						payload.messageSent.receiver._id.toString() === variables.sentFrom
					);
				}
			),
		},
	},
};

module.exports = resolvers;
