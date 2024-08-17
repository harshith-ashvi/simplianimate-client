import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

import supabase from "@/data/supabaseClient";

type FormValues = {
  name?: string;
  email: string;
  password: string;
};

const AuthContext = createContext<{
  user: User | null;
  signin: ({ email, password }: FormValues) => void;
  signinWithProvider: () => void;
  signup: ({ name, email, password }: FormValues) => void;
  signout: () => void;
  handleResetPasswordForEmail: (email: string) => void;
  loading: boolean;
  isMessageSent: boolean;
  errorMessage: String;
}>({
  user: null,
  signin: () => {},
  signinWithProvider: () => {},
  signup: () => {},
  signout: () => {},
  handleResetPasswordForEmail: () => {},
  loading: false,
  isMessageSent: false,
  errorMessage: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");
  const [isMessageSent, setIsMessageSent] = useState<boolean>(false);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    setData();

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signinWithProvider = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signin = async ({ email, password }: FormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMessage(
          error.message === "Invalid login credentials"
            ? "Invalid email or password"
            : error.message
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }: FormValues) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            // emailRedirectTo: "http://localhost:6969/",
          },
        },
      });
      if (error) {
        setErrorMessage(error.message);
      } else if (
        data?.user?.aud === "authenticated" &&
        data.user?.user_metadata?.email_verified !== false
      ) {
        setErrorMessage("Email already exists. Try with a different Email.");
      } else {
        setIsMessageSent(true);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/signin");
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordForEmail = async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:6969/reset-password",
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setIsMessageSent(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    signin,
    signinWithProvider,
    signup,
    signout,
    handleResetPasswordForEmail,
    loading,
    isMessageSent,
    errorMessage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
