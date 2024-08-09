import { gql, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import Chat from '../components/ChatWindow';
import UserList from '../components/UsersList';
const GET_USERS_QUERY = gql`
	query Query {
		users {
			_id
			username
			email
		}
	}
`;

const GET__CURRENT_USERS_QUERY = gql`
	query User($userId: ID!) {
		user(id: $userId) {
			email
			username
		}
	}
`;
const ChatScreen = ({}) => {
	const { data, loading, error } = useQuery(GET_USERS_QUERY);
	const { userId, receiverId } = useParams();
	const { currentUser } = useQuery(GET__CURRENT_USERS_QUERY, {
		variables: { userId },
	});
	const navigate = useNavigate();
	return (
		<div className="m-auto h-[98dvh] w-[98dvw] shadow-2xl grid grid-flow-col grid-cols-12 gap-1 divide-y-4">
			<div className="col-span-4 border border-r-slate-200 shadow-xl divide-y-2">
				{data ? (
					data.users.map((user) => {
						if (user._id !== userId) {
							return (
								<div
									className={`p-2 ${
										user._id == receiverId ? 'bg-blue-300' : ''
									} hover:bg-blue-100 `}
									key={user._id}
									onClick={() => {
										navigate(`/chat/${userId}/${user._id}`);
									}}>
									<UserList user={user}></UserList>
								</div>
							);
						} else {
							return (
								<div className="bottom-5 absolute border-t-2 w-full">
									<UserList user={user}></UserList>
								</div>
							);
						}
					})
				) : (
					<h1>Loading</h1>
				)}
			</div>
			<div className="col-span-8">
				<Chat />
			</div>
		</div>
	);
};

export default ChatScreen;
