import React from 'react';
import InstructorCard from '../components/InstructorCard';

const Instructors = () => {
    const instructors = [
        {
            id: 1,
            name: 'Alex "Eagle" Mercer',
            specialty: 'High Altitude Specialist',
            rating: 4.9,
            reviews: 128,
            rate: 150,
            experience: 8,
            languages: ['English', 'Spanish'],
            image: 'https://images.unsplash.com/photo-1529335764857-3f1164d1e247?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 2,
            name: 'Sarah Chen',
            specialty: 'AFF Instructor',
            rating: 5.0,
            reviews: 95,
            rate: 180,
            experience: 6,
            languages: ['English', 'Mandarin'],
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            specialty: 'Tandem Master',
            rating: 4.8,
            reviews: 210,
            rate: 120,
            experience: 12,
            languages: ['English', 'German'],
            image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 4,
            name: 'Elena Rodriguez',
            specialty: 'Formation Skydiving',
            rating: 4.9,
            reviews: 84,
            rate: 160,
            experience: 7,
            languages: ['English', 'Spanish', 'Portuguese'],
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Meet Our Legends</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Learn from the best. Our certified instructors have thousands of jumps and years of experience to ensure your safety and fun.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {instructors.map(instructor => (
                        <InstructorCard key={instructor.id} instructor={instructor} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Instructors;
