import React from 'react';
import styles from './Animals.module.scss';
import { useState } from 'react';

import lion from '~/assets/animal/lion.png';
import serval from '~/assets/animal/serval.png';
import jaguar from '~/assets/animal/jaguar.png';
import giraffe from '~/assets/animal/giraffe.png';
import gelada from '~/assets/animal/gelada.png';

function Animals() {
    const slides = [
        {
            url: lion,
            title: lion,
        },
        {
            url: serval,
            title: serval,
        },
        {
            url: jaguar,
            title: jaguar,
        },
        {
            url: giraffe,
            title: giraffe,
        },
        {
            url: gelada,
            title: gelada,
        },
    ];

    const [currentIndex, setCurrenIndex] = useState(0);

    const slider_style = {
        width: '100%',
        height: '100%',
        position: 'relative',
    };
    const slide_style = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        // transition: 'transform 0.5s ease, backdrop-filter 0.5s ease',
        // backdropFilter: 'blur(0)',
    };
    const left_arrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50)',
        left: '32px',
        fontSize: '45px',
        color: 'red',
        zIndex: 1,
        cursor: 'pointer',
    };
    const right_arrow = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50)',
        right: '32px',
        fontSize: '45px',
        color: 'red',
        zIndex: 1,
        cursor: 'pointer',
    };

    const dotsContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
    };

    const imgBelow = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '20px',
    };

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrenIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrenIndex(newIndex);
    };
    const goToSlide = (slideIndex) => {
        setCurrenIndex(slideIndex);
    };

    return (
        <>
            <div className={styles.container_styles}>
                <div style={slider_style}>
                    <div style={left_arrow} onClick={goToPrevious}>
                        pre
                    </div>
                    <div style={right_arrow} onClick={goToNext}>
                        next
                    </div>
                    <div style={{ ...slide_style, backgroundImage: `url(${slides[currentIndex].url})` }}></div>
                    <div style={dotsContainerStyles}>
                        {slides.map((slide, slideIndex) => (
                            <div key={slideIndex} style={imgBelow} onClick={() => goToSlide(slideIndex)}>
                                o
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Animals;
