import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreateDrawing from "./pages/createDrawing";
import ExploreDrawings from "./pages/exploreDrawings";
import EditDrawing from "./pages/editDrawing";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw/create" element={<CreateDrawing />} />
        <Route path="/draw/edit/:drawingId" element={<EditDrawing />} />
        <Route path="/drawings/explore" element={<ExploreDrawings />} />
      </Routes>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 10000,
          success: {
            style: {
              background: "#ECFDF3",
            },
          },
          error: {
            style: {
              background: "#FEF3F2",
            },
          },
        }}
      />
    </Router>
  );
}

export default App;