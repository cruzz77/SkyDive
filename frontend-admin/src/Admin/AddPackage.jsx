import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, DollarSign, TrendingUp, Mountain, Cloud, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

const AddPackage = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        altitude: '',
        difficulty: 'Beginner',
        weather: 'Clear Sky',
        features: '',
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
            const packageData = {
                ...formData,
                price: parseInt(formData.price),
                altitude: parseInt(formData.altitude),
                features: formData.features.split('\n').filter(f => f.trim()),
            };

            const response = await api.post('/admin/add-package', packageData, 'admin');

            if (response.success) {
                setSuccess(true);
                setFormData({
                    name: '',
                    price: '',
                    altitude: '',
                    difficulty: 'Beginner',
                    weather: 'Clear Sky',
                    features: '',
                });
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setError(response.message || 'Failed to add package');
            }
        } catch (err) {
            console.error('Error adding package:', err);
            setError('Failed to add package. Please try again.');
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
                <h1 className="text-3xl font-bold text-white mb-2">Add Package</h1>
                <p className="text-gray-400 mb-8">Create new skydiving packages</p>

                {success && (
                    <motion.div
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <p className="text-green-300">Package added successfully!</p>
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
                        {/* Package Name */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Package Name *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Package className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="Tandem Jump"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Price ($) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="299"
                                />
                            </div>
                        </div>

                        {/* Altitude */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Altitude (ft) *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <TrendingUp className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="number"
                                    name="altitude"
                                    required
                                    min="0"
                                    value={formData.altitude}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                    placeholder="10000"
                                />
                            </div>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Difficulty Level *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mountain className="h-5 w-5 text-white/40" />
                                </div>
                                <select
                                    name="difficulty"
                                    required
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        </div>

                        {/* Weather */}
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Weather Condition *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Cloud className="h-5 w-5 text-white/40" />
                                </div>
                                <select
                                    name="weather"
                                    required
                                    value={formData.weather}
                                    onChange={handleChange}
                                    className="input-dark pl-12"
                                >
                                    <option value="Clear Sky">Clear Sky</option>
                                    <option value="Low Wind">Low Wind</option>
                                    <option value="Variable">Variable</option>
                                    <option value="Any">Any</option>
                                </select>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Features (one per line) *
                            </label>
                            <textarea
                                name="features"
                                required
                                value={formData.features}
                                onChange={handleChange}
                                rows="6"
                                className="input-dark"
                                placeholder="Instructor strapped to you&#10;30 seconds freefall&#10;5-minute parachute ride&#10;Certificate of completion&#10;HD Video included"
                            />
                            <p className="text-gray-500 text-sm mt-2">Enter each feature on a new line</p>
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
                                    <Package className="h-5 w-5" />
                                    Add Package
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                name: '',
                                price: '',
                                altitude: '',
                                difficulty: 'Beginner',
                                weather: 'Clear Sky',
                                features: '',
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

export default AddPackage;
