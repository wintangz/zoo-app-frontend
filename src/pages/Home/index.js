import homepage from '~/assets/img/homepage.jpg';

function Home() {
    return (
        <>
            {/* <DefaultLayout /> */}
            <div class="container">
                <div class="homepage col-md-6">
                    <img src={homepage} alt="homepage" className={'homepage'} />
                </div>
                <div class="col-md-6">
                    <h2 color="red">Welcome To Wilddale</h2>
                </div>
            </div>
        </>
    );
}

export default Home;
