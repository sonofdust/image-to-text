import React, {createContext, useContext, useState} from "react";
import ImageUploader from "./components/ImageUploadComponent";
import NavBar from "./components/NavBar";

export interface AppContextType {
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
  textResult: string | null;
  setTextResult: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

function App() {
  const [jwt, setJwt] = useState<string>("");

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const appContextValues: AppContextType = {
    selectedImage,
    setSelectedImage,
    textResult,
    setTextResult,
    loading,
    setLoading,
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
        <NavBar
          isAuthenticated={false}
          onLogin={(email: string, password: string): void => {
            throw new Error("Function not implemented.");
          }}
          onLogout={(): void => {
            throw new Error("Function not implemented.");
          }}
        />
        <ImageUploader />
      </div>
    </AppContext.Provider>
  );
}
export default App;
