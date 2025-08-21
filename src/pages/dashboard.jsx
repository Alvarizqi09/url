import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../components/ui/input";
import { Filter } from "lucide-react";
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

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return <BarLoader width={"100%"} color="#36D7B7" />;
  }

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36D7B7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search My Links"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute right-2 top-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={() => fnUrls(user.id)} />;
      })}
    </div>
  );
};

export default Dashboard;
