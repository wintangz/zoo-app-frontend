import Zone from './ZoneComponent';
import Information from './Information';
import News from './NewsComponent';
function Home() {
    return (
        <>
            {/* <DefaultLayout /> */}
            <Information />
            <News />
            <Zone />
        </>
    );
}

export default Home;
