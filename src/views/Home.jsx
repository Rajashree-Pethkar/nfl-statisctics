function Home(props) {
  const { title } = props;

  return (
    <main>
      <h1 className="justify-content-left mx-3 my-3">{title}</h1>
      <div className="container">
        <img
          src="/images/bettingScreen.jpg"
          alt="south point casino board"
          className="home-image mt-5"
        ></img>
      </div>
    </main>
  );
}

export default Home;
