import React from 'react';
import { motion } from 'framer-motion';
import { Check, Cloud, Mountain, Thermometer, TrendingUp, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
    return (
        <div className="card group hover:scale-[1.02] transition-all duration-300 border-t-4 border-t-primary">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-dark mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-primary">₹{pkg.price}</span>
                    <span className="text-gray-500">/ jump</span>
                </div>
            </div>
            {/* Book Button */}
            <Link
                to={`/book/${pkg.id || '1'}`}
                state={{ package: pkg }}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
                Book Now
            </Link>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                    <Cloud className="h-5 w-5 text-primary" />
                    <span>Altitude: {pkg.altitude}ft</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <Mountain className="h-5 w-5 text-secondary" />
                    <span>Difficulty: {pkg.difficulty}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <Thermometer className="h-5 w-5 text-accent" />
                    <span>Weather: {pkg.weather}</span>
                </div>
            </div>

            <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <Link
                to={`/book/${pkg.id}`}
                className="w-full btn-primary block text-center"
            >
                Book Now
            </Link>
        </div>
    );
};

export default PackageCard;
