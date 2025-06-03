"use strict";

//DOM ELEMENTS
const siteName = document.getElementById("site-name");
const siteUrl = document.getElementById("site-url");
const validIcon = document.querySelector(".valid-icon");
const invalidIcon = document.querySelector(".invalid-icon");
const validIcon2 = document.querySelector(".valid-icon2");
const invalidIcon2 = document.querySelector(".invalid-icon2");
const submitButton = document.querySelector(".submit-button");
const layer = document.querySelector(".layer");
const layerButton = document.querySelector(".close");
const tableBody = document.getElementById("table-body");
let visitBookmark = null;
let deleteBookmark = null;

// Variables
let bookmarks = [];
let validNameFlag = false;
let validUrlFlag = false;

// Functions

function clear() {
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("valid-input");
  siteUrl.classList.remove("valid-input");
  validIcon.classList.remove("d-block");
  siteName.classList.add("normal-input");
  validIcon2.classList.remove("d-block");
  siteUrl.classList.add("normal-input");

  validNameFlag = false;
  validUrlFlag = false;
}

function init() {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    addBookmarks();
  }
}

function deleteBk(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  addBookmarks();
}

function addBookmarks() {
  let rows = "";
  rows += bookmarks.map(
    (site, index) => `<tr>
                <th scope="row">${index + 1}</th>
                <td>${site.name}</td>
                <td>
                  <button class="visit" data-index=${index + 1}>
                    <span><i class="fa-solid fa-eye visit" data-index=${
                      index + 1
                    }></i></span>Visit
                  </button>
                </td>
                <td>
                  <button class="delete" data-index=${index + 1}>
                    <span><i class="fa-solid fa-trash delete" data-index=${
                      index + 1
                    }></i></span>Delete
                  </button>
                </td>
              </tr>`
  );
  tableBody.innerHTML = rows;
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function validInput(input) {
  if (input === "name") {
    validIcon.classList.add("d-block");
    invalidIcon.classList.remove("d-block");
    siteName.classList.add("valid-input");
    siteName.classList.remove("invalid-input");
    siteName.classList.remove("normal-input");
  }
  if (input === "url") {
    validIcon2.classList.add("d-block");
    invalidIcon2.classList.remove("d-block");
    siteUrl.classList.add("valid-input");
    siteUrl.classList.remove("invalid-input");
    siteUrl.classList.remove("normal-input");
  }
}

function inValidInput(input) {
  if (input === "name") {
    validIcon.classList.remove("d-block");
    invalidIcon.classList.add("d-block");
    siteName.classList.remove("normal-input");
    siteName.classList.remove("valid-input");
    siteName.classList.add("invalid-input");
  }
  if (input === "url") {
    validIcon2.classList.remove("d-block");
    invalidIcon2.classList.add("d-block");
    siteUrl.classList.remove("normal-input");
    siteUrl.classList.remove("valid-input");
    siteUrl.classList.add("invalid-input");
  }
}

init();

// SITE NAME LOGIC
const regexName = /^[^!~#$%^&*()_+\-=|?><@.]{3,}$/;

siteName.addEventListener("input", (e) => {
  const input = e.target.value;

  if (regexName.test(input)) {
    validInput("name");
    validNameFlag = true;
  } else {
    inValidInput("name");
    validNameFlag = false;
  }
});

// SITE URL LOGIC
const regexUrl = /^[^!~#$%^&*()_+\-=|?><@.]+.(co|com|uk|eg|org)$/;
siteUrl.addEventListener("input", (e) => {
  const input = e.target.value;

  if (regexUrl.test(input)) {
    validInput("url");
    validUrlFlag = true;
  } else {
    inValidInput("url");
    validUrlFlag = false;
  }
});

// FORM SUBMIT LOGIC

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (validNameFlag && validUrlFlag) {
    if (!siteUrl.value.includes("https://www.")) {
      siteUrl.value = "https://www." + siteUrl.value;
    }
    bookmarks.push({ name: siteName.value, url: siteUrl.value });
    clear();
    addBookmarks();
  } else {
    layer.classList.add("visible");
  }

  console.log(bookmarks);
});

// TABLE LOGIC
tableBody.addEventListener("click", (e) => {
  console.log(e.target);

  let index = 0;
  if (e.target.classList.contains("visit")) {
    index = +e.target.dataset.index;
    window.open(bookmarks[index - 1].url, "_blank");
  }

  if (e.target.classList.contains("delete")) {
    index = +e.target.dataset.index;
    deleteBk(index - 1);
  }
});
// MODAL LOGIC
layerButton.addEventListener("click", (e) => {
  layer.classList.remove("visible");
});
