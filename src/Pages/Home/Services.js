import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services , setServices] = useState([]);

    useEffect(() =>{
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    }, []);
    return (
        <div>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600 mb-4'>Services</p>
                <h2 className='text-5xl font-bold mb-4'>Our Service Area</h2>
                <p className='mb-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet officia expedita dicta accusamus animi cum minus asperiores? Fugit, accusantium est.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard
                    key={service._id}
                    service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;