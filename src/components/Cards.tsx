import React, { FormEvent } from "react";
import ProfileCard from "./ProfileCard";
import { DotLoader } from "react-spinners";
import { Card, CardTitle } from "@/components/ui/card";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";
// import Navbar from "./Navbar";

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

interface CardsProps {
  profiles: ProfileData[];
  loading: boolean;
  setProfiles: React.Dispatch<React.SetStateAction<ProfileData[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cards: React.FC<CardsProps> = ({
  profiles = [],
  setProfiles,
  loading,
  setLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm?.length > 0) {
        try {
          setLoading(true);
          const REALM_APP_ID = "application-0-rpjcj";
          const app = new Realm.App({ id: REALM_APP_ID });
          const credentials = Realm.Credentials.anonymous();
          const user = await app.logIn(credentials);

          const functionResponse = await user.functions.searchAkatsuki(
            searchTerm
          );

          setProfiles(functionResponse);
        } catch (error) {
          console.error("Error performing search:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // If searchTerm is empty, use the initial profiles received as props
        setProfiles(profiles);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchTermInput = e.currentTarget.querySelector(
      '[name="searchTerm"]'
    ) as HTMLInputElement;

    if (searchTermInput) {
      setSearchTerm(searchTermInput.value);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-evenly items-center w-full fixed top-0 bg-black bg-opacity-80 px-10 py-0 gap-8">
        <Card className="flex items-center bg-black bg-opacity-0 mb-4 relative top-2 border-none">
          <CardTitle className="flex justify-center items-center gap-2 lg:text-2xl sm:text-sm text-white tracking-wide">
            <img
              className="w-[50px]"
              src="https://i.ibb.co/mb0W3LS/pngegg.png"
              alt=""
            />
            AKATSUKI'S OF RCPIT
          </CardTitle>
        </Card>
        <form onSubmit={handleSubmit} className="flex justify-center w-36 lg:w-2/12">
          <div className="relative w-full text-gray-600 focus-within:text-gray-400 border-[1.5px] border-white rounded-full ">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <MagnifyingGlassIcon height="20" width="20" className="text-white" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              name="search"
              value={searchTerm}
              className="py-2 text-sm text-white bg-transparent rounded-md pl-10 focus:outline-none "
              autoComplete="off"
            />
          </div>
        </form>
      </div>

      <div className="flex flex-wrap justify-center gap-7 mt-20 my-3 p-6">
        {loading ? (
          <DotLoader color="#ffffff" />
        ) : profiles.length === 0 ? (
          <h1 className="text-slate-600 text-xl">No results found.</h1>
        ) : (
          profiles
            .slice()
            .reverse()
            .map((member, index) => <ProfileCard key={index} data={member} />)
        )}
      </div>
    </div>
  );
};

export default Cards;
