import Form from "./components/Form";
import Welcome from "./components/Welcome";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Cards from "./components/Cards";
import { toast } from "sonner";
import FullProfile from "./components/FullProfile";
import { useEffect, useState } from "react"; // Import React and useState


interface ProfileData {
  _id: string;
  name: string;
  email: string;
  about: string;
  image: string;
  role: string;
  github: string;
  linkedin: string;
  instagram: string;
  resume: string;
  leetcode: string;
  hackerrank: string;
  codechef: string;
  gfg: string;
  skills: string[];
}

function App() {

  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getProfiles = async () => {
      setLoading(true);
      try {
        const url = import.meta.env.VITE_API_DATA;
        const response = await fetch(url);
        const data = await response.json();
        setProfiles(data.data);
      } catch (error) {
        toast.error("Error fetching profiles");
        console.error("Error fetching profiles:", error);
      }
      setLoading(false);
    };

    getProfiles();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow flex flex-wrap justify-center items-center pt-6 px-1">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/profiles/*" element={<Cards profiles={profiles} setProfiles={setProfiles} loading={loading} setLoading={setLoading}/>} />
          <Route path="/form" element={<Form />} />

          {profiles.map((member) => (
            <Route
              key={member._id}
              path={`/fullprofile/${member._id}`}
              element={<FullProfile data={member} />}
            />
          ))}

        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
