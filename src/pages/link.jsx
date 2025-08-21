import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, Link2, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/location-stats";
import DeviceStats from "@/components/device-stats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  // Add validation for id and user
  useEffect(() => {
    if (!id) {
      console.error("No ID parameter found in URL");
      navigate("/dashboard");
      return;
    }

    if (!user?.id) {
      console.error("User not authenticated");
      navigate("/dashboard");
      return;
    }
  }, [id, user, navigate]);

  const { loading, data: url, fn, error } = useFetch(getUrl);

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl);

  useEffect(() => {
    // Only call functions if id and user exist
    if (id && user?.id) {
      fn(id, user.id);
      fnStats(id);
    }
  }, [id, user?.id]);

  // Handle errors more gracefully
  useEffect(() => {
    if (error) {
      console.error("Error loading URL:", error);
      navigate("/dashboard");
    }
  }, [error, navigate]);

  // Early return if no id or user
  if (!id || !user?.id) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  const DownloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = async () => {
    if (!url?.id) {
      console.error("URL ID is missing");
      return;
    }

    try {
      await fnDelete(url.id);
      // Redirect to dashboard after successful deletion
      navigate("/dashboard");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="36d7b7" />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col gap-8 items-start rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://apshort.vercel.app/${link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
          >
            https://apshort.vercel.app/{link}
          </a>
          <a
            href={url?.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <span className="flex items-center font-extralight text-sm">
            {url?.created_at && new Date(url.created_at).toLocaleDateString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://apshort.vercel.app/${url?.short_url}`
                )
              }
            >
              <Copy />
            </Button>
            <Button variant="ghost" onClick={DownloadImage}>
              <Download />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
          </div>
          {url?.qr && (
            <img
              src={url.qr}
              alt={url?.title}
              className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain"
            />
          )}
        </div>
        <Card className="sm:w-3/5">
          <CardHeader>
            <CardTitle className=" text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length || 0}</p>
                </CardContent>
              </Card>
              <CardTitle>Location Data</CardTitle>
              <LocationStats stats={stats} />
              <CardTitle>Device Data</CardTitle>
              <DeviceStats stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false ? (
                "No Statistics Available"
              ) : (
                <BarLoader />
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
