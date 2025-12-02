import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { api } from '../services/api';

const Profile = () => {
    const { user, token, setUser, loadUserProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address?.line1 || '', // Assuming address might be an object
        bio: user?.bio || '',
        dob: user?.dob || '',
        gender: user?.gender || 'Not Selected'
    });
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('address', JSON.stringify({ line1: formData.address }));
            formDataToSend.append('gender', formData.gender);
            formDataToSend.append('dob', formData.dob);

            if (image) {
                formDataToSend.append('image', image);
            }

            // We need to use fetch directly or update api service to handle FormData
            // Since api.post uses JSON.stringify, it won't work for FormData
            // Let's use fetch here for now
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                headers: {
                    'token': token
                },
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                alert('Profile updated successfully!');
                await loadUserProfile(); // Refresh user data from backend
            } else {
                alert(data.message || 'Failed to update profile');
            }

        } catch (error) {
            console.error('Profile update error:', error);
            alert('An error occurred while updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-dark mb-8">My Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="card text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={image ? URL.createObjectURL(image) : (user?.image || "https://via.placeholder.com/150")}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label htmlFor="image" className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-md">
                                    <Camera className="h-4 w-4" />
                                    <input
                                        type="file"
                                        id="image"
                                        hidden
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </label>
                            </div>
                            <h2 className="text-xl font-bold text-dark">{formData.name}</h2>
                            <p className="text-gray-500 text-sm mb-4">{formData.email}</p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-2">
                        <div className="card">
                            <h3 className="text-lg font-bold text-dark mb-6 border-b border-gray-100 pb-4">Personal Information</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                disabled
                                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-100 border focus:ring-primary focus:border-primary sm:text-sm p-2.5 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                        >
                                            <option value="Not Selected">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows="4"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        className="block w-full rounded-lg border-gray-300 bg-gray-50 border focus:ring-primary focus:border-primary sm:text-sm p-2.5"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? 'Saving...' : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
