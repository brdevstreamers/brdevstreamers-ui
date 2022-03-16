import { useState, createContext, useContext } from "react";
import { AuthContextInterface, AuthState } from "../types/api/auth.types";

const AuthContext = createContext<AuthContextInterface | null>(null);

const STORAGE_KEY = "__auth_provider_token__";

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be rendered in the AuthProvider");
  }
  return context;
}

type Props = {
  children: React.ReactNode;
};

export function AuthProvider(props: Props) {
  const [authState, setAuthState] = useState<AuthState | null>(() => {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  });

  const setState = (auth: AuthState | null) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    setAuthState(auth);
  };

  const logout = () => {
    localStorage.clear();
    setAuthState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setAuthState: (authInfo) => setState(authInfo),
        authenticated: !!authState,
        logout,
      }}
      {...props}
    />
  );
}
