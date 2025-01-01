import React, { useState, useContext, useEffect } from "react";
import { UploadImageContext } from "../GlobalContexts/uploadImageContext";
import "./uploadImage.css";

const ImagePuzzle = () => {
  const [image, setImage] = useState(null);
  const {
    matrixSize,
    updateTiles,
    updateMatrixSize,
    updateUploadedImage,
    showUploadImageMenu,
    setShowUploadImageMenu,
    setShowAlgoritamHeuristikaMenu,
    imageConstext,
    setImageContext,
  } = useContext(UploadImageContext);

  const STANDARD_WIDTH = 400; // Standardna širina slike

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          // Smanji sliku na standardnu širinu
          const scaleFactor = STANDARD_WIDTH / img.width;
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          canvas.width = STANDARD_WIDTH;
          canvas.height = img.height * scaleFactor;

          context.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedImage = new Image();
          resizedImage.src = canvas.toDataURL();
          resizedImage.onload = () => {
            setImage(resizedImage);
            updateUploadedImage(resizedImage); // Pošalji smanjenu sliku u kontekst
          };
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMatrixSizeChange = (event) => {
    const size = parseInt(event.target.value, 10);
    if (size > 1) {
      updateMatrixSize(size); // Ažuriraj veličinu matrice u kontekstu
    } else {
      alert("Matrix size must be greater than 1.");
    }
  };

  const sliceImage = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const tileWidth = image.width / matrixSize;
    const tileHeight = image.height / matrixSize;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const tiles = [];

    for (let row = 0; row < matrixSize; row++) {
      for (let col = 0; col < matrixSize; col++) {
        const tileIndex = row * matrixSize + col + 1;

        if (row === matrixSize - 1 && col === matrixSize - 1) {
          tiles.push({ index: 0, image: null });
          continue;
        }

        canvas.width = tileWidth;
        canvas.height = tileHeight;

        context.drawImage(
          image,
          col * tileWidth,
          row * tileHeight,
          tileWidth,
          tileHeight,
          0,
          0,
          tileWidth,
          tileHeight
        );

        tiles.push({ index: tileIndex, image: canvas.toDataURL() });
      }
    }

    updateTiles(tiles); // Ažuriraj pločice u kontekstu
    setShowUploadImageMenu(false);
    setShowAlgoritamHeuristikaMenu(true);
  };

  useEffect(() => {
    setImageContext(image);
  }, [image]);
  return (
    <div className="helperDivUploadImage">
      {showUploadImageMenu == true ? (
        <div className="uploadImageMainDiv">
          <div className="inputsDiv">
            <div>
              <label>
                Upload Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            {/* <div>
              <label>
                Matrix Size:
                <input
                  type="number"
                  value={matrixSize}
                  min="2"
                  onChange={handleMatrixSizeChange}
                />
              </label>
            </div> */}
          </div>
          <button className="sliceBtn" onClick={sliceImage}>
            Odaberi Sliku
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ImagePuzzle;
