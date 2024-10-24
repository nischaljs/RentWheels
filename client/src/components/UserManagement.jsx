import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Uncomment the line below to fetch data from the API
        // const response = await axios.get('/api/users');
        // setUsers(response.data);

        // Sample data for now
        const sampleUsers = [
          { id: 1, fullName: 'John Doe', email: 'john.doe@example.com', role: 'USER' },
          { id: 2, fullName: 'Jane Smith', email: 'jane.smith@example.com', role: 'OWNER' },
        ];
        setUsers(sampleUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.fullName} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
