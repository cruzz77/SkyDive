import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -20, x: '50%' }}
                    animate={{ opacity: 1, y: 0, x: '50%' }}
                    exit={{ opacity: 0, y: -20, x: '50%' }}
                    className={`fixed top-4 right-1/2 translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border ${getStyles()} min-w-[300px]`}
                >
                    {getIcon()}
                    <p className="font-medium flex-1">{message}</p>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 opacity-60 hover:opacity-100" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
