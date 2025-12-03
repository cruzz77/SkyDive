import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, User, DollarSign, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { api } from '../services/api';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'info' });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await api.get('/user/listBookings');
            if (data.success) {
                setBookings(data.bookings || []);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = (bookingId) => {
        setBookingToCancel(bookingId);
        setShowCancelModal(true);
    };

    const confirmCancel = async () => {
        if (!bookingToCancel) return;

        try {
            const response = await api.post('/user/cancel-appointment', { bookingId: bookingToCancel });
            if (response.success) {
                fetchBookings();
                setToast({ message: 'Booking cancelled successfully', type: 'success' });
                setShowCancelModal(false);
            } else {
                setToast({ message: response.message || 'Failed to cancel booking', type: 'error' });
            }
        } catch (error) {
            console.error('Error cancelling booking:', error);
            setToast({ message: 'An error occurred while cancelling', type: 'error' });
        }
    };

    const displayBookings = bookings;

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
                                                    onClick={() => handleCancelClick(booking._id)}
                                                    className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium border border-red-200"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
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

                {/* Toast Notification */}
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, message: '' })}
                />

                {/* Cancel Confirmation Modal */}
                <Modal
                    isOpen={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    title="Cancel Booking"
                >
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 bg-red-50 p-4 rounded-xl border border-red-100">
                            <div className="p-2 bg-red-100 rounded-full">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-900">Are you sure?</h4>
                                <p className="text-red-700 text-sm mt-1">
                                    This action cannot be undone. You are about to cancel your booking for <span className="font-semibold">{bookings.find(b => b._id === bookingToCancel)?.packageName}</span>.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                            >
                                Keep Booking
                            </button>
                            <button
                                onClick={confirmCancel}
                                className="px-5 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all hover:shadow-lg hover:shadow-red-500/30 font-medium"
                            >
                                Yes, Cancel It
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* View Details Modal */}
                <Modal
                    isOpen={!!selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                    title="Booking Details"
                >
                    {selectedBooking && (
                        <div className="space-y-6">
                            {/* Header Info */}
                            <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
                                <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden">
                                    <img
                                        src={selectedBooking.instructorData?.image || "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
                                        alt="Instructor"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-dark">{selectedBooking.packageName}</h4>
                                    <p className="text-gray-500 text-sm">{selectedBooking.instructorData?.name}</p>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Date</p>
                                    <div className="flex items-center gap-2 text-dark font-medium">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        {selectedBooking.slotDate || selectedBooking.date}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Time</p>
                                    <div className="flex items-center gap-2 text-dark font-medium">
                                        <Clock className="w-4 h-4 text-primary" />
                                        {selectedBooking.slotTime || selectedBooking.time}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Amount</p>
                                    <div className="flex items-center gap-2 text-dark font-medium">
                                        <DollarSign className="w-4 h-4 text-primary" />
                                        ₹{selectedBooking.amount}
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Status</p>
                                    <div className={`flex items-center gap-2 font-medium ${selectedBooking.cancelled ? 'text-red-600' :
                                            selectedBooking.isCompleted ? 'text-green-600' : 'text-blue-600'
                                        }`}>
                                        <div className={`w-2 h-2 rounded-full ${selectedBooking.cancelled ? 'bg-red-500' :
                                                selectedBooking.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                            }`} />
                                        {selectedBooking.cancelled ? 'Cancelled' : selectedBooking.isCompleted ? 'Completed' : 'Confirmed'}
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-dark">Location</p>
                                        <p className="text-sm text-gray-600 mt-0.5">{selectedBooking.location || "Cloud City Dropzone, Sky High Terminal, Gate 4"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setSelectedBooking(null)}
                                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </div>
    );
};

export default MyBookings;
