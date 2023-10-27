import classNames from 'classnames/bind';
import styles from './Zone.module.scss';
import { getHabitats } from '~/api/animalsService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Zone() {
    const [habitats, setHabitats] = useState(null);

    const fetchApi = async () => {

        const resultHabitat = await getHabitats();
        setHabitats(resultHabitat);
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className={cx('zone')}>
            {habitats ? (
                habitats.map((habitat) => {
                    return (
                        <Link to={`/habitats/${habitat.name}`}>
                            <div className={cx('zone--container')} key={habitat.id}>
                                <div className={cx('overlay')}></div>
                                <div
                                    className={cx('zone--background')}
                                    style={{
                                        background: 'url(' + habitat.imgUrl + ')',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: "center bottom -200px",
                                    }}
                                ></div>
                                <div className={cx('zone--title')}>{habitat.name}</div>
                                <div className={cx('zone--title-hover')}></div>
                                <div
                                    className={cx('zone--hover')}
                                    style={{
                                        // background: 'url(' + habitat.hoverImage + ') no-repeat',
                                        backgroundSize: 'cover',
                                        right: '7%',
                                        width: '50%',
                                        height: '100%',
                                        position: 'absolute',
                                        opacity: 0,
                                    }}
                                ></div>
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div>Loading habitats...</div>
            )}
        </div>
    );
}

export default Zone;





