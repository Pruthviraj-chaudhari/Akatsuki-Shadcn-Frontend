import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';


const Welcome = () => {

    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/form');
  };

  return (
    <Card className="max-w-md mx-auto p-6 rounded-lg shadow-md m-3">
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
          Welcome Akatsuki Members!
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
      <CardFooter className="mt-4">
        <Button onClick={handleContinue} size="lg">
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Welcome;
