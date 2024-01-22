import * as React from "react";
import Form from "./components/Form";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";


function App() {

 
  return (
    <div className="flex justify-center items-center h-[100vh] bg-black">
      <Routes>
        <Route path="/" element={<Welcome />}/>
        <Route path="/form" element={<Form />}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
