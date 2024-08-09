import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
const UserList = ({user} ) => {
  const { receiverId } = useParams();
  return (
    <div className={`cursor-pointer w-full flex align-middle items-center rounded-2xl`}>
      <div className=" p-2">
        <Avatar size='45px' textSizeRatio={3} round color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={user.username} />
      </div>
      <div className=''>
        <p className='text-xl font-semibold' >{user.username}</p>
        <span className='text-stone-700 text-sm'>{user.email}</span>
      </div>
    </div>
  )
}

export default UserList