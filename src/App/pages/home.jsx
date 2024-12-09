

function Home() {

  return (
    <>
      <h1>Home</h1>
      <div className="fixed bottom-3 right-3 shadow-md rounded-lg bg-iflab_white_light p-5">
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/inventory/1">Inventory</a>
          </li>
          <li>
            <a href="/accessManager/1">AccessManager</a>
          </li>
          <li>
            <a href="/random">redirect</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Home;
