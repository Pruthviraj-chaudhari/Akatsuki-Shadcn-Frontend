import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProfileData {
  _id: string;
  name: string;
  email: string;
  role: string;
  github: string;
  leetcode: string;
  linkedin: string;
  resume: string;
  about: string;
  image: string;
}

const ProfileCard: React.FC<{ data: ProfileData }> = ({ data }) => {
  
  return (
    <Card className="flex flex-col justify-center items-center w-[280px] rounded-lg shadow-md">
      <CardHeader className="flex flex-col justify-center items-center">
        <img
          className="w-24 h-24 rounded-full mb-2"
          src={data.image || `https://ui-avatars.com/api/?name=${data.name}`} 
          alt={`Profile of ${data.name}`}
        />
        <CardTitle className="text-2xl">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex justify-center text-gray-600">
          {data.role}
        </CardDescription>

        <div className="flex justify-center mt-4">
          <a href={data.github} target="_blank" rel="noopener noreferrer">
            <img
              className="w-8 h-8 mx-2"
              src="https://img.icons8.com/fluency-systems-filled/96/github.png"
              alt="GitHub"
            />
          </a>
          <a href={data.leetcode} target="_blank" rel="noopener noreferrer">
            <img
              className="w-8 h-8 mx-2"
              src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png"
              alt="Leetcode"
            />
          </a>
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
            <img
              className="w-8 h-8 mx-2"
              src="https://img.icons8.com/ios-filled/100/linkedin.png"
              alt="LinkedIn"
            />
          </a>
        </div>
        
      </CardContent>
      <CardFooter className="mt-4">
        
      <Link to={`/fullprofile/${data._id}`}>
          <Button variant="outline" size="lg" className="border-2 border-solid border-slate-700">
            View More...
          </Button>
      </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
