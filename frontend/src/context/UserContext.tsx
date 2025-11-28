import { createContext, useContext, useState } from "react";

import type { UserType } from "../../lib/type";

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

type UserContextProviderProps = {
  children: React.ReactNode;
};

function UserContextProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("This element must be used inside the UserContextProvider");
  }
  return context;
}

export default UserContextProvider;
