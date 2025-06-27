import React, { useEffect, useState } from "react";

const images = [
  "/images/Samsung.png",
  "/images/iPhone5.png",
  "/images/Xiaomi.png",
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // смена каждые 3 секунды

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <img
        src={images[currentIndex]}
        alt="Banner"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {

    width: "1200px",
    height: "400px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "20px",
  },
  image: {
    width: "1200px",
    height: "400px",
    objectFit: "cover",

    transition: "opacity 0.5s ease-in-out",
>>>>>>> Produktliste-mit-Filter,-Suche,-Sortierung-&-Pagination
  },
};

export default Banner;
