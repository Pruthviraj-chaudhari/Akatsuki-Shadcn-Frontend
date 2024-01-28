import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FiGithub } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { SiGeeksforgeeks } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { LiaHackerrank } from "react-icons/lia";
import { IoLinkSharp } from "react-icons/io5";
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
import { Textarea } from "./ui/textarea";

interface FormData {
  fname: string;
  lname: string;
  email: string;
  about: string;
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

function Form() {
  const names = [
    "Node.js",
    "React.js",
    "Next.js",
    "Express.js",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Spring Boot",
    "Django",
    "Vue.js",
    "Angular",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Sass",
    "Ruby",
    "Rails",
    "Go",
    "PHP",
    "Swift",
    "Kotlin",
    "C#",
    "ASP.NET",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Firebase",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "REST API",
    "Redux",
    "Android",
    "iOS",
    "Flutter",
    "React Native",
    "Xamarin",
    "Swift (iOS)",
    "Objective-C (iOS)",
    "Dart",
    "UI/UX Design",
    "Adobe XD",
    "Figma",
    "Sketch",
    "Data Science",
    "TensorFlow",
    "PyTorch",
  ];

  const roles = [
    "Android Developer",
    "Backend Developer",
    "Blockchain Developer",
    "Cloud Developer",
    "Cloud Engineer",
    "Data Scientist",
    "Database Developer",
    "DevOps Engineer",
    "Flutter/React Native Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Full Stack Developer (MERN)",
    "Full Stack Web Developer",
    "Machine Learning Engineer",
    "Mobile App Developer",
    "UI/UX Designer"
  ];

  interface Option {
    label: string;
    value: string;
  }
  const options: Option[] = names.map((name) => ({
    label: name,
    value: name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-"),
  }));

  const [selected, setSelected] = useState<Option[]>([]);

  const initialData: FormData = {
    fname: "",
    lname: "",
    email: "",
    about: "",
    role: "",
    github: "",
    linkedin: "",
    instagram: "",
    resume: "",
    leetcode: "",
    hackerrank: "",
    codechef: "",
    gfg: "",
    skills: [],
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [open, setOpen] = useState(false);

  const submitHandler = async () => {
    setOpen(false);

    // Check if all required fields are filled
    const requiredFields: (keyof FormData)[] = [
      "fname",
      "lname",
      "email",
      "about",
      "role",
      "github",
      "leetcode",
      "linkedin",
      "resume",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field as keyof FormData]
    );

    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const skills = selected.map((item) => item.label);

    const requestBody = {
      ...formData,
      skills: skills,
    };

    console.log(requestBody);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      toast.promise(
        async () => {
          const requestBody = {
            ...formData,
            skills: skills,
          };

          const result = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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

  // Back Navigation
  const navigate = useNavigate();
  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-black flex-col mt-3">
      <Card className="max-w-[80vw] mx-auto w-[100vw]">
        <CardHeader>
          <CardTitle className="text-2xl">Hey Akatsuki's ❤️</CardTitle>
          <CardDescription>Tell us more about you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col sm:flex-row w-full gap-4 gap-x-10 mb-5">
              <div className="flex flex-col w-full sm:w-1/2 gap-y-4">
                <div className="flex items-center justify-start gap-4">
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="fname">
                      First Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="fname"
                      value={formData.fname}
                      onChange={(e) => changeHandler("fname", e.target.value)}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5 w-1/2">
                    <Label htmlFor="fname">
                      Last Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="lname"
                      value={formData.lname}
                      onChange={(e) => changeHandler("lname", e.target.value)}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">
                    Email <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => changeHandler("email", e.target.value)}
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label >Skills</Label>
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                    isCreatable={true}
                    className="w-full rounded-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-1/2 gap-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">
                    Developer Role <span className="text-red-600">*</span>
                  </Label>
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
                      {
                        roles.map((role) => (
                        <SelectItem value={role}>
                          {role}
                        </SelectItem>))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="about">
                    About <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={(e) => changeHandler("about", e.target.value)}
                    placeholder="I'm a full stack developer..."
                    rows={5}
                    required
                  />
                </div>
              </div>
            </div>

            <Label className="text-lg">Social Profiles & Resume</Label>
            <Separator className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 mb-5">
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <FiGithub className="" />
                  <Label htmlFor="github">
                    GitHub <span className="text-red-600">*</span>
                  </Label>
                </div>
                <Input
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={(e) => changeHandler("github", e.target.value)}
                  placeholder="Your GitHub url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <FaLinkedin />
                  <Label htmlFor="github">
                    LinkedIn <span className="text-red-600">*</span>
                  </Label>
                </div>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => changeHandler("linkedin", e.target.value)}
                  placeholder="Your LinkedIn url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <FaInstagram />
                  <Label htmlFor="github">Instagram</Label>
                </div>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={(e) => changeHandler("instagram", e.target.value)}
                  placeholder="Your Instagram url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <IoLinkSharp />
                  <Label htmlFor="resume">
                    Resume Link <span className="text-red-600">*</span>
                  </Label>
                </div>
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

            <Label className="text-lg">Coding Profiles</Label>
            <Separator className="grid grid-cols-1 md:grid-cols-2 mb-5 mt-1" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-10 mb-5">
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <SiLeetcode />
                  <Label htmlFor="leetcode">
                    Leetcode <span className="text-red-600">*</span>
                  </Label>
                </div>
                <Input
                  id="leetcode"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={(e) => changeHandler("leetcode", e.target.value)}
                  placeholder="Your Leetcode url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <LiaHackerrank />
                  <Label htmlFor="hackerrank">HackerRank</Label>
                </div>
                <Input
                  id="hackerrank"
                  name="hackerrank"
                  value={formData.hackerrank}
                  onChange={(e) => changeHandler("hackerrank", e.target.value)}
                  // placeholder="https://www.hackerrank.com/profile/"
                  placeholder="Your HackerRank url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <SiCodechef />
                  <Label htmlFor="codechef">CodeChef</Label>
                </div>
                <Input
                  id="codechef"
                  name="codechef"
                  value={formData.codechef}
                  onChange={(e) => changeHandler("codechef", e.target.value)}
                  placeholder="Your CodeChef url"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex gap-2">
                  <SiGeeksforgeeks />
                  <Label htmlFor="gfg">GFG</Label>
                </div>
                <Input
                  id="gfg"
                  name="gfg"
                  value={formData.gfg}
                  onChange={(e) => changeHandler("gfg", e.target.value)}
                  placeholder="Your GFG url"
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
