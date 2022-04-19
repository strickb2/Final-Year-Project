import { getCurrentStockValue } from "../data/fetchData.js";

let containerStock = document.getElementById('infoStockData');

export function displayContainerStock(oStock, oStockCurrent) {
    // Clear Container
    containerStock.innerHTML = "";

    // Card with general stock info
    let cardStockInfo = document.createElement("div");
    cardStockInfo.className = "card p-0 shadow col-12";

    // Card info row
    let cardStockInfoRow = document.createElement("div");
    cardStockInfoRow.className = "col-12 row g-1 p-2";

    // Image on left of card
    let cardStockInfoLogo = document.createElement("div");
    cardStockInfoLogo.className = "col-3 p-2 text-center";
    cardStockInfoLogo.innerHTML = "<img src='" + oStock.logo + "' class='img-fluid rounded-start' style='max-height:200px; max-width: 230px' alt='" + oStock.name + "Logo Image'>";
    cardStockInfoRow.appendChild(cardStockInfoLogo);

    // General Stock Info Center of card
    let cardStockGeneralInfo = document.createElement("div");
    cardStockGeneralInfo.className = "col-5 p-2";
    cardStockGeneralInfo.innerHTML = "<h5 class='card-title'>" + oStock.name + " | " + oStock.ticker + "</h5> \
        <p class='fs-7'>" + oStock.description + "</p> \
        <p class='card-text'><a href='" + oStock.url + "'><small class='text-muted'>Visit " + oStock.name + "</small></a></p>";
    cardStockInfoRow.appendChild(cardStockGeneralInfo);

    
    // Current Stock Value Right of card
    let cardStockCurrentInfo = document.createElement("div");
    cardStockCurrentInfo.className = "col-4 p-2 text-center";
    // cardStockCurrentInfo.align = "center"
    if (oStockCurrent['dp'] >= 0) {
        cardStockCurrentInfo.innerHTML = "<h4 class='display-4'> €" + oStockCurrent['c'].toFixed(2) + "</h4> \
            <h4 class='display-4 text-success'> \
            <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='currentColor' class='bi bi-caret-up-fill text-success' viewBox='0 0 16 16'> \
                <path d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'/> \
            </svg>\
            " + oStockCurrent['dp'].toFixed(2) + "%</h4>";
    } else {
        cardStockCurrentInfo.innerHTML = "<h4 class='display-4' style='font-size:4rem'> €" + oStockCurrent['c'].toFixed(2) + "</h4> \
            <h4 class='display-4 text-danger'> \
            <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='currentColor' class='bi bi-caret-down-fill' viewBox='0 0 16 16'> \
            <path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/> \
            </svg>\
            " + oStockCurrent['dp'].toFixed(2) + "%</h4>";
    };
    cardStockInfoRow.appendChild(cardStockCurrentInfo);


    cardStockInfo.appendChild(cardStockInfoRow);
    containerStock.appendChild(cardStockInfo);
}