import { UserForm } from '@/lib/types';
import ActionButton from '@/components/users/ActionButton';
import { useState } from 'react';
// import { Link } from 'react-router-dom';

const SingleUser = ({ user }: { user: UserForm }) => {
  const [deactivated, setDeactivated] = useState<boolean>();
  console.log(deactivated);

  return (
    <div className="flex flex-row space-x-3">
      <div
        className={
          deactivated !== undefined
            ? deactivated
              ? 'text-slate-500'
              : ''
            : user.isDeactivated
            ? 'text-slate-500'
            : ''
        }
      >
        {user.username + ',' + user.isDeleted}
      </div>
      {/* <Link to="/user/update" state={{ initialData: user }}>
            Update User
          </Link> */}

      <ActionButton
        username={user?.username ? user?.username : ''}
        changeStatus={() =>
          deactivated !== undefined
            ? setDeactivated(!deactivated)
            : setDeactivated(!user.isDeactivated)
        }
        process={
          deactivated !== undefined
            ? deactivated
              ? 'activate'
              : 'deactivate'
            : user.isDeactivated
            ? 'activate'
            : 'deactivate'
        }
      />
      <ActionButton
        username={user?.username ? user?.username : ''}
        changeStatus={() => setDeactivated(true)}
        process="delete"
      />
    </div>
  );
};

export default SingleUser;
