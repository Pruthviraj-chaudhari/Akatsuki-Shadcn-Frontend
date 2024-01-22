import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Form() {
  const initialData = {
    name: "",
    email: "",
    role: "",
    language: "",
    github: "",
    leetcode: "",
    resume: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [open, setOpen] = useState(false);


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpen(false);

    // Check if all required fields are filled
    const requiredFields = [
      "name",
      "email",
      "role",
      "language",
      "github",
      "leetcode",
      "resume",
    ];
    
    const isFormValid = requiredFields.every((field) => (formData as any)[field]);

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thanks for Submitting", {
          description: `${formData.name}`,
        });
        setFormData(initialData);
      } else {
        const statusCode = response.status;
      
        if (statusCode == 400) {
          toast.warning("Member already responded.");
        } else {
          toast.error("Failed to submit form. Please try again.");
        }
      }
      
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("An error occured while submitting the form");
    }
  };

  const changeHandler = (name: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeRoleHandler = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ["role"]: value,
    }));
  };

  const changeLanguageHandler = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      ["language"]: value,
    }));
  };

  // Back Navigation
  const navigate = useNavigate();
  function backHandler() {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center h-[100vh] bg-black flex-col">
      <Card className="max-w-md mx-auto w-[85vw]">
        <CardHeader>
          <CardTitle className="text-2xl">Hey Akatsuki's ❤️</CardTitle>
          <CardDescription>Tell us more about you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fname">Member Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => changeHandler("name", e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => changeHandler("email", e.target.value)}
                  placeholder="Johndoe@gmail.com"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Developer Role</Label>
                <Select
                  name="role"
                  value={formData.role}
                  onValueChange={changeRoleHandler}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Frontend Developer">
                      Frontend Developer
                    </SelectItem>
                    <SelectItem value="Backend Developer">
                      Backend Developer
                    </SelectItem>
                    <SelectItem value="FullStack Developer (MERN)">
                      FullStack Developer (MERN)
                    </SelectItem>
                    <SelectItem value="Android Developer">
                      Android Developer
                    </SelectItem>
                    <SelectItem value="Flutter/React Native Developer">
                      Flutter/React Native Developer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="language">Language for DSA</Label>
                <Select
                  name="role"
                  value={formData.language}
                  onValueChange={changeLanguageHandler}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="JavaScript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={(e) => changeHandler("github", e.target.value)}
                  placeholder="github.com/john-doe"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="leetcode">Leetcode Profile</Label>
                <Input
                  id="leetcode"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={(e) => changeHandler("leetcode", e.target.value)}
                  placeholder="leetcode.com/john-doe"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="resume">Resume Link</Label>
                <Input
                  id="resume"
                  name="resume"
                  value={formData.resume}
                  onChange={(e) => changeHandler("resume", e.target.value)}
                  placeholder="https://drive.google.com"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={backHandler}>
            Back
          </Button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button type="submit">Submit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg mx-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
              </AlertDialogHeader>

              <AlertDialogDescription>
                Are you sure you want to submit the form?
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={submitHandler}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Form;
