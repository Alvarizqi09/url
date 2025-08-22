import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "../hooks/use-fetch";
import { signup, loginWithGoogle } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";

const SignUp = () => {
  const [errors, setErrors] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, error, fn: fnSignUp } = useFetch(signup);
  const {
    data: googleData,
    loading: googleLoading,
    error: googleError,
    fn: fnGoogleSignUp,
  } = useFetch(loginWithGoogle);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if ((error === null && data) || (googleError === null && googleData)) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error, googleData, googleError]);

  const handleSignUp = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "password must be at least 6 characters")
          .required("password is required"),
        profile_pic: Yup.mixed().required("Profile picture is required"),
      });
      await schema.validate(formdata, { abortEarly: false });

      await fnSignUp(formdata);
    } catch (e) {
      const newErrors = {};
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await fnGoogleSignUp();
    } catch (e) {
      console.error("Google signup error:", e);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Silakan daftar akun baru</CardDescription>
        {(error || googleError) && (
          <Error message={(error || googleError).message} />
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button onClick={handleSignUp} className="w-full">
          {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Sign Up"}
        </Button>

        <div className="flex items-center w-full">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">atau</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2"
        >
          {googleLoading ? (
            <BeatLoader size={10} color="#36d7b7" />
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Daftar dengan Google</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
