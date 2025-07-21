const select = document.getElementById("select");
const btn = document.getElementById("btn");
const body = document.querySelector("body");
const input = document.getElementById("input");
const container = document.querySelector(".container");


let data = [];

btn.addEventListener("click", () => {
    body.classList.toggle("dark");
});

fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region")
    .then((res) => res.json())
    .then((boshData) => {
        console.log(boshData);
        data = boshData;
        showData(data);
    })


function showData(newData) {
    container.innerHTML = "";
    newData.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${value.flags.png}" alt="">
            <h2 class="name">${value.name.common}</h2>
            <h3>Population:${value.population.toLocaleString()}</h3>
            <h3>Region:${value.region}</h3>
            <h3>Capital:${value.capital ? value.capital[0] : "N/A"}</h3>
        `;
        container.appendChild(card);
    });
}


input.addEventListener("input", (e) => {
    let filteredData = data.filter((value) => value.name.common.toLowerCase().includes(input.value.toLowerCase()));
    showData(filteredData);
});

select.addEventListener("change", () => {
    if (select.value === "All") {
        showData(data);
    } else {
        let filteredData = data.filter((value) => value.region === select.value);
        showData(filteredData);
    }
});

