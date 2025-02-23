import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyDetail from "./pages/CompanyDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companyDetail/:id" element={<CompanyDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
