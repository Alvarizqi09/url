import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./db/firebase";
import { onAuthStateChanged } from "firebase/auth";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Format user object to match your app's structure
        setUser({
          id: currentUser.uid,
          email: currentUser.email,
          user_metadata: {
            name: currentUser.displayName,
            profile_pic: currentUser.photoURL,
          },
          role: "authenticated",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchUser = () => {
    // Firebase handles this automatically via onAuthStateChanged
    // This function is kept for compatibility with existing code
    return Promise.resolve();
  };

  const isAuthenticated = !!user;

  return (
    <UrlContext.Provider value={{ user, loading, isAuthenticated, fetchUser }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
