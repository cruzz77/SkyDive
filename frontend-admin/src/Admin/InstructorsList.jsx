import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Award, DollarSign, Star, Globe } from 'lucide-react';
import { api } from '../services/api';

const InstructorsList = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInstructors();
    }, []);

    const fetchInstructors = async () => {
        try {
            const data = await api.get('/admin/all-instructors', 'admin');
            if (data.success) {
                setInstructors(data.instructors || []);
            }
        } catch (error) {
            console.error('Error fetching instructors:', error);
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-3xl font-bold text-white mb-2">Instructors List</h1>
                        <p className="text-gray-400">View and manage all instructors</p>
                    </div>
                    <div className="text-white/60">
                        Total: <span className="text-white font-bold">{instructors.length}</span> instructors
                    </div>
                </div>

                {instructors.length === 0 ? (
                    <div className="card text-center py-16">
                        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No Instructors Found</h3>
                        <p className="text-gray-400 mb-6">
                            No instructors have been added yet. Add your first instructor to get started.
                        </p>
                        <a href="/add-instructor" className="btn-primary inline-block">
                            Add Instructor
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {instructors.map((instructor, index) => (
                            <motion.div
                                key={instructor._id || index}
                                className="card hover:scale-105"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                                            {instructor.name ? instructor.name[0].toUpperCase() : 'I'}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">{instructor.name}</h3>
                                            <p className="text-primary text-sm">{instructor.specialty}</p>
                                        </div>
                                    </div>
                                    {instructor.available !== undefined && (
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${instructor.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {instructor.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="space-y-3 mb-4">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Mail className="h-4 w-4 text-white/40" />
                                        <span className="truncate">{instructor.email}</span>
                                    </div>

                                    {instructor.phone && (
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Phone className="h-4 w-4 text-white/40" />
                                            <span>{instructor.phone}</span>
                                        </div>
                                    )}

                                    {instructor.experience && (
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Award className="h-4 w-4 text-white/40" />
                                            <span>{instructor.experience} years experience</span>
                                        </div>
                                    )}

                                    {instructor.languages && instructor.languages.length > 0 && (
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Globe className="h-4 w-4 text-white/40" />
                                            <span>{instructor.languages.join(', ')}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-white font-bold">{instructor.rating || '4.5'}</span>
                                    </div>
                                    {instructor.rate && (
                                        <div className="flex items-center gap-1 text-primary font-bold">
                                            <DollarSign className="h-4 w-4" />
                                            <span>{instructor.rate}/hr</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default InstructorsList;
