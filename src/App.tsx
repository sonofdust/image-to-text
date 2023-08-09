import React, {createContext, useContext, useEffect, useState} from "react";
import ImageUploader from "./components/ImageUploadComponent";
import NavBar from "./components/NavBar";
// import {
//   getToken,
//   setToken,
//   removeToken,
//   decodeToken,
// } from "./services/authService";
import useLocalStorage from "./hooks/useLocalStorage";

export interface AppContextType {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  textResult: string | null;
  setTextResult: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  const [jwt, setJwt] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useLocalStorage(
    "AUTH_KEY",
    localStorage.getItem("AUTH_KEY")
  );
  // useEffect(() => {
  //   console.log("MY TOKEN:  ", token);
  //   setToken(token);
  // }, [token]);

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
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavBar />
        {!!token ? <ImageUploader /> : undefined}
      </div>
    </AppContext.Provider>
  );
}
export default App;
