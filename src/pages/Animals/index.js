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
            url: 'https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/jaguar_hero_0.png?itok=GS2zQ4x2',
        },
        {
            url: 'https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/lion_hero.png?itok=9OGH8Gge',
        },
        {
            url: 'https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/gelada_hero.png?itok=afyxDKsI',
        },
        {
            url: 'https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/giraffe_hero.png?itok=d7jGa7yT',
        },
        {
            url: 'https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/gelada_hero.png?itok=afyxDKsI',
        },
    ];
    const [currentIndex, setCurrenIndex] = useState(0);

    const slider = {
        height: '100%',
        position: 'relative',
    };
    const slide = {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };
    const left_arrow = {
        position: 'absolute',
        top: '100px',
        transform: 'translate(0, -50)',
        left: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
    };
    const right_arrow = {
        position: 'absolute',
        top: '100px',
        transform: 'translate(0, -50)',
        right: '32px',
        fontSize: '45px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
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

    return (
        <>
            <div className={styles.container}>
                <div class={styles.slide}>
                    <div class={styles.list}>
                        <div class={styles.item}>
                            <img
                                src="https://zoo.sandiegozoo.org/sites/default/files/styles/hero_with_nav_gradient/public/hero/gelada_hero.png?itok=afyxDKsI"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div class={styles.buttons}>
                    <button id="prev">a</button>
                    <button id="next">b</button>
                </div>
                <div class={styles.card}></div>
            </div>

            <div className={styles.container_styles}>
                <div style={slider}>
                    <div style={left_arrow} onClick={goToPrevious}>
                        a
                    </div>
                    <div style={right_arrow} onClick={goToNext}>
                        b
                    </div>
                    <div style={{ ...slide, backgroundImage: `url(${slides[currentIndex].url})` }}></div>
                </div>
            </div>
        </>
    );
}

export default Animals;
