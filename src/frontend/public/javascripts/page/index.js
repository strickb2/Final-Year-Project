import { getStockData, getNewsArticles } from '../data/fetchData.js';
import { displayContainerListStocks } from '../containers/containerListStocks.js';
import { displayContainerListNews } from '../containers/containerListNews.js';
import { navBar } from '../partials/nav.js';
import { userIsSignedIn } from '../helpers/userIsSignedIn.js';

async function init() {
    let statusSignIn = await userIsSignedIn();

    if (statusSignIn) {
        navBar();
        // Get data and populate containers 
        getStockData().then(oDataStocks => displayContainerListStocks(oDataStocks));
        getNewsArticles("Stock Market").then(oDataStocks => displayContainerListNews(oDataStocks));
    } else {
        //the user is not logged in,redirect them to the login page
        window.location.href = "/login";
    }
}

init();