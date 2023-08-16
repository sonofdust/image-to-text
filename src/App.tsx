import React, {createContext, useContext, useEffect, useState} from "react";
import ImageUploader from "./components/ImageUploadComponent";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import {expired} from "./services/logInService";
import useLocalStorage from "./hooks/useLocalStorage";
import exp from "constants";
import {Box, CircularProgress} from "@mui/material";

export interface AppContextType {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  textResult: string | null;
  setTextResult: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  // isScrolling: boolean;
  // setScrolling: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  // const classes = useStyles();

  const [jwt, setJwt] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage("AUTH_KEY", "");
  // const [isScrolling, setScrolling] = useState<boolean>(false);

  //  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);
  useEffect(() => {
    try {
      console.log("KEY:  ", localStorage.getItem("AUTH_KEY"));
    } catch (e: any) {}
  });

  const appContextValues: AppContextType = {
    selectedImage,
    setSelectedImage,
    textResult,
    setTextResult,
    loading,
    setLoading,
    token,
    setToken,
  };

  return (
    <AppContext.Provider value={appContextValues}>
      {!!token ? (
        <>
          <div>
            <NavBar />
            <ImageUploader />
          </div>
        </>
      ) : (
        <Login />
      )}
    </AppContext.Provider>
  );
}
export default App;
