
import React from 'react';
import { Settings } from 'lucide-react';
import { User } from '@/types';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between p-4 border-t border-gray-800">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <span className="font-medium text-white">{user.name}</span>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-800">
        <Settings size={20} className="text-gray-400" />
      </button>
    </div>
  );
};

export default UserProfile;
