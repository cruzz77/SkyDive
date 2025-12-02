import React, { useState } from 'react';
import { Star, Globe, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const InstructorCard = ({ instructor }) => {
    const [imageError, setImageError] = useState(false);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <motion.div
            className="card group hover:scale-105"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image */}
            <div className="relative h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                {!imageError && instructor.image ? (
                    <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                        <span className="text-6xl font-bold text-white">
                            {getInitials(instructor.name)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    <p className="text-primary font-medium">{instructor.specialty}</p>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold text-dark">{instructor.rating}</span>
                        <span className="text-gray-400 text-sm">({instructor.reviews})</span>
                    </div>
                    <div className="text-primary font-bold">₹{instructor.rate}/hr</div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{instructor.experience} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Globe className="h-4 w-4" />
                        <span>{instructor.languages.join(', ')}</span>
                    </div>
                </div>

                <button className="w-full btn-secondary">View Profile</button>
            </div>
        </motion.div>
    );
};

export default InstructorCard;
