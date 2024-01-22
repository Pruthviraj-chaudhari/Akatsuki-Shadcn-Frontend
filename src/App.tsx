import Form from "./components/Form";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
