"use client";
import { useEffect, useState } from 'react';
import UserTable from '@/components/admin/UserTable';
import { User } from '@/types/admin';
import { AlertCircle, Loader2 } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/users');
        
        if (!response.ok) {
          // Handle non-2xx responses
          if (response.status === 401) {
            setError('You must be logged in to view this page');
          } else if (response.status === 403) {
            setError('You do not have permission to access this page');
          } else {
            const errorData = await response.json().catch(() => null);
            setError(errorData?.error || `Error ${response.status}: Failed to fetch users`);
          }
          return;
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format');
        }
        
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
        <span className="ml-2 text-lg">Loading users...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
          <AlertCircle className="text-red-600 h-5 w-5 mt-0.5 mr-3" />
          <div>
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <UserTable users={users} />
    </div>
  );
};

export default UsersPage;