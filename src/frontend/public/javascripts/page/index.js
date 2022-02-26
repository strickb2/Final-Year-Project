import { getStockData, getNewsArticles } from '../data/fetchData.js';
import { displayContainerListStocks } from '../containers/containerListStocks.js';
import { displayContainerListNews } from '../containers/containerListNews.js';
import { navBar } from '../partials/nav.js'

function init() {
    navBar();
    // Get data and populate containers 
    getStockData().then(oDataStocks => displayContainerListStocks(oDataStocks));
    getNewsArticles("Stock Market").then(oDataStocks => displayContainerListNews(oDataStocks));
}

init();