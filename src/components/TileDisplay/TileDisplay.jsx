import React, { useContext, useRef, useState } from "react";
import { UploadImageContext } from "../GlobalContexts/uploadImageContext";

import { useEffect } from "react";
import "./tileDisplay.css";

const TileDisplay = () => {
  const [enter, setEnter] = useState(false);

  let timer;
  let timer2;
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerRunning2, setIsTimerRunning2] = useState(false);
  const [indexKoraka, setIndexKoraka] = useState(0);
  let len = 0;
  let pozicijaNule = 0;
  let tempPocetnoStanje;
  let prekiniPrikaz = false;
  const [pozicijeNaKoraku, setPozicijeNaKoraku] = useState([[]]);
  const [nizNula, setNizNula] = useState([]);
  const divRef = useRef(null);
  const {
    tiles,
    matrixSize,
    uploadedImage,
    pocetnoStanje,
    setPocetnoStanje,
    koraci,
    konacnoStanje,
    imageConstext,
    setShowUploadImageMenu,
    setShowAlgoritamHeuristikaMenu,
    showUploadImageMenu,
    showAlgoritamHeuristikaMenu,
  } = useContext(UploadImageContext);

  len = tiles.length - 1;
  const areArraysEqual = (array1, array2) => {
    // Proveri dužine nizova
    if (array1.length !== array2.length) {
      return false;
    }

    // Proveri elemente na istim pozicijama
    return array1.every((element, index) => element === array2[index]);
  };

  const handleKeyPress = (event) => {
    if (event.code === "Space" && !enter) {
      setIsTimerRunning((prev) => !prev); // Pokreće ili zaustavlja tajmer
    } else if (event.code === "Escape") {
      clearInterval(timer);
      clearInterval(timer2);
      setEnter(false);
      setIndexKoraka(0);
      setNizNula([]);
      setPocetnoStanje([]);
      setPozicijeNaKoraku([[]]);
      setShowAlgoritamHeuristikaMenu(false);
      setShowUploadImageMenu(true);
      setIsTimerRunning(false);
      setIsTimerRunning2(false);
    } else if (event.code === "Enter") {
      setEnter(true);
      setIsTimerRunning2(true); // Pokreće drugi tajmer
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.focus();
    }
  }, [pocetnoStanje]);

  const otkucaj = () => {
    if (!areArraysEqual(konacnoStanje, pocetnoStanje) && enter == false) {
      pozicijaNule = pocetnoStanje.findIndex((p) => p === 0);
      setNizNula([...nizNula, pozicijaNule]);
      tempPocetnoStanje = [...pocetnoStanje];

      tempPocetnoStanje[pozicijaNule] = tempPocetnoStanje[koraci[indexKoraka]];

      tempPocetnoStanje[koraci[indexKoraka]] = 0;

      setPozicijeNaKoraku([...pozicijeNaKoraku, tempPocetnoStanje]);

      setPocetnoStanje(tempPocetnoStanje);

      setIndexKoraka((prevIndex) => prevIndex + 1);
    } else {
      clearInterval(timer);
    }
  };

  const otkucaj2 = () => {
    if (!areArraysEqual(konacnoStanje, pocetnoStanje)) {
      pozicijaNule = pocetnoStanje.findIndex((p) => p === 0);
      setNizNula([...nizNula, pozicijaNule]);
      tempPocetnoStanje = [...pocetnoStanje];

      tempPocetnoStanje[pozicijaNule] = tempPocetnoStanje[koraci[indexKoraka]];

      tempPocetnoStanje[koraci[indexKoraka]] = 0;

      setPozicijeNaKoraku([...pozicijeNaKoraku, tempPocetnoStanje]);

      setPocetnoStanje(tempPocetnoStanje);

      setIndexKoraka((prevIndex) => prevIndex + 1);
    } else {
      clearInterval(timer2);
    }
  };

  useEffect(() => {
    if (isTimerRunning) {
      // Pokreće tajmer
      timer = setInterval(otkucaj, 1000);
    } else {
      // Zaustavlja tajmer
      clearInterval(timer);
    }

    // Čisti interval kada se komponenta unmountuje ili `isTimerRunning` promeni
    return () => clearInterval(timer);
  }, [isTimerRunning, pocetnoStanje]);

  useEffect(() => {
    {
      konzola?.scrollHeight ? (konzola.scrollTop = konzola.scrollHeight) : null;
    }
    if (isTimerRunning2) {
      // Pokreće tajmer
      timer2 = setInterval(otkucaj2, 10);
      clearInterval(timer);
      setIsTimerRunning(false);
    } else {
      // Zaustavlja tajmer
      clearInterval(timer2);
    }

    // Čisti interval kada se komponenta unmountuje ili `isTimerRunning` promeni
    return () => clearInterval(timer2);
  }, [isTimerRunning2, pocetnoStanje]);

  const konzola = document.querySelector(".konzola");

  return !showUploadImageMenu && !showAlgoritamHeuristikaMenu ? (
    <div className="mainDisplayDiv">
      <div
        className="no-outline"
        ref={divRef}
        tabIndex={0} // Ovo omogućava da div dobije fokus
        onKeyDown={handleKeyPress}
        style={{
          display: "flex",
          flexWrap: "wrap",

          width: `${uploadedImage?.width + matrixSize * 2}px`,
        }}
      >
        {pocetnoStanje?.map((p, index) =>
          !areArraysEqual(konacnoStanje, pocetnoStanje) && enter == false ? (
            <div
              key={index}
              style={{
                width: `${uploadedImage?.width / matrixSize}px`,
                height: `${uploadedImage?.width / matrixSize}px`,
                border: "1px solid black",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {p != 0 ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      textAlign: "center",
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "5px",
                      padding: "2px 5px",
                    }}
                  >
                    {p != 0 ? tiles[p - 1]?.index : tiles[len]?.index}
                  </div>
                  <img
                    src={p != 0 ? tiles[p - 1]?.image : tiles[len]?.image}
                    style={{ width: "100%", height: "100%" }}
                  />
                </>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    padding: "2px 5px",
                  }}
                >
                  0
                </div>
              )}
            </div>
          ) : index == 0 ? (
            <div style={{ border: "5px solid black" }}>
              <img src={imageConstext.src} alt="" />
            </div>
          ) : null
        )}
      </div>
      <div className="konzola">
        {koraci?.map((k, index) => {
          indexKoraka == index ? (prekiniPrikaz = true) : null;
          return prekiniPrikaz == false ? (
            <p key={index}>
              {console.log(`Korak ${index + 1}: Pločica na poziciji ${
                koraci[index]
              } se pomerila
              na poziciju ${
                nizNula[index]
              } raspored pločica na ovom koraku je{" "}
              ${pozicijeNaKoraku[index + 1]}`)}
              Korak {index + 1}: Pločica na poziciji {koraci[index]} se pomerila
              na poziciju {nizNula[index]} raspored pločica na ovom koraku je{" "}
              {pozicijeNaKoraku[index + 1]}
            </p>
          ) : null;
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default TileDisplay;
