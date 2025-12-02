import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Phone,
            title: 'Phone',
            value: '+91 83********',
            subtitle: 'Mon-Sun 8am - 8pm IST',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Mail,
            title: 'Email',
            value: 'abc@gmail.com',
            subtitle: 'We reply within 24 hours',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: MapPin,
            title: 'Location',
            value: 'India',
            subtitle: 'Multiple drop zones available',
            gradient: 'from-orange-500 to-red-500',
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
                        Get in <span className="gradient-text">Touch</span>
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have questions? Ready to book your adventure? We're here to help you take the leap.
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {contactInfo.map((info, index) => (
                        <motion.div
                            key={index}
                            className="card group hover:scale-105"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${info.gradient} bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <info.icon className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-2">{info.title}</h3>
                            <p className="text-gray-900 font-semibold mb-1">{info.value}</p>
                            <p className="text-gray-500 text-sm">{info.subtitle}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact Form & Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        className="card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold text-dark mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="h-4 w-4 inline mr-2" />
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-premium"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="h-4 w-4 inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-premium"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MessageSquare className="h-4 w-4 inline mr-2" />
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="input-premium"
                                    placeholder="Booking Inquiry"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    className="input-premium resize-none"
                                    placeholder="Tell us about your inquiry..."
                                    required
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="h-5 w-5" />
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Owner Info Card */}
                        <div className="card bg-gradient-to-br from-primary/5 to-secondary/5">
                            <h3 className="text-2xl font-bold text-dark mb-6">Meet the Founder</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                                        AC
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-dark">Aditya Chopra</h4>
                                        <p className="text-gray-600">Founder & Chief Instructor</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    With over 15 years of skydiving experience and thousands of successful jumps, Aditya is passionate about sharing the thrill of flight with adventurers worldwide.
                                </p>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="card">
                            <h3 className="text-2xl font-bold text-dark mb-6">Quick FAQs</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-dark mb-2">What's the minimum age?</h4>
                                    <p className="text-gray-600 text-sm">Participants must be at least 18 years old with valid ID.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark mb-2">What should I wear?</h4>
                                    <p className="text-gray-600 text-sm">Comfortable athletic clothing and closed-toe shoes.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark mb-2">Can I bring a camera?</h4>
                                    <p className="text-gray-600 text-sm">We provide professional photo/video packages for safety.</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark mb-2">What if weather is bad?</h4>
                                    <p className="text-gray-600 text-sm">We'll reschedule your jump for optimal conditions at no extra cost.</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="card bg-gradient-to-br from-primary to-secondary text-white">
                            <h3 className="text-2xl font-bold mb-3">Ready to Jump?</h3>
                            <p className="mb-6 text-white/90">
                                Book your skydiving experience today and get 10% off your first jump!
                            </p>
                            <motion.a
                                href="/packages"
                                className="inline-block px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Packages
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
