import { createContext, useState } from "react";

const AuthContext = createContext(null);
const accessTokenName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem(accessTokenName),
  );

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
