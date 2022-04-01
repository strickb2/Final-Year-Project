import { getStockData, getCurrentStockValue, getTimeSeries, getCurrentUser, getStockBalance, getNewsArticles } from '../data/fetchData.js';
import { displayContainerStock } from '../containers/containerStock.js';
import { displayContainerListNews } from '../containers/ContainerListNews.js';
import { displayContainerStockTransaction } from '../containers/containerStockTransaction.js';
import { displayContainerStockTwitter } from '../containers/containerStockTwitter.js';
import { displayContainerStockGraph } from '../containers/containerStockGraph.js';
import { navBar } from '../partials/nav.js';
import { userIsSignedIn } from '../helpers/userIsSignedIn.js';

async function init() {
    let statusSignIn = await userIsSignedIn();

    if (statusSignIn) {
        navBar();
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
                
                // Get time series data and display graphs
                getTimeSeries(oStock.ticker).then(oTimeSeries => {displayContainerStockGraph(oTimeSeries)});

                // Get Account and Check if Stock Balance Available
                getCurrentUser().then(oUser => {
                    getStockBalance(stockId).then(oStockBalance => {
                        displayContainerStockTransaction(oUser, oStock, oStockBalance, oStockCurrent);
                    })
                });

                // Get stocks twitter handler and display feed
                displayContainerStockTwitter(oStock.twitter_handle)
            });

            // Get news articles and display news articles containers
            getNewsArticles(oStock.ticker + " Stock").then(displayContainerListNews);
        });
    } else {
        //the user is not logged in,redirect them to the login page
        window.location.href = "/login";
    }
};

init()