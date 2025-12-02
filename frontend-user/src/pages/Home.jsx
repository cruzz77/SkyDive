import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Shield, Users, Award, Clock, Target, Heart } from 'lucide-react';
import Hero from '../components/Hero';

const Home = () => {
    const features = [
        {
            icon: Shield,
            title: 'Safety First',
            description: 'State-of-the-art equipment and rigorous safety protocols ensure your jump is secure.',
        },
        {
            icon: Users,
            title: 'Expert Instructors',
            description: 'Learn from certified professionals with thousands of successful jumps.',
        },
        {
            icon: Award,
            title: 'Premium Experience',
            description: 'Top-tier service and unforgettable memories from takeoff to landing.',
        },
        {
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Book your jump at a time that works for you, 7 days a week.',
        },
        {
            icon: Target,
            title: 'Perfect Locations',
            description: 'Breathtaking drop zones with stunning views and ideal conditions.',
        },
        {
            icon: Heart,
            title: 'Lifetime Memories',
            description: 'Professional photo and video packages to relive your adventure forever.',
        },
    ];

    const stats = [
        { number: 15000, suffix: '+', label: 'Happy Jumpers', duration: 2.5 },
        { number: 50, suffix: '+', label: 'Expert Instructors', duration: 2 },
        { number: 15, label: 'Years of Excellence', duration: 2 },
        { number: 99.9, suffix: '%', label: 'Safety Record', duration: 2.5 },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <Hero />

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Why Choose <span className="gradient-text">SkyDive</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We combine cutting-edge safety with unmatched thrills to deliver the ultimate skydiving experience.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card group hover:scale-105"
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Track Record
                        </h2>
                        <p className="text-white/60 text-lg">
                            Numbers that speak for themselves
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="glass p-8 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="text-5xl md:text-6xl font-bold gradient-text mb-3">
                                    <CountUp
                                        end={stat.number}
                                        duration={stat.duration}
                                        suffix={stat.suffix || ''}
                                        enableScrollSpy
                                        scrollSpyOnce
                                    />
                                </div>
                                <div className="text-white/80 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Take the Leap?
                        </h2>
                        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                            Join thousands of thrill-seekers who have experienced the adventure of a lifetime. Book your jump today!
                        </p>
                        <motion.a
                            href="/packages"
                            className="inline-block px-10 py-5 bg-white text-primary font-bold rounded-2xl shadow-2xl hover:shadow-white/50 transition-all text-lg"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            View Packages
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
