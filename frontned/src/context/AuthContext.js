import { createContext, useContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;
export const useAuth = () => useContext(AuthContext);

