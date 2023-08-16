import * as React from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";

export default function CircularProgressSizes() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Adjust this as needed
      }}
    >
      <Box
        sx={{display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap"}}
      >
        <CircularProgress size="lg" />
      </Box>
    </div>
  );
}
