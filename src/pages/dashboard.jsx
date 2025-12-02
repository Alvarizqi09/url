// src/pages/Dashboard.jsx
import React, { useMemo, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Filter, Search, Link2, TrendingUp } from "lucide-react";
import Error from "../components/error";
import { UrlState } from "../context";
import LinkCard from "../components/link-card";
import CreateLink from "../components/create-link";
import { useUrls } from "../hooks/useUrls";
import { useClicksForUrls } from "../hooks/useClicks";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  // Fetch URLs using React Query
  const {
    data: urls,
    error: urlsError,
    isLoading: urlsLoading,
  } = useUrls(user?.id);

  // Get URL IDs for clicks query
  const urlIds = useMemo(() => urls?.map((url) => url.id) || [], [urls]);

  // Fetch clicks using React Query
  const { data: clicks, isLoading: clicksLoading } = useClicksForUrls(urlIds);

  // Filter URLs based on search
  const filteredUrls = useMemo(() => {
    if (!urls) return [];
    return urls.filter((url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [urls, searchQuery]);

  // Calculate today's clicks
  const todayClicks = useMemo(() => {
    if (!clicks) return 0;
    const today = new Date();
    return clicks.filter((click) => {
      const clickDate = new Date(click.created_at);
      return clickDate.toDateString() === today.toDateString();
    }).length;
  }, [clicks]);

  // Calculate average clicks per link
  const avgClicks = useMemo(() => {
    if (!urls?.length || !clicks?.length) return 0;
    return Math.round(clicks.length / urls.length);
  }, [urls, clicks]);

  if (!user) {
    return <BarLoader width={"100%"} color="#36D7B7" />;
  }

  const isLoading = urlsLoading || clicksLoading;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.user_metadata?.name}. Here's your link
          performance.
        </p>
      </div>

      {isLoading && <BarLoader width={"100%"} color="#36D7B7" />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urls?.length || 0}</div>
            <p className="text-xs text-blue-100">All your shortened URLs</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clicks?.length || 0}</div>
            <p className="text-xs text-green-100">All time clicks</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Clicks
            </CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayClicks}</div>
            <p className="text-xs text-purple-100">Clicks in last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Clicks</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgClicks}</div>
            <p className="text-xs text-orange-100">Per link</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-8">
        <div>
          <h2 className="text-2xl font-bold">My Links</h2>
          <p className="text-gray-600">Manage and track your shortened URLs</p>
        </div>
        <CreateLink />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search my links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 rounded-xl"
        />
        <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      {urlsError && <Error message={urlsError?.message} />}

      <div className="grid grid-cols-1 gap-4">
        {filteredUrls.map((url) => (
          <LinkCard key={url.id} url={url} />
        ))}

        {filteredUrls.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex justify-center mb-4">
                <Link2 className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No links found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery
                  ? "Try a different search term"
                  : "Get started by creating your first shortened URL"}
              </p>
              {!searchQuery && <CreateLink />}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
