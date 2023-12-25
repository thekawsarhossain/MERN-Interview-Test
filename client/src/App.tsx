import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreateDrawing from "./pages/createDrawing";
import ExploreDrawings from "./pages/exploreDrawings";
import EditDrawing from "./pages/editDrawing";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw/create" element={<CreateDrawing />} />
        <Route path="/draw/edit" element={<EditDrawing />} />
        <Route path="/drawings/explore" element={<ExploreDrawings />} />
      </Routes>
    </Router>
  );
}

export default App;