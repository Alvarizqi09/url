import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Filter, Search, Plus, TrendingUp, Link2 } from "lucide-react";
import Error from "../components/error";
import useFetch from "../hooks/use-fetch";
import { getUrls } from "../db/apiUrls";
import { UrlState } from "../context";
import { getClicksForUrls } from "../db/apiClicks";
import LinkCard from "../components/link-card";
import CreateLink from "../components/create-link";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();

  const { data: urls, error, loading, fn: fnUrls } = useFetch(getUrls);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(getClicksForUrls);

  const refreshData = () => {
    if (user?.id) {
      fnUrls(user.id);
    }
  };

  const refreshClicks = () => {
    if (urls?.length) {
      fnClicks(urls.map((url) => url.id));
    }
  };

  useEffect(() => {
    if (user?.id) {
      fnUrls(user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length) {
      fnClicks(urls.map((url) => url.id));
    }
  }, [urls?.length]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user?.id) {
        refreshData();
      }
    };

    const handleFocus = () => {
      if (user?.id) {
        refreshData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      refreshClicks();
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.id, urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const todayClicks =
    clicks?.filter((click) => {
      const clickDate = new Date(click.created_at);
      const today = new Date();
      return clickDate.toDateString() === today.toDateString();
    }).length || 0;

  if (!user) {
    return <BarLoader width={"100%"} color="#36D7B7" />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.user_metadata?.name}. Here's your link
          performance.
        </p>
      </div>

      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36D7B7" />
      )}

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
            <div className="text-2xl font-bold">
              {urls?.length ? Math.round(clicks?.length / urls.length) : 0}
            </div>
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

      {error && <Error message={error?.message} />}

      <div className="grid grid-cols-1 gap-4">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard
            key={i}
            url={url}
            fetchUrls={() => {
              fnUrls(user.id);
              setTimeout(() => refreshClicks(), 500);
            }}
          />
        ))}

        {filteredUrls?.length === 0 && (
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
