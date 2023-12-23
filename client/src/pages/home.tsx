import Button from "../Components/Common/Button";

const Home = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/red-circle.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: window.innerWidth > 768 ? "35%" : "50%",
                backgroundPosition: "center",
                backgroundPositionX: "45%"
            }}>

            <div className="flex flex-col space-y-8 mt-10">
                <h2 className="text-6xl font-bold font-fira-sans leading-10">Unleash Your Creativity</h2>
                <p className="text-xl font-fira-sans leading-7">Embrace your imagination with our digital whiteboard. Draw, <br /> share, and explore in a community of creativity.</p>
                <div className="flex items-center justify-start space-x-4">
                    <Button href="/draw/create">Start Drawing</Button>
                    <Button kind="secondary" href="/drawings/explore">Explore Drawings</Button>
                </div>
            </div>
        </div>
    );
};

export default Home;