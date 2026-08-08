import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { 
  Users, 
  Hotel, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Globe, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useStore();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  React.useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 120 },
    { month: 'Feb', revenue: 52000, bookings: 145 },
    { month: 'Mar', revenue: 48000, bookings: 135 },
    { month: 'Apr', revenue: 61000, bookings: 178 },
    { month: 'May', revenue: 69000, bookings: 195 },
    { month: 'Jun', revenue: 78000, bookings: 210 },
  ];

  const safetyData = [
    { name: 'Very Safe', value: 35, color: '#10B981' },
    { name: 'Safe', value: 28, color: '#3B82F6' },
    { name: 'Moderate', value: 22, color: '#F59E0B' },
    { name: 'Caution', value: 12, color: '#EF4444' },
    { name: 'High Risk', value: 3, color: '#7C2D12' },
  ];

  const topDestinations = [
    { name: 'Paris', bookings: 1250, revenue: 325000, growth: 12 },
    { name: 'Tokyo', bookings: 980, revenue: 285000, growth: 18 },
    { name: 'New York', bookings: 875, revenue: 410000, growth: 8 },
    { name: 'Dubai', bookings: 650, revenue: 195000, growth: 25 },
  ];

  const stats = [
    { title: 'Total Revenue', value: '$2.4M', change: '+12%', icon: CreditCard, color: 'text-green-600' },
    { title: 'Total Bookings', value: '8,432', change: '+18%', icon: Calendar, color: 'text-blue-600' },
    { title: 'Active Users', value: '12,345', change: '+8%', icon: Users, color: 'text-purple-600' },
    { title: 'Safety Score', value: '8.7/10', change: '+0.3', icon: Shield, color: 'text-green-600' },
  ];

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your tourism platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'bookings', name: 'Bookings', icon: Calendar },
                { id: 'safety', name: 'Safety Analytics', icon: Shield },
                { id: 'destinations', name: 'Destinations', icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bookings Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bookings Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {selectedTab === 'safety' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Safety Distribution */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Score Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={safetyData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {safetyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Safety Alerts */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Crime Level Update</p>
                      <p className="text-sm text-yellow-700">
                        Bangkok crime level increased from 'low' to 'moderate'
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Safety Warning</p>
                      <p className="text-sm text-red-700">
                        New travel advisory for Rio de Janeiro
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Safety Improvement</p>
                      <p className="text-sm text-green-700">
                        Singapore safety score improved to 9.5/10
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'destinations' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Destinations</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Destination</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Bookings</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topDestinations.map((destination, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{destination.name}</td>
                        <td className="py-3 px-4 text-gray-600">{destination.bookings.toLocaleString()}</td>
                        <td className="py-3 px-4 text-gray-600">${destination.revenue.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span className="text-green-600 font-medium">+{destination.growth}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'bookings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Guest</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Hotel</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Check-in</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { guest: 'John Doe', hotel: 'The Ritz Paris', checkin: '2024-02-15', amount: '$1,200', status: 'Confirmed' },
                      { guest: 'Jane Smith', hotel: 'Park Hyatt Tokyo', checkin: '2024-02-18', amount: '$950', status: 'Confirmed' },
                      { guest: 'Bob Johnson', hotel: 'The Plaza New York', checkin: '2024-02-20', amount: '$1,450', status: 'Pending' },
                    ].map((booking, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{booking.guest}</td>
                        <td className="py-3 px-4 text-gray-600">{booking.hotel}</td>
                        <td className="py-3 px-4 text-gray-600">{booking.checkin}</td>
                        <td className="py-3 px-4 text-gray-600">{booking.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'Confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;