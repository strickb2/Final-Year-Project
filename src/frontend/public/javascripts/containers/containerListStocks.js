import { getCurrentStockValue } from '../data/fetchData.js'

let containerListStocks = document.getElementById("listStock");

export function displayContainerListStocks(oData) {
    containerListStocks.innerHTML = "";
    
    // Create Card for stocks content
    let cardListStocks = document.createElement("div");
    cardListStocks.className = "card";

    if (oData.length != 0) {
        // If there is data returned create a table
        let tableStockList = document.createElement("table");
        tableStockList.className = "table table-hover mb-0";

        // Create a table header
        let tableHeaderStockList = document.createElement("thead");
        tableHeaderStockList.className = "mt-0 text-white"
        tableHeaderStockList.style="background-color: #6610f2!important;"
        tableHeaderStockList.innerHTML = "<tr class='text-center'> \
            <th scope='col'>Logo</th> \
            <th scope='col'>Stock</th> \
            <th scope='col'>High</th> \
            <th scope='col'>Low</th> \
            <th scope='col'>Current</th> \
            <th scope='col'>Diff (1d)</th> \
            </tr>"
        tableStockList.appendChild(tableHeaderStockList);

        // Initialize table body for stock rows
        let tableBodyStockList = document.createElement("tbody");
        for (let idStock in oData) {
            let rowStockList = document.createElement("tr");
            rowStockList.style = "transform: rotate(0);"
            rowStockList.className = "text-center justify-content-center"
            let oStock = oData[idStock];

            // Row structure on table is as follows:
            // img - str - flt - flt - flt - flt(with colour)
            // img and flt(with colour) have extra attributes
            
            // Add stock image to start of row
            let rowItem = document.createElement("td");
            let rowItemImage = document.createElement("img");
            rowItemImage.src = oStock.logo;
            rowItemImage.alt = oStock.name + " Logo Image";
            rowItemImage.style = "height:50px; width:80px";
            rowItem.appendChild(rowItemImage);
            rowStockList.appendChild(rowItem);

            // Add normal data points to the row
            // Fetch stock's current values
            let oCurrentStockValuePromise = getCurrentStockValue(oStock.ticker);
            oCurrentStockValuePromise.then(oCurrentStockValue => {
                let dataPoints = [oCurrentStockValue['h'], oCurrentStockValue['l'], oCurrentStockValue['c']]

                rowItem = document.createElement("th");
                rowItem.scope = "row"
                rowItem.innerHTML = "<a href='/stock/?stock_id=" + oStock.id + "' class='stretched-link'>" + oStock.name + "</a>";
                rowStockList.appendChild(rowItem);

                for (let dataPoint in dataPoints) {
                    rowItem = document.createElement("td");
                    rowItem.innerHTML = dataPoints[dataPoint];
                    rowStockList.appendChild(rowItem);
                }
                
                // Add Percentage Difference with coloured text
                rowItem = document.createElement("td");
                rowItem.innerHTML = oCurrentStockValue['dp'] + "%"
                if (oCurrentStockValue['dp'] < 0) {
                    rowItem.className = "text-danger";
                } else {
                    rowItem.className = "text-success";
                }
                rowStockList.appendChild(rowItem);

                tableBodyStockList.appendChild(rowStockList);
            });
        };
        tableStockList.appendChild(tableBodyStockList);
        cardListStocks.appendChild(tableStockList);
        containerListStocks.appendChild(cardListStocks);
    } else {
        // If there is no data returned
        cardListStocks.className += " text-center"
        cardListStocks.style = "border:0.1rem solid #6610f2!important; color: #6610f2;";
        cardListStocks.innerHTML = "<div class='card-body'>No Stocks Found</div>";

        containerListStocks.appendChild(cardListStocks);
    }
};