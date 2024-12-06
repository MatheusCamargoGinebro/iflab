import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function AccessManager() {
  const { id } = useParams();
  return (
    <>
      AccessManager
      <Link to="/AccessManager/1">AccessManager 1</Link>
      <Link to="/AccessManager/2">AccessManager 2</Link>
      <Link to="/AccessManager/3">AccessManager 3</Link>

      <h1>ID: {id}</h1>
      <div className="fixed bottom-3 right-3 shadow-md rounded-lg bg-iflab_white_light p-5">
        <ul>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/Home">Home</a>
          </li>
          <li>
            <a href="/Inventory">Inventory</a>
          </li>
          <li>
            <a href="/AccessManager">AccessManager</a>
          </li>
          <li>
            <a href="/NotFoundadasdasd">NotFound</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AccessManager;
