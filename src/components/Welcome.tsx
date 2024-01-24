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
    <Card className="max-w-sm mx-auto p-2 rounded-lg shadow-md m-3">
      <CardHeader>
        <CardTitle className="text-2xl">
          <div className="w-full">
            <img
              className="w-[100px]"
              src="https://i.ibb.co/mb0W3LS/pngegg.png"
              alt=""
            />
          </div>
          Akatsuki Coding Club
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Welcome to Akatsuki Connect !
          <br />
          <br />
          We're eager to learn more about your coding skills and contributions.
          <br />
          <br />
          Let's get to know you better ❤️
          <br />
          <br />
          Hit "Continue"!
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-4 gap-4 flex justify-start items-center">
        <Button onClick={handleDiscover}>
          Discover Akatsuki
        </Button>

        <Button className="border-slate-700 border-2"
          variant="outline"
          onClick={handleAddMe}
        >
          Add Me
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Welcome;
