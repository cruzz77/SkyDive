import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import { useInstructor } from '../context/InstructorContext';
import { Lock, Mail, ArrowRight, AlertCircle, Shield, GraduationCap } from 'lucide-react';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login: adminLogin } = useAdmin();
    const { login: instructorLogin } = useInstructor();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let result;
        if (state === 'Admin') {
            result = await adminLogin(email, password);
            if (result.success) navigate('/admin-dashboard');
        } else {
            result = await instructorLogin(email, password);
            if (result.success) navigate('/instructor-dashboard');
        }

        setLoading(false);
        if (!result.success) {
            setError(result.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                }} />
            </div>

            <motion.div
                className="max-w-md w-full space-y-8 glass-dark p-10 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Role Toggle */}
                <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                    <button
                        onClick={() => setState('Admin')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${state === 'Admin'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <Shield className="h-4 w-4 inline mr-2" />
                        Admin
                    </button>
                    <button
                        onClick={() => setState('Instructor')}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${state === 'Instructor'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <GraduationCap className="h-4 w-4 inline mr-2" />
                        Instructor
                    </button>
                </div>

                <div className="text-center">
                    <motion.h2
                        className="text-4xl font-bold text-white mb-2"
                        key={state}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {state} Login
                    </motion.h2>
                    <p className="text-white/60">Access the {state} Dashboard</p>
                </div>

                {error && (
                    <motion.div
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-300 text-sm">{error}</p>
                    </motion.div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-dark pl-12"
                                    placeholder={state === 'Admin' ? 'sky@example.com' : 'instructor@skydive.com'}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/80 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-white/40" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-dark pl-12"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={!loading ? { scale: 1.02 } : {}}
                        whileTap={!loading ? { scale: 0.98 } : {}}
                    >
                        {loading ? (
                            <div className="spinner" />
                        ) : (
                            <>
                                Login
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="text-center text-sm text-white/40">
                    <p>Demo credentials: {state === 'Admin' ? 'sky@example.com / 1234567' : 'instructor@skydive.com / instructor'}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
