// import React, {useEffect, useState} from "react";
// import {
//   Button,
//   Grid,
//   Typography,
//   CircularProgress,
//   TextField,
// } from "@mui/material";
// import {createWorker, ImageLike} from "tesseract.js";

// const ImageUploader: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [textResult, setTextResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   useEffect(() => {
//     convertImageToText();
//   }, [selectedImage]);

//   const worker = createWorker();

//   const convertImageToText = async () => {
//     if (selectedImage) {
//       setLoading(true);
//       const img = new Image();
//       img.src = selectedImage;

//       img.onload = async () => {
//         const workerInstance = await worker;
//         await workerInstance.loadLanguage("eng");
//         await workerInstance.initialize("eng");
//         const {data} = await workerInstance.recognize(img as ImageLike);
//         console.log("Text Result: ", data.text);
//         setTextResult(data.text);
//         setLoading(false);
//       };
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const path = URL.createObjectURL(file);
//       setSelectedImage(path);
//     }
//   };

//   return (
//     <Grid container direction="column" alignItems="center" spacing={2}>
//       <Grid
//         item
//         style={{marginTop: "4rem", position: "relative", width: "70%"}}
//       >
//         <input
//           accept="image/*"
//           id="image-upload"
//           type="file"
//           style={{display: "none"}}
//           onChange={handleImageChange}
//         />
//         <label htmlFor="image-upload">
//           <Button variant="contained" component="span">
//             {loading ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Upload Image"
//             )}
//           </Button>
//         </label>
//         {selectedImage && (
//           <Typography
//             variant="body1"
//             style={{marginTop: "1rem", textAlign: "center"}}
//           >
//             {selectedImage}
//           </Typography>
//         )}
//       </Grid>
//       {selectedImage && (
//         <Grid item style={{marginTop: "5rem"}}>
//           <div style={{display: "flex", justifyContent: "center"}}>
//             <img
//               src={selectedImage}
//               alt="Uploaded"
//               style={{maxWidth: "60%", width: "50vw"}}
//             />
//           </div>
//         </Grid>
//       )}
//       {/* Material-UI TextField to display the textResult */}
//       {/* Material-UI TextField to display the textResult */}
//       {textResult && (
//         <Grid item style={{marginTop: "2rem", width: "70%"}}>
//           <div style={{height: "200px", overflowY: "scroll"}}>
//             <TextField
//               label="Text Result"
//               multiline
//               value={textResult}
//               fullWidth
//               variant="outlined"
//               size="small" // Adjust the size of the TextField
//             />
//           </div>
//         </Grid>
//       )}
//     </Grid>
//   );
// };

// export default ImageUploader;

import React, {useEffect, useState} from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";
import {createWorker, ImageLike} from "tesseract.js";

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
        console.log("Text Result: ", data.text);
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
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid
          item
          style={{marginTop: "4rem", position: "relative", width: "70%"}}
        >
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
        </Grid>
        <Hidden>
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

          {/* Material-UI TextField to display the textResult */}
          {textResult && (
            <Grid item style={{marginTop: "2rem", width: "70%"}}>
              <div style={{height: "200px", overflowY: "scroll"}}>
                <TextField
                  label="Text Result"
                  multiline
                  value={textResult}
                  fullWidth
                  variant="outlined"
                  size="small" // Adjust the size of the TextField
                />
              </div>
            </Grid>
          )}
        </Hidden>
      </Grid>
    </div>
  );
};

export default ImageUploader;
