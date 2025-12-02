// src/components/create-link.jsx
import React, { useRef, useState } from "react";
import { UrlState } from "../context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import * as Yup from "yup";
import QRCode from "react-qrcode-logo";
import { BeatLoader } from "react-spinners";
import { useCreateUrl } from "../hooks/useUrls";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink || "",
    customUrl: "",
  });

  const createUrlMutation = useCreateUrl();

  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    longUrl: Yup.string().url("Invalid URL").required("Long URL is required"),
    customUrl: Yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const createNewLink = async () => {
    setErrors({});
    try {
      await schema.validate(formValues, { abortEarly: false });

      if (!ref.current?.canvasRef?.current) {
        setErrors({ submit: "QR code not ready, please try again" });
        return;
      }

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          console.log("Blob generated:", blob);
          resolve(blob);
        }, "image/png");
      });

      console.log("Starting create URL with:", {
        title: formValues.title,
        longUrl: formValues.longUrl,
        customUrl: formValues.customUrl,
        user_id: user?.id,
      });

      const result = await createUrlMutation.mutateAsync({
        urlData: {
          title: formValues.title,
          longUrl: formValues.longUrl,
          customUrl: formValues.customUrl,
          user_id: user?.id,
        },
        blob,
      });

      console.log("Create URL result:", result);

      if (result?.[0]?.id) {
        // Clear the form and close dialog
        setFormValues({
          title: "",
          longUrl: "",
          customUrl: "",
        });
        setSearchParams({});
        // Navigate after a short delay to allow dialog to close
        setTimeout(() => {
          navigate(`/link/${result[0].id}`);
        }, 300);
      }
    } catch (e) {
      console.error("Create link error:", e);
      if (e?.inner) {
        const newErrors = {};
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else if (e?.message) {
        setErrors({ submit: e.message });
      }
    }
  };

  return (
    <Dialog
      defaultOpen={!!longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" className="font-bold text-2xl">
          Create Links
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl && (
          <QRCode value={formValues?.longUrl} size={250} ref={ref} />
        )}

        <Input
          id="title"
          placeholder="Title url"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Long URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2">apshort.vercel.app</Card>/
          <Input
            id="customUrl"
            placeholder="Custom URL"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>

        {createUrlMutation.error && (
          <Error message={createUrlMutation.error.message} />
        )}
        {errors.submit && <Error message={errors.submit} />}

        <DialogFooter className="sm:justify-center">
          <Button
            disabled={createUrlMutation.isPending}
            onClick={createNewLink}
            variant="destructive"
          >
            {createUrlMutation.isPending ? (
              <BeatLoader size={10} color="white" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
