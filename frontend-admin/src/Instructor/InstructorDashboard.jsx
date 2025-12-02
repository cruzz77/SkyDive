import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Calendar, DollarSign, Users, Clock, ToggleLeft, ToggleRight } from 'lucide-react';

const InstructorDashboard = () => {
    const [available, setAvailable] = useState(true);

    const stats = [
        {
            icon: Calendar,
            label: 'Total Jumps',
            value: 342,
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: DollarSign,
            label: 'Earnings',
            value: 45600,
            prefix: '$',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: Users,
            label: 'Students Trained',
            value: 156,
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: Clock,
            label: 'Hours in Air',
            value: 428,
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    const upcomingDives = [
        { id: 1, student: 'John Doe', date: '2024-12-05', time: '10:00 AM', type: 'Tandem' },
        { id: 2, student: 'Jane Smith', date: '2024-12-05', time: '2:00 PM', type: 'AFF Level 1' },
        { id: 3, student: 'Bob Wilson', date: '2024-12-06', time: '9:00 AM', type: 'Tandem' },
        { id: 4, student: 'Alice Cooper', date: '2024-12-06', time: '11:00 AM', type: 'Solo' },
    ];

    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Instructor Dashboard</h1>
                        <p className="text-gray-400">Welcome back! Here's your schedule and stats.</p>
                    </div>

                    {/* Availability Toggle */}
                    <motion.button
                        onClick={() => setAvailable(!available)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${available
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {available ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                        {available ? 'Available' : 'Unavailable'}
                    </motion.button>
                </div>
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
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20 flex items-center justify-center mb-4`}>
                            <stat.icon className="h-6 w-6 text-white" />
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

            {/* Upcoming Dives */}
            <motion.div
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Upcoming Dives</h2>
                    <span className="text-sm text-gray-400">{upcomingDives.length} scheduled</span>
                </div>

                <div className="space-y-4">
                    {upcomingDives.map((dive, index) => (
                        <motion.div
                            key={dive.id}
                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                    {dive.student.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="text-white font-semibold">{dive.student}</div>
                                    <div className="text-gray-400 text-sm">{dive.type}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-medium">{dive.date}</div>
                                <div className="text-gray-400 text-sm">{dive.time}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default InstructorDashboard;
