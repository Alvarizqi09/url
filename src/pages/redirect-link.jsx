// src/pages/Redirectlink.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getLongUrl } from "@/db/apiUrls";
import { useStoreClick } from "../hooks/useClicks";

const Redirectlink = () => {
  const { id } = useParams();
  const [isRedirected, setIsRedirected] = useState(false);

  // Fetch the long URL
  const { data, isLoading, error } = useQuery({
    queryKey: ["redirect", id],
    queryFn: () => getLongUrl(id),
    enabled: !!id,
    retry: 1,
  });

  const storeClickMutation = useStoreClick();

  // Store click stats and redirect
  useEffect(() => {
    if (!isLoading && data && !error && !isRedirected) {
      const storeAndRedirect = async () => {
        try {
          // Store the click
          await storeClickMutation.mutateAsync({
            id: data.id,
            originalUrl: data.original_url,
          });
        } catch (err) {
          console.error("Failed to store click:", err);
        } finally {
          // Redirect regardless of click storage success
          setTimeout(() => {
            setIsRedirected(true);
            window.location.href = data.original_url;
          }, 300);
        }
      };

      storeAndRedirect();
    }
  }, [isLoading, data, error, isRedirected, storeClickMutation]);

  if (error) {
    return (
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error</h2>
        <p className="mt-2 text-gray-600">
          {error.message || "Short URL not found or invalid"}
        </p>
      </div>
    );
  }

  if (isLoading || storeClickMutation.isPending) {
    return (
      <div className="mt-8 text-center">
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        <p>Redirecting...</p>
      </div>
    );
  }

  // Fallback: If redirect didn't work, show manual link
  if (data && data.original_url) {
    return (
      <div className="mt-8 text-center">
        <p>If you're not redirected automatically, click here:</p>
        <a href={data.original_url} className="text-blue-600 hover:underline">
          {data.original_url}
        </a>
      </div>
    );
  }

  return null;
};

export default Redirectlink;
