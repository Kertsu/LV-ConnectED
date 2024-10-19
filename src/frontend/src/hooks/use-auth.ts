import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { useContext } from "react";

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("Called outside of Auth Context!");
    }
    return context;
};