import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Users, BookOpen, BookmarkPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-semibold text-xl">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'} mr-4`}
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center ${
                  theme === 'dark' ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
                } text-white font-bold py-2 px-4 rounded`}
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`mr-4 py-2 px-4 font-medium ${
                activeTab === 'users'
                  ? theme === 'dark'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : ''
              }`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={18} className="inline mr-2" />
              Users
            </button>
            <button
              className={`mr-4 py-2 px-4 font-medium ${
                activeTab === 'books'
                  ? theme === 'dark'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : ''
              }`}
              onClick={() => setActiveTab('books')}
            >
              <BookOpen size={18} className="inline mr-2" />
              Books
            </button>
            <button
              className={`py-2 px-4 font-medium ${
                activeTab === 'categories'
                  ? theme === 'dark'
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-blue-600 text-blue-600'
                  : ''
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <BookmarkPlus size={18} className="inline mr-2" />
              Categories
            </button>
          </div>

          {activeTab === 'users' && (
            <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
              <div className="px-4 py-5 sm:px-6">
                <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>User Management</h3>
                <p className={`mt-1 max-w-2xl text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Manage system users here.</p>
              </div>
              {/* Add user management functionality here */}
            </div>
          )}

          {activeTab === 'books' && (
            <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
              <div className="px-4 py-5 sm:px-6">
                <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Book Management</h3>
                <p className={`mt-1 max-w-2xl text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Manage library books here.</p>
              </div>
              {/* Add book management functionality here */}
            </div>
          )}

          {activeTab === 'categories' && (
            <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
              <div className="px-4 py-5 sm:px-6">
                <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Category Management</h3>
                <p className={`mt-1 max-w-2xl text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Manage book categories here.</p>
              </div>
              {/* Add category management functionality here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;