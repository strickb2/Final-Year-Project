import { getCurrentStockValue } from '../data/fetchData.js'

let containerListStocks = document.getElementById("listStock");

export function displayContainerListStocks(oData) {
    containerListStocks.innerHTML = "";
    
    // Create Card for stocks content
    let cardListStocks = document.createElement("div");
    cardListStocks.className = "card";

    if (oData.length != 0) {
        // If there is data returned create a table
        let divTableHead = document.createElement("div");
        divTableHead.style = "background-color: #6610f2!important;";

        let tableStockListHeader = document.createElement("table");
        tableStockListHeader.className = "table table-hover mb-0 mr-4";

        // Create a table header
        let tableHeaderStockList = document.createElement("thead");
        tableHeaderStockList.className = "text-white"
        tableHeaderStockList.style="background-color: #6610f2!important;"
        tableHeaderStockList.innerHTML = "<tr class='text-center'> \
            <th class='col-2'>Logo</th> \
            <th class='col-2'>Stock</th> \
            <th class='col-2'>High</th> \
            <th class='col-2'>Low</th> \
            <th class='col-2'>Current</th> \
            <th class='col-2'>Diff (1d)</th> \
            </tr>"
        tableStockListHeader.appendChild(tableHeaderStockList);
        divTableHead.appendChild(tableStockListHeader);
        cardListStocks.appendChild(divTableHead);

        let containerTable = document.createElement("div");
        containerTable.style = "overflow: auto; height: 450px; display: block;";

        let tableStockList = document.createElement("table");
        tableStockList.className = "table table-hover mb-0";

        // Initialize table body for stock rows
        let tableBodyStockList = document.createElement("tbody");
        for (let idStock in oData) {
            let rowStockList = document.createElement("tr");
            rowStockList.style = "transform: rotate(0);"
            rowStockList.className = "text-center col-2 justify-content-center"
            let oStock = oData[idStock];

            // Row structure on table is as follows:
            // img - str - flt - flt - flt - flt(with colour)
            // img and flt(with colour) have extra attributes
            
            // Add stock image to start of row
            let rowItem = document.createElement("td");
            rowItem.className = "col-2";
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
                rowItem.scope = "row";
                rowItem.innerHTML = "<a href='/stock/?stock_id=" + oStock.id + "' class='stretched-link'>" + oStock.name + "</a>";
                rowStockList.appendChild(rowItem);

                for (let dataPoint in dataPoints) {
                    rowItem = document.createElement("td");
                    rowItem.className = "col-2";
                    rowItem.innerHTML = dataPoints[dataPoint];
                    rowStockList.appendChild(rowItem);
                }
                
                // Add Percentage Difference with coloured text
                rowItem = document.createElement("td");
                rowItem.innerHTML = oCurrentStockValue['dp'] + "%"
                if (oCurrentStockValue['dp'] < 0) {
                    rowItem.className = "text-danger col-2";
                } else {
                    rowItem.className = "text-success col-2";
                }
                rowStockList.appendChild(rowItem);

                tableBodyStockList.appendChild(rowStockList);
            });
        };
        tableStockList.appendChild(tableBodyStockList);

        containerTable.appendChild(tableStockList);
        cardListStocks.appendChild(containerTable);
        containerListStocks.appendChild(cardListStocks);
    } else {
        // If there is no data returned
        cardListStocks.className += " text-center"
        cardListStocks.style = "border:0.1rem solid #6610f2!important; color: #6610f2;";
        cardListStocks.innerHTML = "<div class='card-body'>No Stocks Found</div>";

        containerListStocks.appendChild(cardListStocks);
    }
};