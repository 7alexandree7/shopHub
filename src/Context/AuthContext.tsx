import { createContext, useState, type ReactNode } from "react";

interface User {
    email: string;
    password: string;
}

interface AuthResult {
    success: boolean
    message?: string
    error?: string
}

interface AuthContextData {
    user: User | null;
    signUp: (email: string, password: string) => AuthResult;
    login: (email: string, password: string) => AuthResult;
    loggout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData | null>(null)

export default function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User | null>(localStorage.getItem("currentUserEmail")
        ? { email: localStorage.getItem("currentUserEmail") as string, password: "" }
        : null);

    const signUp = (email: string, password: string) => {
        const usersFromStorage = localStorage.getItem("users");
        const users = usersFromStorage
            ? JSON.parse(usersFromStorage)
            : [];

        if (users.find((user: User) => user.email === email)) {
            return { success: false, message: "Email already exists" };
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUserEmail", email);

        setUser(newUser);

        return { success: true, message: "User created successfully" };
    }

    const login = (email: string, password: string) => {
        const usersFromStorage = localStorage.getItem("users");
        const users = usersFromStorage
            ? JSON.parse(usersFromStorage)
            : [];
        const user: User = users.find((user: User) => user.email === email)

        if(!user) {
            return { success: false, message: "User not found" };
        }

        if(user.password !== password && user.email !== email) {
            return { success: false, message: "Invalid credentials" };
        }

        localStorage.setItem("currentUserEmail", email);
        setUser(user);

        return { success: true, message: "User logged in successfully" };
    }

    const loggout = () => {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, login, loggout, }}>
            {children}
        </AuthContext.Provider>
    )


}