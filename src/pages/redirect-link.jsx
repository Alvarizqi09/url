import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Redirectlink = () => {
  const { id } = useParams();

  const { loading, data, error, fn } = useFetch(getLongUrl);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks);

  useEffect(() => {
    if (id) {
      fn(id);
    }
  }, [id]);

  useEffect(() => {
    if (!loading && data && !error) {
      fnStats({
        id: data.id,
        originalUrl: data.original_url,
      });
    }
  }, [loading, data, error]);

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

  // This component shouldn't render anything after successful redirect
  // But just in case the redirect fails, show a manual link
  if (data && data.original_url) {
    return (
      <div className="mt-8 text-center">
        <p>If you're not redirected automatically, click here:</p>
        <a
          href={data.original_url}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.original_url}
        </a>
      </div>
    );
  }

  return null;
};

export default Redirectlink;
