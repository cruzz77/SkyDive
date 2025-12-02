import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { api } from '../services/api';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await api.get('/user/listBookings');
            if (data.success) {
                setBookings(data.bookings || []);
            } else {
                // No bookings for this user
                setBookings([]);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) return;

        try {
            const response = await api.post('/user/cancel-appointment', { bookingId });
            if (response.success) {
                // Refresh bookings
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

    const displayBookings = bookings;

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-600';
            case 'pending':
                return 'bg-yellow-100 text-yellow-600';
            case 'completed':
                return 'bg-blue-100 text-blue-600';
            case 'cancelled':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-24">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        My <span className="gradient-text">Bookings</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        View your past and upcoming skydiving adventures
                    </p>
                </motion.div>

                {/* Bookings Grid */}
                {displayBookings.length === 0 ? (
                    <motion.div
                        className="card text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-dark mb-2">No Bookings Yet</h3>
                        <p className="text-gray-600 mb-6">
                            You haven't booked any packages yet. Start your adventure today!
                        </p>
                        <a href="/packages" className="btn-primary inline-block">
                            Browse Packages
                        </a>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {displayBookings.map((booking, index) => (
                            <motion.div
                                key={booking._id}
                                className="card hover:scale-[1.02]"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="card flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all border border-transparent hover:border-primary/10">
                                    {/* Image Section */}
                                    <div className="w-full md:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={booking.instructorData?.image || "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                                            alt={booking.instructorData?.name || booking.packageName || "Skydiving"}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://ui-avatars.com/api/?name=" + (booking.instructorData?.name || "Sky Dive") + "&background=0D8ABC&color=fff";
                                            }}
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-dark">
                                                        {booking.packageName || booking.instructorData?.name || "Skydiving Adventure"}
                                                    </h3>
                                                    <p className="text-gray-500 text-sm">
                                                        {booking.instructorData?.specialty || "Tandem Jump"}
                                                    </p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${booking.cancelled
                                                    ? 'bg-red-100 text-red-600'
                                                    : booking.isCompleted
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {booking.cancelled ? 'Cancelled' : booking.isCompleted ? 'Completed' : 'Confirmed'}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="h-4 w-4 text-primary" />
                                                    <span>{booking.slotDate || booking.date || "Date TBA"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Clock className="h-4 w-4 text-primary" />
                                                    <span>{booking.slotTime || booking.time || "Time TBA"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    <span>{booking.location || "Cloud City Dropzone"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <DollarSign className="h-4 w-4 text-primary" />
                                                    <span>₹{booking.amount}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100 gap-3">
                                            {!booking.cancelled && !booking.isCompleted && (
                                                <button
                                                    onClick={() => cancelBooking(booking._id)}
                                                    className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-red-200"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                            <button
                                                onClick={() => alert(`Booking Details:\nPackage: ${booking.packageName}\nAmount: ₹${booking.amount}\nDate: ${booking.date}\nStatus: ${booking.status}`)}
                                                className="btn-primary text-sm px-6"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
