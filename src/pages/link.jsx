import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { Copy, Download, ExternalLink, LinkIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LocationStats from "@/components/location-stats";
import DeviceStats from "@/components/device-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";

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
    if (id && user?.id) {
      fn(id, user.id);
      fnStats(id);
    }
  }, [id, user?.id]);

  useEffect(() => {
    if (error) {
      console.error("Error loading URL:", error);
      navigate("/dashboard");
    }
  }, [error, navigate]);

  if (!id || !user?.id) {
    return (
      <div className="text-center py-8">
        <BeatLoader size={10} color="#3b82f6" />
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

  const handleCopy = async () => {
    try {
      const shortUrl = `https://apshort.vercel.app/${
        url?.custom_url ? url?.custom_url : url.short_url
      }`;
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Link copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to copy link to clipboard", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Copy failed:", error);
    }
  };

  const handleDelete = async () => {
    if (!url?.id) {
      console.error("URL ID is missing");
      toast.error("Cannot delete: URL ID is missing", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      await fnDelete(url.id);
      toast.success("Link deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete link", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {(loading || loadingStats) && (
        <BarLoader className="mb-4 w-full" color="#3b82f6" />
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <Card className="shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Link Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loading ? (
                <>
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-10 w-32" />
                </>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Title
                    </h3>
                    <p className="text-xl font-semibold truncate">
                      {url?.title}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Short URL
                    </h3>
                    <a
                      href={`https://apshort.vercel.app/${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 truncate"
                    >
                      https://apshort.vercel.app/{link}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Original URL
                    </h3>
                    <a
                      href={url?.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-blue-500 flex items-center gap-1 truncate"
                    >
                      <LinkIcon className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{url?.original_url}</span>
                    </a>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">
                      Created
                    </h3>
                    <p className="text-sm">
                      {url?.created_at &&
                        new Date(url.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={handleCopy}
                      className="flex items-center gap-1"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={DownloadImage}
                      className="flex items-center gap-1"
                    >
                      <Download className="h-4 w-4" />
                      QR Code
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loadingDelete}
                      className="flex items-center gap-1"
                    >
                      {loadingDelete ? (
                        <BeatLoader size={5} color="white" />
                      ) : (
                        <>
                          <Trash className="h-4 w-4" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {url?.qr && (
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">QR Code</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src={url.qr}
                  alt={url?.title}
                  className="w-48 h-48 object-contain border rounded-lg p-2"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - Statistics */}
        <div className="w-full lg:w-3/5">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingStats ? (
                <div className="space-y-4">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </div>
              ) : stats && stats?.length ? (
                <>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-lg">Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-blue-600">
                        {stats?.length || 0}
                      </p>
                    </CardContent>
                  </Card>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Location Data
                    </h3>
                    <div className="bg-muted rounded-lg p-4">
                      <LocationStats stats={stats} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Device Data</h3>
                    <div className="bg-muted rounded-lg p-4">
                      <DeviceStats stats={stats} />
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No statistics available yet. Share your link to start
                  collecting data.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Link;
