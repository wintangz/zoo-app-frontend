import Zone from './ZoneComponent';
import Information from './Information';
import News from './NewsComponent';
import Animals from './Animals';
import NewWiddle from './NewWiddle';
import styles from './Home.module.scss'
function Home() {
    return (
        <div className={styles.Home}>
            {/* <DefaultLayout /> */}
            <Information />
            <News />
            <Zone />
            <Animals />
        </div>
    );
}

export default Home;
