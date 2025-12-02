import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Mail, Phone, Award, Globe, DollarSign, Upload, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

const AddInstructor = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        specialty: '',
        experience: '',
        languages: '',
        rate: '',
        rating: '4.5',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const instructorData = {
                ...formData,
                experience: parseInt(formData.experience),
                rate: parseInt(formData.rate),
                rating: parseFloat(formData.rating),
                languages: formData.languages.split(',').map(lang => lang.trim()),
            };

            const response = await api.post('/admin/add-instructor', instructorData, 'admin');

            if (response.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                    specialty: '',
                    experience: '',
                    languages: '',
                    rate: '',
                    rating: '4.5',
                });
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(response.message || 'Failed to add instructor');
            }
        } catch (err) {
            console.error('Error adding instructor:', err);
            setError('Failed to add instructor. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">Add Instructor</h1>
                <p className="text-gray-400 mb-8">Add new instructors to the platform</p>

                {success && (
                    <motion.div
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <p className="text-green-300">Instructor added successfully!</p>
                    </motion.div>
                )}

                {error && (
                    <motion.div
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-red-300">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="card max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Full Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <UserCheck className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="instructor@skydive.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Password *
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="input-dark"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>
                        </div>

                        {/* Specialty */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Specialty *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Award className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    name="specialty"
                                    required
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="Tandem Master"
                                />
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Years of Experience *
                            </label>
                            <input
                                type="number"
                                name="experience"
                                required
                                min="0"
                                value={formData.experience}
                                onChange={handleChange}
                                className="input-dark"
                                placeholder="5"
                            />
                        </div>

                        {/* Languages */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Languages (comma-separated) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Globe className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    name="languages"
                                    required
                                    value={formData.languages}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="English, Spanish"
                                />
                            </div>
                        </div>

                        {/* Rate */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Hourly Rate ($) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="number"
                                    name="rate"
                                    required
                                    min="0"
                                    value={formData.rate}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="150"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="spinner" />
                            ) : (
                                <>
                                    <UserCheck className="h-5 w-5" />
                                    Add Instructor
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: '',
                                email: '',
                                password: '',
                                phone: '',
                                specialty: '',
                                experience: '',
                                languages: '',
                                rate: '',
                                rating: '4.5',
                            })}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all"
                        >
                            Clear Form
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddInstructor;
