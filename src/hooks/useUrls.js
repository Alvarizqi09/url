// src/hooks/useUrls.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUrls, getUrl, createUrl, deleteUrl } from "../db/apiUrls";
import { queryKeys } from "./queryKeys";
import { toast } from "react-toastify";

// Fetch all URLs for a user
export const useUrls = (userId) => {
  return useQuery({
    queryKey: queryKeys.urls.byUser(userId),
    queryFn: () => getUrls(userId),
    enabled: !!userId,
    staleTime: 1000 * 30, // 30 seconds
  });
};

// Fetch single URL
export const useUrl = (urlId, userId) => {
  return useQuery({
    queryKey: queryKeys.urls.detail(urlId, userId),
    queryFn: () => getUrl(urlId, userId),
    enabled: !!urlId && !!userId,
    retry: 2,
  });
};

// Create URL mutation
export const useCreateUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ urlData, blob }) => createUrl(urlData, blob),
    onSuccess: (data, variables) => {
      console.log("Create URL success:", data, variables);
      // Invalidate and refetch URLs list
      queryClient.invalidateQueries({
        queryKey: queryKeys.urls.byUser(variables.urlData.user_id),
      });
      // Also invalidate all urls queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.urls.all,
      });
      toast.success("Link created successfully!");
    },
    onError: (error) => {
      console.error("Create URL error:", error);
      toast.error(error.message || "Failed to create link");
    },
  });
};

// Delete URL mutation
export const useDeleteUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (urlId) => deleteUrl(urlId),
    onSuccess: () => {
      // Invalidate all URL queries
      queryClient.invalidateQueries({ queryKey: queryKeys.urls.all });
      toast.success("Link deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete link");
    },
  });
};
