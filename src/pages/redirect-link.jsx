import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirectlink = () => {
  const { id } = useParams();
  const [isRedirected, setIsRedirected] = useState(false);

  const { loading, data, error, fn } = useFetch(getLongUrl);
  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks);

  // Step 1: Fetch the long URL
  useEffect(() => {
    if (id) {
      fn(id);
    }
  }, [id]);

  // Step 2: Store click stats and then redirect
  useEffect(() => {
    if (!loading && data && !error) {
      fnStats({
        id: data.id,
        originalUrl: data.original_url,
      });
    }
  }, [loading, data, error]);

  // Step 3: Redirect after stats are stored
  useEffect(() => {
    if (!loadingStats && data && data.original_url && !isRedirected) {
      // Give a small delay to ensure click is recorded
      const timeout = setTimeout(() => {
        setIsRedirected(true);
        window.location.href = data.original_url;
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [loadingStats, data, isRedirected]);

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

  if (loading || loadingStats) {
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
