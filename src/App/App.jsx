import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Sign from "./pages/sign";
import Home from "./pages/home";
import Inventory from "./pages/inventory";
import AccessManager from "./pages/accessmanager";
import NotFound from "./pages/notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/accessmanager" element={<AccessManager />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
