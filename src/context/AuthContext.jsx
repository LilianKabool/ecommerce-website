import { createContext, useContext } from "react";

import { useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("currentUserEmail")
      ? { email: localStorage.getItem("currentUserEmail") }
      : null,
  );

  function signUp( fullName , email, password ) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "User already exists" };
    }
    const newUser = { fullName, email, password };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    setUser({ email , fullName });

    return { success: true };
  }
  function logOut() {
    setUser(null);
    localStorage.removeItem("currentUserEmail");
   
  localStorage.removeItem("cart");
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (!users.find((u) => u.email === email && u.password === password)) {
      return { success: false, error: "Invalid email or password" };
    }
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }
  return (
    <AuthContext.Provider value={{ signUp, user, logOut, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  const context = useContext(AuthContext);
  return context;
}