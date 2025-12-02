import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, MapPin, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookPackage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState('');

    // Get package data from location state or use defaults
    // Hardcoded packages for fallback lookup
    const packages = [
        {
            id: 1,
            name: "Tandem Jump",
            price: 299,
            altitude: "10,000ft",
            difficulty: "Beginner",
            weather: "Clear Sky"
        },
        {
            id: 2,
            name: "High Altitude",
            price: 499,
            altitude: "15,000ft",
            difficulty: "Intermediate",
            weather: "Low Wind"
        },
        {
            id: 3,
            name: "Solo Certification",
            price: 1299,
            altitude: "13,000ft",
            difficulty: "Advanced",
            weather: "Variable"
        }
    ];

    // Get package data from location state or lookup by ID
    const packageData = location.state?.package || packages.find(p => p.id === parseInt(id)) || packages[0];

    const handleBooking = async () => {
        if (!token) {
            navigate('/login');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const bookingData = {
                packageId: id || '1',
                packageName: packageData.name,
                price: packageData.price,
                altitude: packageData.altitude,
                difficulty: packageData.difficulty,
                date: new Date().toLocaleDateString('en-CA'), // YYYY-MM-DD
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                location: 'Cloud City Dropzone',
                instructor: 'Mike Johnson',
                status: 'confirmed',
            };

            const response = await api.post('/user/booking', bookingData);

            if (response.success) {
                setConfirmed(true);
            } else {
                setError(response.message || 'Booking failed. Please try again.');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setError('Failed to create booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (confirmed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
                <motion.div
                    className="max-w-2xl w-full mx-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="card text-center py-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
                        </motion.div>

                        <h1 className="text-4xl font-bold text-dark mb-4">
                            Package Confirmed!
                        </h1>
                        <p className="text-gray-600 text-lg mb-8">
                            Your skydiving adventure has been successfully booked.
                        </p>

                        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
                            <h2 className="text-2xl font-bold text-dark mb-6">{packageData.name}</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="text-sm text-gray-500">Price</div>
                                        <div className="font-bold text-dark">₹{packageData.price}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="text-sm text-gray-500">Altitude</div>
                                        <div className="font-bold text-dark">{packageData.altitude}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="text-sm text-gray-500">Status</div>
                                        <div className="font-bold text-green-600">Confirmed</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <div>
                                        <div className="text-sm text-gray-500">Location</div>
                                        <div className="font-bold text-dark">Cloud City Dropzone</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/my-bookings')}
                                className="btn-primary flex items-center justify-center gap-2"
                            >
                                View My Bookings
                                <ArrowRight className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => navigate('/packages')}
                                className="px-8 py-4 bg-white border-2 border-primary text-primary font-semibold rounded-2xl hover:bg-primary/5 transition-all"
                            >
                                Book Another Package
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-bold text-center mb-4">
                        Confirm Your <span className="gradient-text">Adventure</span>
                    </h1>
                    <p className="text-gray-600 text-center text-lg mb-12">
                        Review your package details and confirm your booking
                    </p>

                    <div className="card mb-8">
                        <h2 className="text-3xl font-bold text-dark mb-6">{packageData.name}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <DollarSign className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Total Price</div>
                                    <div className="text-2xl font-bold gradient-text">₹{packageData.price}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Altitude</div>
                                    <div className="text-xl font-bold text-dark">{packageData.altitude}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Difficulty</div>
                                    <div className="text-xl font-bold text-dark">{packageData.difficulty}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Location</div>
                                    <div className="text-xl font-bold text-dark">Cloud City Dropzone</div>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleBooking}
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="spinner" />
                            ) : (
                                <>
                                    Confirm Booking
                                    <CheckCircle className="h-5 w-5" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BookPackage;
