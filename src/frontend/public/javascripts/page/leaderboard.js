import { getLeaderboard } from '../data/fetchData.js';
import { displayContainerLeaderboard } from '../containers/containerLeaderboard.js';
import { navBar } from '../partials/nav.js';
import { userIsSignedIn } from '../helpers/userIsSignedIn.js';
import { createSideNavItems } from '../partials/sidenav.js';

async function init() {
    let statusSignIn = await userIsSignedIn();

    if (statusSignIn) {
        navBar();
        createSideNavItems();
        // Get leaderboard data and populate container
        getLeaderboard().then(oLeaderboard => { displayContainerLeaderboard(oLeaderboard)})
    } else {
        //the user is not logged in,redirect them to the login page
        window.location.href = "/login";
    }
}

init();