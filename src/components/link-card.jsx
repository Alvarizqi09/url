// src/components/link-card.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Copy, Download, Trash, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useDeleteUrl } from "../hooks/useUrls";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../hooks/queryKeys";

const LinkCard = ({ url }) => {
  const deleteUrlMutation = useDeleteUrl();
  const queryClient = useQueryClient();

  const handleCopy = async () => {
    try {
      const shortUrl = `https://apshort.vercel.app/${
        url?.custom_url || url.short_url
      }`;
      await navigator.clipboard.writeText(shortUrl);
      toast.success("Link copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch {
      toast.error("Failed to copy link", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const downloadImage = () => {
    if (!url?.qr) return;
    const anchor = document.createElement("a");
    anchor.href = url.qr;
    anchor.download = url.title;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = async () => {
    if (!url?.id) return;

    try {
      await deleteUrlMutation.mutateAsync(url.id);
      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: queryKeys.urls.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.clicks.all });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {url?.qr && (
                <img
                  src={url.qr}
                  alt={url.title}
                  className="h-12 w-12 object-contain border rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">{url.title}</h3>
                <a
                  href={`https://apshort.vercel.app/${
                    url?.custom_url || url.short_url
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 truncate"
                >
                  https://apshort.vercel.app/{url?.custom_url || url.short_url}
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
                <p className="text-sm text-gray-500 truncate">
                  {url.original_url}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(url.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/link/${url.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="flex items-center gap-1"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={downloadImage}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={deleteUrlMutation.isPending}
              className="text-red-500 hover:text-red-700 flex items-center gap-1"
            >
              {deleteUrlMutation.isPending ? (
                <BeatLoader size={5} color="red" />
              ) : (
                <Trash className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
