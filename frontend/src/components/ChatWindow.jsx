import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';

const MESSAGES_QUERY = gql`
	query Messages($senderId: ID!, $receiverId: ID!) {
		messages(senderId: $senderId, receiverId: $receiverId) {
			_id
			content
			createdAt
			sender {
				_id
				username
			}
		}
	}
`;

const SEND_MESSAGE_MUTATION = gql`
	mutation SendMessage($senderId: ID!, $receiverId: ID!, $content: String!) {
		sendMessage(
			senderId: $senderId
			receiverId: $receiverId
			content: $content
		) {
			_id
			content
			createdAt
			sender {
				_id
				username
			}
		}
	}
`;

const MESSAGE_SENT_SUBSCRIPTION = gql`
	subscription MessageSent($sentTo: ID!, $sentFrom: ID!) {
		messageSent(sentTo: $sentTo, sentFrom: $sentFrom) {
			_id
			content
			createdAt
			sender {
				_id
				username
			}
		}
	}
`;

const Chat = () => {
	const { userId, receiverId } = useParams();
	const [message, setMessage] = useState('');
	const [currentMessages, setCurrentMessages] = useState([]);
	const messagesEndRef = useRef(null);

	const { data, loading, error, refetch } = useQuery(MESSAGES_QUERY, {
		variables: { senderId: userId, receiverId },
	});
	useEffect(() => {
		refetch();
	}, [receiverId]);
	useEffect(() => {
		console.log('sad');
		if (data?.messages) {
			console.log(data.messages[data.messages.length - 1] || 0);
			setCurrentMessages(data.messages);
			scrollToBottom();
		}
	}, [data]);
	const [sendMessage] = useMutation(SEND_MESSAGE_MUTATION);

	useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
		variables: { sentTo: receiverId, sentFrom: userId },
		onSubscriptionData: async ({ subscriptionData }) => {
			await setCurrentMessages((prevMessages) => [
				...prevMessages,
				subscriptionData.data.messageSent,
			]);
			scrollToBottom();
		},
	});

	const scrollToBottom = () => {
		setTimeout(() => {
			messagesEndRef.current?.scrollIntoView();
		}, 100);
	};

	const handleSendMessage = async () => {
		if (message.trim() === '') return;
		try {
			let res = await sendMessage({
				variables: {
					senderId: userId,
					receiverId,
					content: message,
				},
			});
			await setCurrentMessages((prevMessages) => [
				...prevMessages,
				res.data.sendMessage,
			]);
			setMessage('');
			scrollToBottom();
		} catch (err) {
			console.error('Send message error:', err);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error loading messages</div>;

	return (
		<div className="relative h-full bg-white">
			<div className="w-full max-w-full bg-white  h-[95%] absolute overflow-y-auto overflow-x-hidden">
				<div className="p-4 space-y-4">
					{currentMessages?.map((msg) => {
						let messageTime = new Date(Number(msg.createdAt));
						const hours = messageTime.getHours();
						const minutes = messageTime.getMinutes();
						const formattedTime = `${hours % 12 || 12}:${minutes
							.toString()
							.padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

						return msg.sender._id === userId ? (
							<div className="flex items-end justify-end" key={msg._id}>
								<div className="bg-blue-500 text-white  px-3 py-2 rounded-lg">
									{msg.content}
									<div className="text-xs text-gray-200 ">{formattedTime}</div>
								</div>
							</div>
						) : (
							<div className="flex items-start space-x-2" key={msg._id}>
								<Avatar
									size="38px"
									textSizeRatio={3}
									round
									color={Avatar.getRandomColor('sitebase', [
										'red',
										'green',
										'blue',
									])}
									name={msg.sender.username}
								/>
								<div className="bg-gray-200 px-3 py-2 rounded-lg">
									{msg.content}
									<div className="text-xs text-gray-400">{formattedTime}</div>
								</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>
			</div>
			<div className="flex absolute bottom-2 w-full px-4">
				<input
					type="text"
					value={message}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleSendMessage();
					}}
					onChange={(e) => setMessage(e.target.value)}
					className="border border-gray-300 p-2 flex-grow rounded-l-lg"
				/>
				<button
					onClick={handleSendMessage}
					className="bg-blue-500 text-white p-2 rounded-r-lg">
					Send
				</button>
			</div>
		</div>
	);
};

export default Chat;
