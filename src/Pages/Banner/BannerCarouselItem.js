import React from 'react';
import './Banner.css'
const BannerCarouselItem = ({slide}) => {
    console.log(slide);
    const {image, id, prev, next} = slide;
    return (
            <div id={`slide${id}`}   className="carousel-item relative w-full">
                    <div className='carousel-img'>
                        <img src={image} alt='' className='w-full rounded-xl' />
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
                        <h1 className='text-6xl font-bold text-white'>
                            Affordable <br />Price for Car <br />
                            Servicing

                        </h1>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-24 w-2/5 top-1/2">
                        <p className='text-white text-xl'>
                            There are many variations of passages of available, But the majority is suffered Alternation in some form.
                        </p>
                    </div>
                    <div className="absolute flex justify-start transform -translate-y-1/2 left-24 w-2/5 top-3/4">
                        <button className="btn btn-active btn-primary mr-5 ">Button</button>
                        <button className="btn btn-active btn-secondary">Button</button>
                    </div>
                    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                        <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                        <a href={`#slide${next}`} className="btn btn-circle">❯</a>
                    </div>
                </div>
    );
};

export default BannerCarouselItem;