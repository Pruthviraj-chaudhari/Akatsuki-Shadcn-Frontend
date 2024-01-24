import { useEffect, useState } from "react"; // Import React and useState
import ProfileCard from "./ProfileCard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DotLoader } from "react-spinners";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  role: string;
  github: string;
  leetcode: string;
  linkedin: string;
  resume: string;
  isMember: boolean;
}

const Cards = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  const getProfiles = async () => {
    setLoading(true);
    try {
      const url = import.meta.env.VITE_API_DATA;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.data)
      setProfiles(data.data);
    } catch (error) {
      toast.error("Error fetching profiles");
      console.error("Error fetching profiles:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfiles();
  }, []);

  return (
    <>
      <Card className="flex flex-col justify-center bg-black mt-4 mb-4 relative top-2">
        <CardHeader className="flex flex-col justify-center items-center">
          <CardTitle className="text-2xl text-white">
            Discover Akatsuki's
          </CardTitle>
        </CardHeader>
      </Card>
  
      <div className="flex flex-wrap justify-center gap-7 mt-4 my-3 p-6">
        {loading ? (
          <DotLoader color="#ffffff" />
        ) : (
          profiles.map((member, index) => (
            member.isMember === true ? (
              <ProfileCard key={index} data={member} />
            ) : null
          ))
        )}
      </div>
    </>
  );
  
  
};

export default Cards;
