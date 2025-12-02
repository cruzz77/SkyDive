import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { DollarSign, Calendar, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
    const stats = [
        {
            icon: DollarSign,
            label: 'Total Revenue',
            value: 125000,
            prefix: '$',
            gradient: 'from-green-500 to-emerald-500',
            change: '+12.5%',
        },
        {
            icon: Calendar,
            label: 'Total Bookings',
            value: 1250,
            gradient: 'from-blue-500 to-cyan-500',
            change: '+8.2%',
        },
        {
            icon: Users,
            label: 'Active Users',
            value: 850,
            gradient: 'from-purple-500 to-pink-500',
            change: '+15.3%',
        },
        {
            icon: TrendingUp,
            label: 'Active Instructors',
            value: 45,
            gradient: 'from-orange-500 to-red-500',
            change: '+5.0%',
        },
    ];

    const recentBookings = [
        { id: 1, user: 'John Doe', instructor: 'Mike Johnson', date: '2024-12-05', status: 'confirmed' },
        { id: 2, user: 'Jane Smith', instructor: 'Sarah Williams', date: '2024-12-06', status: 'pending' },
        { id: 3, user: 'Bob Wilson', instructor: 'Tom Brown', date: '2024-12-07', status: 'confirmed' },
        { id: 4, user: 'Alice Cooper', instructor: 'Mike Johnson', date: '2024-12-08', status: 'completed' },
    ];

    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400 mb-8">Welcome back! Here's what's happening today.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 flex items-center justify-center`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {stat.prefix}
                            <CountUp
                                end={stat.value}
                                duration={2}
                                separator=","
                                enableScrollSpy
                                scrollSpyOnce
                            />
                        </div>
                        <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Recent Bookings */}
            <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Recent Bookings</h2>
                    <button className="text-primary hover:text-secondary text-sm font-semibold transition-colors">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Instructor</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                                <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((booking, index) => (
                                <motion.tr
                                    key={booking.id}
                                    className="table-row"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                >
                                    <td className="py-4 px-4 text-white">{booking.user}</td>
                                    <td className="py-4 px-4 text-gray-300">{booking.instructor}</td>
                                    <td className="py-4 px-4 text-gray-300">{booking.date}</td>
                                    <td className="py-4 px-4">
                                        <span className={`
                      px-3 py-1 rounded-full text-xs font-semibold
                      ${booking.status === 'confirmed' ? 'badge-success' : ''}
                      ${booking.status === 'pending' ? 'badge-warning' : ''}
                      ${booking.status === 'completed' ? 'badge-info' : ''}
                    `}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
