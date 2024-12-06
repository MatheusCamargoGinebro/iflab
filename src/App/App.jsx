import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen bg-iflab_white_dark">
      <Outlet />
    </div>
  );
}

export default App;
