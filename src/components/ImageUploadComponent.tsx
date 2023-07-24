import React, {useEffect, useState} from "react";
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

const Item = styled(Paper)(({theme}) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ImageUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        setTextResult(data.text);
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
    <div style={{height: "70vh", overflowY: "scroll"}}>
      <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
        <Grid container item xs={12} alignItems="center">
          <Item>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              style={{display: "none"}}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span">
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Upload Image"
                )}
              </Button>
            </label>
            {selectedImage && (
              <Typography
                variant="body1"
                style={{marginTop: "1rem", textAlign: "center"}}
              >
                {selectedImage}
              </Typography>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            {selectedImage && (
              <Grid item style={{marginTop: "5rem"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{maxWidth: "60%", width: "50vw"}}
                  />
                </div>
              </Grid>
            )}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            {textResult && (
              <TextField
                label="Text Result"
                multiline
                value={textResult}
                fullWidth
                variant="outlined"
                size="small" // Adjust the size of the TextField
              />
            )}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageUploader;
