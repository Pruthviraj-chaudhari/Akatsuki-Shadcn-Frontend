import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const handleAddMe = () => {
    navigate("/form");
  };

  const handleDiscover = () => {
    navigate("/profiles");
  };

  return (
    <Card className="flex flex-col lg:flex-row  max-w-[90vw] md:w-[80vw] justify-center mx-auto p-2 rounded-lg shadow-md m-3">
      <div className="ml-5 lg:ml-10">
        <CardHeader className="pl-0">
          <CardTitle className="text-2xl">
            <div className="flex gap-2 w-full">
              <img
                className="w-[100px]"
                src="https://i.ibb.co/mb0W3LS/pngegg.png"
                alt=""
              />
              <img
                className="w-[100px] h-[90px]"
                src="https://www.rcpit.ac.in/uploads/1599837268.png"
                alt=""
              />
            </div>
            Akatsuki Coding Club
          </CardTitle>
        </CardHeader>
        <CardContent className="p-1">
          <CardDescription className="lg:text-lg">
            Welcome to{" "}
            <span className="text-slate-900 font-medium">
              Akatsuki Connect !
            </span>
            <br />
            <br />
            We're eager to learn more about your coding skills and
            contributions.
            <br />
            <br />
            Let's get to know you better ❤️
            <br />
            <br />
            Hit "Add Me"!
          </CardDescription>
        </CardContent>
        <CardFooter className="p-1 mt-4 gap-4 flex justify-start items-center">
          <Button onClick={handleDiscover}>Discover Akatsuki</Button>

          <Button
            className="border-slate-700 border-2"
            variant="outline"
            onClick={handleAddMe}
          >
            Add Me
          </Button>
        </CardFooter>
      </div>

      <div className="flex justify-center lg:w-[80%]">
        <img
          src="/students.jpg"
          alt="Students"
        />
      </div>
    </Card>
  );
};

export default Welcome;
