import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css';
import React from 'react';

export default function ImageSlider({ images }) {
    const settings = {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        lazyLoad: 'progressive',
        autoplaySpeed: 2000,
        adaptiveHeight: true,
        useTransform: true,
    };
    return (
        <>
            <div className="tag"></div>
            <div className="imgslider">
                <Slider {...settings}>
                    {images.map((item) => (
                        <>
                            <div key={item.id}>
                                <img src={item.src} alt={item.alt} />
                            </div>
                            <div className="animals-name">
                                <p>{item.name}</p>
                            </div>
                        </>
                    ))}
                </Slider>
            </div>
        </>
    );
}
