import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, Award, Shield, Zap } from 'lucide-react';

const About = () => {
    const features = [
        {
            icon: Users,
            title: 'Expert Team',
            description: 'World-class instructors with thousands of jumps and decades of combined experience.',
        },
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To provide the safest, most exhilarating skydiving experience possible for every jumper.',
        },
        {
            icon: Heart,
            title: 'Our Passion',
            description: 'We live for the sky. Every jump is a new adventure, and we love sharing that joy.',
        },
        {
            icon: Award,
            title: 'Certified Excellence',
            description: 'Fully licensed and certified by international skydiving authorities.',
        },
        {
            icon: Shield,
            title: 'Safety First',
            description: 'State-of-the-art equipment and rigorous safety protocols on every jump.',
        },
        {
            icon: Zap,
            title: 'Thrilling Experience',
            description: 'Unforgettable adrenaline rush combined with breathtaking views.',
        },
    ];

    return (
        <div className="pt-24 pb-20 bg-gradient-to-b from-slate-50 to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        About <span className="gradient-text">SkyDive</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        We are a team of passionate skydivers dedicated to sharing the thrill of human flight with the world.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="card group hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Story Section */}
                <motion.div
                    className="bg-white rounded-3xl overflow-hidden shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-12 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-dark mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                Founded in 2010, SkyDive started as a small dropzone with one plane and a dream. Today, we are one of the premier skydiving centers in the region, known for our safety record and friendly atmosphere.
                            </p>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                We have trained thousands of students and hosted countless tandem jumps. Whether you are a first-timer or a seasoned pro, you are family here.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Our commitment to excellence and safety has earned us recognition from international skydiving organizations and countless satisfied customers who return year after year.
                            </p>
                        </div>
                        <div className="h-96 md:h-auto relative bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <div className="text-center text-white p-8">
                                <div className="text-6xl font-bold mb-4">15+</div>
                                <div className="text-xl">Years of Excellence</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
