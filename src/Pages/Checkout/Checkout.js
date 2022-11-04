import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
    const {_id, title, price } = useLoaderData();
    const {user} = useContext(AuthContext);
    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered';
        const message = form.message.value;


        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        if(phone.length < 10){
            alert('Phone number should be 10 character');
        }

        fetch(`http://localhost:5000/orders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged)
            {
                alert('Order Placed Successfully')
                form.reset();
            }
        })
        .catch(err => console.error(err));
    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl text-center m-4'>{title}</h2>
                <h2 className='text-xl text-center m-4'>Price: ${price}</h2>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 '>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-ghost w-full input-bordered input-accent" required/>
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered input-accent" required />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-ghost w-full input-bordered input-accent" required/>
                    <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-ghost w-full input-bordered input-accent" readOnly/>
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full textarea-accent mt-8 mb-4" placeholder="Your Message"></textarea>

                <button className="btn btn-secondary">Place Your Order</button>
            </form>
        </div>
    );
};

export default Checkout;