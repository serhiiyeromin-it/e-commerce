import React, { useEffect, useState } from "react";

const images = [
  "/images/Handy.jpg",
  "/images/iphone3.png",
  "/images/iPhone.avif",
  "/images/Samsung.avif",
  "/images/Download.jpg",
  "/images/Samsung.avif",
  "/images/Xiaomi.jpg",
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
    width: "100%",
    height: "300px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "20px",
  },
  image: {
    width: "1200px",
    height: "400px",
    objectFit: "cover",
    transition: "opacity 0.4s ease-in-out",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.5s ease-in-out",
  },
};

export default Banner;
