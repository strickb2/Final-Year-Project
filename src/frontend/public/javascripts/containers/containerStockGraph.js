const containerStockGraph = document.getElementById("chartTimeSeries");

export function displayContainerStockGraph(oTimeSeries) {
    containerStockGraph.innerHTML = "";
    let card = document.createElement("div");
    card.className = "card shadow";
    card.style = "height:480px"

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header lead text-primary d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-2 mb-3 border-bottom";
    cardHeader.style = "border-left:0.25rem solid #0d6efd!important;"
    cardHeader.innerHTML = "Real-Time"

    let cardHeaderLinks = document.createElement("ul");
    cardHeaderLinks.className = "nav nav-pills mb-6";
    cardHeaderLinks.id = "pills-tab";
    cardHeaderLinks.role = "tablist";
    cardHeaderLinks.innerHTML = "<li class='nav-item'> \
        <a class='btn btn-outline-primary mx-1 active' id='graph-day-tab' data-toggle='pill' href='#graph-day' role='tab' aria-controls='graph-day' aria-selected='true'>Day</a> \
        </li> \
        <li class='nav-item'> \
        <a class='btn btn-outline-primary mx-1' id='graph-month-tab' data-toggle='pill' href='#graph-month' role='tab' aria-controls='graph-month' aria-selected='false'>Month</a> \
        </li>"
    cardHeader.appendChild(cardHeaderLinks);
    card.appendChild(cardHeader)

    let tabContent = document.createElement("div");
    tabContent.className = "tab-content"

    for (let sTimePeriod in oTimeSeries) {
        let tabPane = document.createElement("div");
        if (sTimePeriod === "day") {
            tabPane.className = "tab-pane fade show active";
        } else{
            tabPane.className = "tab-pane fade show";
        };
        tabPane.id = "graph-" + sTimePeriod;
        tabPane.role = "tabpanel"
        tabPane.setAttribute('aria-labelledby', 'graph-'+sTimePeriod+'-tab')

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let canvas = document.createElement("canvas");
        canvas.id = "stockLineGraph" + sTimePeriod;
        cardBody.appendChild(canvas)
        
        
        tabPane.appendChild(cardBody);
        tabContent.appendChild(tabPane);
    }
    card.appendChild(tabContent);
    containerStockGraph.appendChild(card);


    for (let sTimePeriod in oTimeSeries) {
        createLineGraphChartJS(oTimeSeries[sTimePeriod], sTimePeriod);
    };
}

function createLineGraphChartJS(oData, sTimePeriod) {
    const labels = oData['x_labels'];
    const oChartData = oData['y_labels'];
    const ctx = document.getElementById('stockLineGraph' + sTimePeriod).getContext('2d');
    const stockLineGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                fill: true,
                data: oChartData,
                tension: 0,
                borderColor: 'rgb(0, 0, 255)',
                backgroundColor: 'rgb(30, 150, 255)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                Y_AXIS: {
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '€' + value.toFixed(2);
                        }
                    }
                }
            },
        }
    });
}