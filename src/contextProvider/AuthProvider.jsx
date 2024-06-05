import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "@/firebase/firebase.config.js";
import { createContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    try {
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const signIn = (email, password) => {
    setLoading(true);
    try {
      return signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    // Make googleLogin an asynchronous function
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      console.error("Google login error:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Logout error:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unscubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => {
      return unscubcribe();
    };
  }, []);

  const AuthInfo = {
    user,
    loading,
    googleLogin,
    logOut,
    signIn,
    createUser,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;