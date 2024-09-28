const images = document.querySelectorAll(".item .img img");

const colorArray = [
  "#647395",
  "#d0d1dd",
  "#f84735",
  "#B5B8AC",
  "#A2B0B1",
  "#ff5d00",
  "#bdb09f",
  "#857F71",
  "#ed75a6",
  "#201614",
  "#ffff00",
  "#91c600",
  "#fec5bd",
  "#7b713e",
  "#5E6471",
  "#88b7d8",
];

function handleImageClick(event) {
  const imgSrc = event.currentTarget.src;

  // Modification de l'expression régulière pour accepter .jpeg et .jpg
  const imgNumber = imgSrc.match(/(\d+)\.(jpeg|jpg)/)[1];
  document.body.style.backgroundColor = colorArray[parseInt(imgNumber) - 1];

  const newImgSrc = `./assets/${imgNumber}.jpeg`;

  const previewContainer = document.querySelector(".preview-container");

  const currentLastImg = previewContainer.querySelector("img:last-child");

  if (currentLastImg) {
    gsap.to(currentLastImg, { duration: 1, scale: 1.5, left: "-50%" });
  }

  const newImg = document.createElement("img");
  newImg.src = newImgSrc;
  newImg.style.position = "absolute";
  newImg.style.right = "-100%";

  previewContainer.appendChild(newImg);

  gsap.to(newImg, { duration: 1, right: "0%" });
}

images.forEach((img) => {
  img.addEventListener("click", handleImageClick);
});




window.addEventListener('load', function() {
  gsap.to("body", { 
      duration: 1.5, // Durée de l'animation
      opacity: 1,    // Transition d'opacité
      y: 0,          // Effet de déplacement vertical (de 50px à 0)
      ease: "power2.out" // Courbe de transition
  });
});