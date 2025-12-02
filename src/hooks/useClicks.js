// src/hooks/useClicks.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClicksForUrls,
  getClicksForUrl,
  storeClicks,
} from "../db/apiClicks";
import { queryKeys } from "./queryKeys";

// Fetch clicks for multiple URLs
export const useClicksForUrls = (urlIds) => {
  return useQuery({
    queryKey: queryKeys.clicks.byUrls(urlIds),
    queryFn: () => getClicksForUrls(urlIds),
    enabled: !!urlIds && urlIds.length > 0,
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 30000, // Auto-refetch every 30 seconds
  });
};

// Fetch clicks for single URL
export const useClicksForUrl = (urlId) => {
  return useQuery({
    queryKey: queryKeys.clicks.byUrl(urlId),
    queryFn: () => getClicksForUrl(urlId),
    enabled: !!urlId,
    staleTime: 1000 * 10, // 10 seconds
    refetchInterval: 10000, // Auto-refetch every 10 seconds
  });
};

// Store click mutation
export const useStoreClick = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clickData) => storeClicks(clickData),
    onSuccess: (_, variables) => {
      // Invalidate clicks queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.clicks.byUrl(variables.id),
      });
    },
  });
};
