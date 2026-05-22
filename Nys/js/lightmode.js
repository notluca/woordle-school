let header = document.createElement("header");
let img = document.createElement("img");
img.src = "/assets/lightMode.svg";

if (document.cookie.includes("light-mode=true")) {
  document.body.classList.add("light-mode");
}

function toggleLightMode() {
  const isLight = document.body.classList.toggle("light-mode");
  document.cookie = `light-mode=${isLight}`;
}

img.addEventListener("click", toggleLightMode);
header.appendChild(img);
document.body.prepend(header);