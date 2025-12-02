import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Calendar, Users, Package, UserCheck,
    Settings, LogOut, Wind, ChevronRight, Shield, GraduationCap
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useInstructor } from '../context/InstructorContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { aToken, logout: adminLogout } = useAdmin();
    const { iToken, logout: instructorLogout } = useInstructor();

    const isAdmin = !!aToken;
    const isInstructor = !!iToken;

    const adminLinks = [
        { name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard },
        { name: 'All Bookings', path: '/all-bookings', icon: Calendar },
        { name: 'Add Instructor', path: '/add-instructor', icon: UserCheck },
        { name: 'Instructors List', path: '/instructors-list', icon: Users },
        { name: 'Add Package', path: '/add-package', icon: Package },
    ];

    const instructorLinks = [
        { name: 'Dashboard', path: '/instructor-dashboard', icon: LayoutDashboard },
        { name: 'My Bookings', path: '/instructor-bookings', icon: Calendar },
        { name: 'My Profile', path: '/instructor-profile', icon: UserCheck },
    ];

    const links = isAdmin ? adminLinks : instructorLinks;

    const handleLogout = () => {
        if (isAdmin) {
            adminLogout();
        } else {
            instructorLogout();
        }
        navigate('/login');
    };

    return (
        <motion.aside
            className="fixed left-0 top-0 h-screen w-64 glass-dark p-6 flex flex-col z-40"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-10">
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <Wind className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                    <span className="text-xl font-bold text-white">
                        Sky<span className="gradient-text">Dive</span>
                    </span>
                    <div className={`text-xs ${isAdmin ? 'badge-admin' : 'badge-instructor'} mt-1`}>
                        {isAdmin ? (
                            <><Shield className="h-3 w-3 inline mr-1" />Admin</>
                        ) : (
                            <><GraduationCap className="h-3 w-3 inline mr-1" />Instructor</>
                        )}
                    </div>
                </div>
            </Link>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
                {links.map((link, index) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={link.path}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                            >
                                <link.icon className="h-5 w-5 flex-shrink-0" />
                                <span className="flex-1">{link.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="w-1.5 h-1.5 rounded-full bg-primary"
                                    />
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <motion.button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all mt-4"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
            >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </motion.button>
        </motion.aside>
    );
};

export default Sidebar;
