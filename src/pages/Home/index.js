import Zone from './ZoneComponent';
import Information from './Information';
import News from './NewsComponent';
import Animals from './Animals';
import NewWiddle from './NewWiddle';
function Home() {
    return (
        <>
            {/* <DefaultLayout /> */}
            <Information />
            <News />
            <Zone />
            <Animals />
        </>
    );
}

export default Home;
