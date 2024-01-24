import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProfileData {
  name: string;
  role: string;
  github: string;
  leetcode: string;
  linkedin: string;
  resume: string;
}

const ProfileCard: React.FC<{ data: ProfileData }> = ({ data }) => {
  
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

  function getUsername(profileLink: string): string | null {
    try {
      const username = new URL(profileLink).pathname.split('/')[1];
      return username || null;
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    async function fetchProfilePhoto() {
      try {
        const githubUsername = getUsername(data.github);
        if (!githubUsername) {
          console.error('Invalid GitHub profile link');
          return;
        }

        const response = await fetch(`https://api.github.com/users/${githubUsername}`);
        if (response.status === 200) {
          const { avatar_url } = await response.json();
          setProfilePhoto(avatar_url);
        } else {
          toast.error("Something went wrong");
          console.error(`Error: Unable to fetch data. Status code: ${response.status}`);
        }
      } catch (error: any) {
        toast.error("Something went wrong");
        console.error(`Error: ${error.message}`);
      }
    }

    fetchProfilePhoto();
  }, [data.github]); // Include data.github as a dependency to trigger the effect when the GitHub link changes

  return (
    <Card className="flex flex-col justify-center items-center w-[280px] rounded-lg shadow-md">
      <CardHeader className="flex flex-col justify-center items-center">
        <img
          className="w-24 h-24 rounded-full mb-2"
          src={profilePhoto || 'default-placeholder-url'} // Provide a placeholder or default image URL
          alt={`Profile of ${data.name}`}
        />
        <CardTitle className="text-2xl">{data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="flex justify-center">
          <div className="text-gray-600">{data.role}</div>
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
              //   src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-bold-tal-revivo.png"
              alt="Leetcode"
            />
          </a>
          <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
            <img
              className="w-8 h-8 mx-2"
              //   src="https://img.icons8.com/fluency/96/linkedin.png"
              src="https://img.icons8.com/ios-filled/100/linkedin.png"
              alt="LinkedIn"
            />
          </a>
        </div>
      </CardContent>
      <CardFooter className="mt-4">
        <a href={data.resume} target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-solid border-slate-700"
          >
            Resume
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
