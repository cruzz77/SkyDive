import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, MapPin, DollarSign, Filter } from 'lucide-react';
import { api } from '../services/api';

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await api.get('/admin/bookings', 'admin');
            if (data.success) {
                setBookings(data.bookings || []);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const response = await api.post('/admin/cancel-booking', { bookingId }, 'admin');
            if (response.success) {
                fetchBookings();
                alert('Booking cancelled successfully');
            } else {
                alert(response.message || 'Failed to cancel booking');
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('An error occurred while cancelling');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'badge-success';
            case 'pending':
                return 'badge-warning';
            case 'completed':
                return 'badge-info';
            case 'cancelled':
                return 'badge-error';
            default:
                return 'badge-info';
        }
    };

    const filteredBookings = filter === 'all'
        ? bookings
        : bookings.filter(b => b.status === filter);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">All Bookings</h1>
                        <p className="text-gray-400">Manage all platform bookings</p>
                    </div>

                    {/* Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input-dark"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                {filteredBookings.length === 0 ? (
                    <div className="card text-center py-16">
                        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No Bookings Found</h3>
                        <p className="text-gray-400">
                            {filter === 'all' ? 'No bookings have been made yet.' : `No ${filter} bookings found.`}
                        </p>
                    </div>
                ) : (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">User</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Package</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Instructor</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Date</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Price</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Status</th>
                                        <th className="text-left py-4 px-6 text-white/80 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking.id || index}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                                        {booking.userName ? booking.userName[0].toUpperCase() : 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium">{booking.userName || 'User'}</div>
                                                        <div className="text-gray-400 text-sm">{booking.userEmail || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-white">{booking.packageName || 'N/A'}</td>
                                            <td className="py-4 px-6 text-white">{booking.instructor || 'N/A'}</td>
                                            <td className="py-4 px-6 text-gray-400">
                                                {booking.date || 'N/A'} {booking.time && `at ${booking.time}`}
                                            </td>
                                            <td className="py-4 px-6 text-white font-bold">₹{booking.amount || booking.price || 0}</td>
                                            <td className="py-4 px-6">
                                                <span className={getStatusColor(booking.status)}>
                                                    {booking.status || 'pending'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                {!booking.cancelled && !booking.isCompleted && (
                                                    <button
                                                        onClick={() => cancelBooking(booking._id)}
                                                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-3 py-1 rounded-lg text-sm transition-colors border border-red-500/20"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AllBookings;
