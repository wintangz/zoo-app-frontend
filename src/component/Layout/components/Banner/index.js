import banner from '~/assets/img/banner.jpg';
import cssStyles from './Banner.css';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import { Fade } from 'react-slideshow-image';
import { Carousel } from 'react-bootstrap';
import Video1 from '~/assets/video/elephant_-_81782 (720p).mp4';
import Video2 from '~/assets/video/panda_-_81457 (720p).mp4';
import Video3 from '~/assets/video/rhino_-_85697 (720p).mp4';
import Video4 from '~/assets/video/tiger_-_70854 (720p).mp4';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
function Banner() {
    const cx = classNames.bind(styles);
    // const images = [
    //     'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    //     'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    //     'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    // ];
    // const buttonStyle = {
    //     width: '30px',
    //     background: 'none',
    //     border: '0px',
    // };

    // const properties = {
    //     prevArrow: (
    //         <button style={{ ...buttonStyle }}>
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
    //                 <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
    //             </svg>
    //         </button>
    //     ),
    //     nextArrow: (
    //         <button style={{ ...buttonStyle }}>
    //             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
    //                 <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
    //             </svg>
    //         </button>
    //     ),
    // };

    // Video player
    const VideoProperties = [
        {
            id: 1,
            title: 'Video 1',
            src: 'https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/video/tiger-video.mp4',
            credit: 'Video about tiger',
        },
        {
            id: 2,
            title: 'Video 2',
            src: 'https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/video/crocodile-video.mp4',
            credit: 'Video about crocodile',
        },
        {
            id: 3,
            title: 'Video 3',
            src: 'https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/video/giraffe-video.mp4',
            credit: 'Video about giraffe',
        },
        {
            id: 4,
            title: 'Video 4',
            src: 'https://wintang-zoo.s3.ap-southeast-1.amazonaws.com/video/elephant-video.mp4',
            credit: 'Video about elephant',
        },
    ];

    return (
        // <div className="container-banner">
        //     <Fade onChange={function noRefCheck() {}} onStartChange={function noRefCheck() {}}>
        //         <div className="each-slide">
        //             <div className="position-relative">
        //                 <div>
        //                     <img src={images[0]} />
        //                 </div>
        //                 <div className="slide-text center">
        //                     <p>The Greatest Zoo </p>
        //                     <p>In The World</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="each-slide">
        //             <div className="position-relative">
        //                 <div className="slide-text left">
        //                     <p>The Greatest Zoo </p>
        //                     <p>In The World</p>
        //                 </div>
        //                 <div>
        //                     <img src={images[1]} />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="each-slide">
        //             <div className="position-relative">
        //                 <div>
        //                     <img src={images[2]} />
        //                 </div>
        //                 <div className="slide-text right">
        //                     <p>The Greatest Zoo </p>
        //                     <p>In The World</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </Fade>
        // </div>
        <div className={'banner--container ' + ' ' + cx('container-content')}>
            <Carousel>
                {VideoProperties.map((videoObj) => {
                    return (
                        <Carousel.Item key={videoObj.id}>
                            <ReactPlayer
                                url={videoObj.src}
                                width="100vw"
                                pip={true}
                                playing={true}
                                height="100vh"
                                autoplay={'autoplay'}
                                preload="auto"
                                loop={true}
                                muted={true}
                            />
                        </Carousel.Item>
                    );
                })}
            </Carousel>
            <div className={cx('content--text')}>
                <div className={cx('text--title')}>
                    <p className={cx('title')}>Welcome To SaiGonZoo Safari</p>
                </div>
                <div className={cx('content')}>
                    <p>Conversation is The</p>
                    <p>
                        Life of <span>WildLife</span>
                    </p>
                </div>
            </div>
            <div className={cx('content--button')}>
                <Link to="./news">Explore Safari</Link>
            </div>
        </div>
    );
}

export default Banner;
