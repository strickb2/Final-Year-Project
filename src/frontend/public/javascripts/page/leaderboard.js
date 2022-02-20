import { getCurrentUser, getLeaderboard } from '../data/fetchData.js';
import { displayContainerLeaderboard } from '../containers/containerLeaderboard.js';
import { navBar } from '../partials/nav.js';

function init() {
    navBar();
    // Get leaderboard data and populate container
    getLeaderboard().then(oLeaderboard => { displayContainerLeaderboard(oLeaderboard)})
}

init();