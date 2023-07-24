import React from "react";
import ImageUploader from "./components/ImageUploadComponent";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageUploader />
    </div>
  );
}

export default App;
