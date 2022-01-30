import { getStockData, getCurrentStockValue, getCurrentUser, getNewsArticles } from '../data/fetchData.js' // getTimeSeries
import { displayContainerStock } from '../containers/containerStock.js'
import { displayContainerListNews } from '../containers/ContainerListNews.js'


function init() {
    // Get URL Param
    const queryString = window.location.search 
    const urlParams = new URLSearchParams(queryString); // Variable initalized to add query parameter to URL
    const stockId = urlParams.get('stock_id'); // Product ID added to query parameter
    const oPromiseStock = getStockData(stockId);
    
    // Get stock data
    oPromiseStock.then(oStockList => {
        const oStock = oStockList[0]
        const oStockCurrentPromise = getCurrentStockValue(oStock.ticker);
        oStockCurrentPromise.then(oStockCurrent => {
            displayContainerStock(oStock, oStockCurrent);
        });
       
        // Get time series data and display graphs
        // getTimeSeries(oDataStock.ticker).then(displayContainerTimeSeries);

        // Get Account and Stock Balance Details and display transaction options
        console.log(getCurrentUser());

        // Get news articles and display news articles containers
        getNewsArticles(oStock.ticker + " Stock").then(displayContainerListNews);
    });
};

init()