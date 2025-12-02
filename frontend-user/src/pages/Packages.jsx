import React from 'react';
import PackageCard from '../components/PackageCard';

const Packages = () => {
    const packages = [
        {
            id: 1,
            name: 'Tandem Jump',
            price: 299,
            altitude: '10,000ft',
            difficulty: 'Beginner',
            weather: 'Clear Sky',
            features: [
                'Instructor strapped to you',
                '30 seconds freefall',
                '5-minute parachute ride',
                'Certificate of completion',
                'HD Video included'
            ]
        },
        {
            id: 2,
            name: 'High Altitude',
            price: 499,
            altitude: '15,000ft',
            difficulty: 'Intermediate',
            weather: 'Low Wind',
            features: [
                '60 seconds freefall',
                'Oxygen supplement included',
                'Panoramic views',
                'Pro photo package',
                'T-shirt included'
            ]
        },
        {
            id: 3,
            name: 'Solo Certification',
            price: 1299,
            altitude: '13,000ft',
            difficulty: 'Advanced',
            weather: 'Variable',
            features: [
                'AFF Ground School',
                '7 levels of jumps',
                'Gear rental included',
                'Logbook & License',
                '1-on-1 coaching'
            ]
        }
    ];

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Choose Your Adventure</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        From first-time tandem jumps to professional certification courses, we have a package for every thrill seeker.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <PackageCard key={pkg.id} pkg={pkg} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Packages;
