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

interface FormData {
  name: string;
  email: string;
  role: string;
  language: string;
  github: string;
  leetcode: string;
  resume: string;
}

function Form() {
  const initialData: FormData = {
    name: "",
    email: "",
    role: "",
    language: "",
    github: "",
    leetcode: "",
    resume: "",
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [open, setOpen] = useState(false);

  const submitHandler = async () => {
    setOpen(false);

    // Check if all required fields are filled
    const requiredFields: (keyof FormData)[] = [
      "name",
      "email",
      "role",
      "language",
      "github",
      "leetcode",
      "resume",
    ];

    const isFormValid = requiredFields.every(
      (field) => formData[field as keyof FormData]
    );

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      toast.promise(
        async () => {
          const result = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (!result.ok) {
            throw result;
          }

          return result.json();
        },
        {
          loading: "Submitting...",
          success: () => {
            return "Thanks for Submitting";
            setFormData(initialData);
          },
          error: (error) => {
            const statusCode = error.status;
            return statusCode === 400
              ? "Member already responded."
              : "Failed to submit form. Please try again.";
          },
        }
      );
      
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const changeHandler = (name: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeRoleHandler = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const changeLanguageHandler = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      language: value,
    }));
  };

  // Back Navigation
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-black flex-col mt-3">
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
                    <SelectItem value="UI/UX Designer">
                      UI/UX Designer
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
                <Label htmlFor="leetcode">Leetcode / GFG Profile</Label>
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
