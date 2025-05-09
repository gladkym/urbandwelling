const openNav = () => document.getElementById("navModal").classList.add("open");
document.querySelector("#openNav").addEventListener("click", openNav);

const closeNav = () => document.getElementById("navModal").classList.remove("open");
document.querySelector("#closeNav").addEventListener("click", closeNav);


const input = document.getElementById("input");

input.addEventListener("focus", () => {
  input.setAttribute("placeholder", "Введите запрос");
});

input.addEventListener("blur", () => {
  input.removeAttribute("placeholder");
});


const cardTemplate = document.querySelector("#card-template").content;
const catalogItems = document.querySelector(".catalog");


const createItem = ({ link, name, prices }) => {
  const cardElement = cardTemplate.querySelector(".catalog__item").cloneNode(true);

  cardElement.querySelector(".card-image").src = link;
  cardElement.querySelector(".card-image").alt = name;
  cardElement.querySelector(".item__info-title").textContent = name;
  cardElement.querySelector(".newPrice").textContent = `${prices[0]} ₽`;

  if (prices.length === 2) {
    cardElement.querySelector(".newPrice").style.color = "#E45302";
    cardElement.querySelector(".promo-button").hidden = false;
    cardElement.querySelector(".oldPrice").hidden = false;
    cardElement.querySelector(".oldPrice").textContent = `${prices[1]} ₽`;
  }

  return cardElement;
};


fetch('./cardItems.json')
  .then((response) => response.json())
  .then((cardItems) => {
    cardItems.forEach((item) => {
      const catalogItem = createItem(item);
      catalogItems.append(catalogItem);
    });
  })
  .catch((error) => console.error('Ошибка загрузки JSON:', error));