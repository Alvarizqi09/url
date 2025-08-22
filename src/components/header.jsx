import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { UrlState } from "../context";
import { logout } from "../db/apiAuth";
import useFetch from "../hooks/use-fetch";
import { BarLoader } from "react-spinners";

const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logout);

  // Function to get profile picture from different sources
  const getProfilePicture = () => {
    if (!user) return null;

    // For Google OAuth users, avatar_url is available directly
    if (user.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }

    // For manual signup users, profile_pic is in user_metadata
    if (user.user_metadata?.profile_pic) {
      return user.user_metadata.profile_pic;
    }

    // Fallback to identities array (for OAuth providers)
    if (user.identities && user.identities.length > 0) {
      const identity = user.identities.find((id) => id.provider === "google");
      if (identity && identity.identity_data?.avatar_url) {
        return identity.identity_data.avatar_url;
      }
    }

    return null;
  };

  // Function to get user name
  const getUserName = () => {
    if (!user) return "User";

    // For manual signup
    if (user.user_metadata?.name) {
      return user.user_metadata.name;
    }

    // For Google OAuth
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    // Fallback to email prefix
    if (user.email) {
      return user.email.split("@")[0];
    }

    return "User";
  };

  // Function to get initials for fallback
  const getUserInitials = () => {
    const name = getUserName();
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav className="flex items-center justify-between py-4">
        <Link to="/">
          <img src="/lo-white.png" alt="Logo" className="h-16" />
        </Link>

        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={getProfilePicture()}
                    className="object-cover"
                    alt={`${getUserName()}'s profile`}
                  />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{getUserName()}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard" className="flex items-center">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    My Links
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}
    </>
  );
};

export default Header;
