import React, {useEffect, useState, useContext} from "react";
import openAiService from "../services/openAiService";
import {
  Button,
  CircularProgress,
  Grid,
  Hidden,
  TextField,
  Typography,
  styled,
  Paper,
  Box,
} from "@mui/material";
import {createWorker, ImageLike} from "tesseract.js";
import {encode} from "punycode";
import {AppContext, AppContextType} from "../App";

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ImageUploader: React.FC = () => {
  const {
    selectedImage,
    setSelectedImage,
    textResult,
    setTextResult,
    loading,
    setLoading,
  } = useContext(AppContext) as AppContextType; // Use the context

  useEffect(() => {
    convertImageToText();
  }, [selectedImage]);

  useEffect(() => {
    convertImageToText();
  }, [selectedImage]);

  const worker = createWorker();

  const convertImageToText = async () => {
    setTextResult("");
    if (selectedImage) {
      setLoading(true);
      const img = new Image();
      img.src = selectedImage;

      img.onload = async () => {
        const workerInstance = await worker;
        await workerInstance.loadLanguage("eng");
        await workerInstance.initialize("eng");
        const {data} = await workerInstance.recognize(img as ImageLike);
        const result = await openAiService(data.text);
        //setTextResult();
        setTextResult(JSON.stringify(result));

        setLoading(false);
      };
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const path = URL.createObjectURL(file);
      setSelectedImage(path);
    }
  };

  return (
    <div style={{height: "70vh", width: "100%", overflowY: "scroll"}}>
      <Grid container spacing={2}>
        {/* First Grid Item */}
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            style={{display: "none"}}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              style={{marginRight: "1.5rem"}}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Upload Image"
              )}
            </Button>
          </label>
          {/* </Grid> */}

          {/* Second Grid Item */}
          {/* <Grid item xs={6} container alignItems="center" justifyContent="center"> */}
          {selectedImage && (
            <Typography
              variant="body1"
              style={{marginTop: "1rem", textAlign: "center"}}
            >
              {selectedImage}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          {/* Your content for the second grid item */}
          {selectedImage && (
            <Grid
              item
              container
              style={{
                marginTop: "5rem",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <div style={{display: "flex", justifyContent: "center"}}>
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  style={{maxWidth: "100%", width: "100%"}}
                />
              </div>
            </Grid>
          )}
        </Grid>
        <Grid item xs={6}>
          <pre>{textResult}</pre>
          {/* {textResult && (
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              value={textResult}
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="outlined"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          )} */}
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageUploader;
