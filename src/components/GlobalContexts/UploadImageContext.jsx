import React, { createContext, useState } from "react";

// Kreiraj kontekst
export const UploadImageContext = createContext();

// Provider komponenta
export const UploadImageProvider = ({ children }) => {
  // Stanja za pločice, veličinu matrice i učitanu sliku
  const [tiles, setTiles] = useState([]);
  const [matrixSize, setMatrixSize] = useState(3);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showUploadImageMenu, setShowUploadImageMenu] = useState(true);
  const [pocetnoStanje, setPocetnoStanje] = useState([]);
  const [koraci, setKoraci] = useState([]);
  const [konacnoStanje, setKonacnoStanje] = useState([]);
  const [showAlgoritamHeuristikaMenu, setShowAlgoritamHeuristikaMenu] =
    useState(false);
  const [imageConstext, setImageContext] = useState(null);

  // Funkcija za ažuriranje pločica
  const updateTiles = (newTiles) => {
    setTiles(newTiles);
  };

  // Funkcija za ažuriranje veličine matrice
  const updateMatrixSize = (size) => {
    setMatrixSize(size);
  };

  // Funkcija za ažuriranje učitane slike
  const updateUploadedImage = (image) => {
    setUploadedImage(image);
  };

  return (
    <UploadImageContext.Provider
      value={{
        tiles,
        matrixSize,
        uploadedImage,
        updateTiles,
        updateMatrixSize,
        updateUploadedImage,
        showUploadImageMenu,
        setShowUploadImageMenu,
        showAlgoritamHeuristikaMenu,
        setShowAlgoritamHeuristikaMenu,
        pocetnoStanje,
        setPocetnoStanje,
        koraci,
        setKoraci,
        konacnoStanje,
        setKonacnoStanje,
        imageConstext,
        setImageContext,
      }}
    >
      {children}
    </UploadImageContext.Provider>
  );
};
