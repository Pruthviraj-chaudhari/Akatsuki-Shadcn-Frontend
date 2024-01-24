import Form from "./components/Form";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Cards from "./components/Cards";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black max-w-[100vw]">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/profiles" element={<Cards />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
