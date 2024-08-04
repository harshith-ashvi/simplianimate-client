import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

import supabase from "@/data/supabaseClient";

type FormValues = {
  email: string;
  password: string;
};

const AuthContext = createContext<{
  user: User | null;
  signin: ({ email, password }: FormValues) => void;
  signinWithProvider: () => void;
  signup: ({ email, password }: FormValues) => void;
  signout: () => void;
  loading: Boolean;
  errorMessage: String;
}>({
  user: null,
  signin: () => {},
  signinWithProvider: () => {},
  signup: () => {},
  signout: () => {},
  loading: false,
  errorMessage: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState<String>("");

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
        setErrorMessage(error.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ email, password }: FormValues) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
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

  const value = {
    user,
    signin,
    signinWithProvider,
    signup,
    signout,
    loading,
    errorMessage,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
