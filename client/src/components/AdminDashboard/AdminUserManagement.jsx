import React, { useEffect, useState } from 'react';
import { Users, Crown, Car, Phone, Mail, Calendar, ChevronDown, ChevronUp, Search } from 'lucide-react';

import api from '../../services/api';
const UserCard = ({ user, roleColor }) => {
  const [expanded, setExpanded] = useState(false);
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div 
        className="p-3 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full ${roleColor} flex items-center justify-center flex-shrink-0`}>
            {user.role === 'ADMIN' ? <Crown className="w-4 h-4 text-white" /> :
             user.role === 'OWNER' ? <Car className="w-4 h-4 text-white" /> :
             <Users className="w-4 h-4 text-white" />}
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-gray-800 text-sm truncate">{user.fullName}</h3>
            <span className={`text-xs ${roleColor.replace('bg-', 'text-')}`}>
              {user.role}
            </span>
          </div>
        </div>
        {expanded ? 
          <ChevronUp className="w-4 h-4 text-gray-400" /> :
          <ChevronDown className="w-4 h-4 text-gray-400" />
        }
      </div>
      
      {expanded && (
        <div className="px-3 pb-3 space-y-2 text-xs border-t border-gray-100 pt-2">
          <div className="flex items-center text-gray-600">
            <Mail className="w-3 h-3 mr-2" />
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-3 h-3 mr-2" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-3 h-3 mr-2" />
            <span>Joined {formattedDate}</span>
          </div>
        </div>
      )}
    </div>
  );
};

const UserSection = ({ title, users, roleColor, icon: Icon }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer border-b border-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${roleColor.replace('bg-', 'text-')}`} />
          <h3 className="font-medium text-gray-800">
            {title} ({users.length})
          </h3>
        </div>
        {isCollapsed ? 
          <ChevronDown className="w-5 h-5 text-gray-400" /> :
          <ChevronUp className="w-5 h-5 text-gray-400" />
        }
      </div>

      {!isCollapsed && (
        <>
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                roleColor={roleColor} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const AdminUserManagement = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsersDetails = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUsersDetails();
  }, []);

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  const admin = users?.find(user => user.role === 'ADMIN');
  const owners = users?.filter(user => user.role === 'OWNER') || [];
  const regularUsers = users?.filter(user => user.role === 'USER') || [];

  return (
    <div className="p-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

        {admin && (
          <UserSection
            title="System Administrator"
            users={[admin]}
            roleColor="bg-purple-600"
            icon={Crown}
          />
        )}

        <UserSection
          title="Vehicle Owners"
          users={owners}
          roleColor="bg-blue-600"
          icon={Car}
        />

        <UserSection
          title="Regular Users"
          users={regularUsers}
          roleColor="bg-green-600"
          icon={Users}
        />
      </div>
    </div>
  );
};

export default AdminUserManagement;