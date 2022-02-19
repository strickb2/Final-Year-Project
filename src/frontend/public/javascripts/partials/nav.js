import { getLeaderboard, getCurrentUser } from '../data/fetchData.js'

let navListAccount = document.getElementById("navList");

export function navBar() {
    if (localStorage.getItem("access") == "") {
        // If user is not signed in
        navListAccount.innerHTML = '<li class="nav-item"> \
            <a class="btn btn-primary mx-1" href="/login">Login</a> \
            </li> \
            <li class="nav-item"> \
            <a class="btn btn-primary mx-1" href="/signup">Sign Up</a> \
            </li>'
    } else {
        // If user signed in
        // Clear nav incase it isnt page reload
        navListAccount.innerHTML = "";
        // Show Account Balance
        let navItemAccountBalance = document.createElement("div");
        navItemAccountBalance.className = "nav-item";
        let oUserPromise = getCurrentUser();

        // Show Leaderboard Points
        let navItemLeaderboard = document.createElement("div");
        navItemLeaderboard.className = "nav-item";
        // Get User
        oUserPromise.then(oUser => {
            navItemAccountBalance.innerHTML = '<li class="nav-item"> \
            <a class="btn btn-primary mr-2" href="/account/dashboard/">€' + oUser.balance + '</a> \
            </li>';
            let oLeaderboardPromise = getLeaderboard();
            // Get Leaderboard
            oLeaderboardPromise.then(oLeaderboard => {
                // For user in leaderboard
                for (let sId in oLeaderboard) {
                    // If user is current user
                    if (oLeaderboard[sId].user_id.id === oUser.id) {
                        navItemLeaderboard.innerHTML = '<li class="nav-item"> \
                            <a class="btn btn-warning mr-2" href="/leaderboard/"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16"> \
                            <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/> \
                            </svg> <span class="badge rounded-pill bg-white text-dark">' + oLeaderboard[sId].points + ' points</span> </a> \
                            </li>';
                    }
                }
            })
        })
        navListAccount.appendChild(navItemLeaderboard);
        navListAccount.appendChild(navItemAccountBalance);

        // -------------- Add Dropdown on Account Icon --------------
        let navItemAccountIcon = document.createElement("li");
        navItemAccountIcon.className = "dropdown mt-2";
        navItemAccountIcon.innerHTML = "<a data-toggle='dropdown' id='dropDownMenu' href='#'> \
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' class='bi bi-person-circle mb-1' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/> \
            <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/> \
            </svg> \
            </a>";

        let dropdownList = document.createElement("ul");
        dropdownList.className = "dropdown-menu dropdown-menu-dark dropdown-menu-right";

        // Dropdown: Dashboard
        let elDashboardLink = document.createElement("li");
        elDashboardLink.innerHTML = "<a class='dropdown-item' href='/account/dashboard/'>Dashboard</a>";
        dropdownList.appendChild(elDashboardLink);

        // Dropdown: Transaction History
        let elTransactionHistoryLink = document.createElement("li");
        elTransactionHistoryLink.innerHTML = "<a class='dropdown-item' href='/account/transactions/'>Transaction History</a>";
        dropdownList.appendChild(elTransactionHistoryLink);

        // Dropdown: Accoun Details
        let elDetailsLink = document.createElement("li");
        elDetailsLink.innerHTML = "<a class='dropdown-item' href='/account/details/'>Details</a>";
        dropdownList.appendChild(elDetailsLink);

        // Sign Out Icon
        let elSignOut = document.createElement("li");
        elSignOut.innerHTML = "<div class='dropdown-divider'></div> <a class='dropdown-item' href='#'> \
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' class='bi bi-box-arrow-right mb-1' viewBox='0 0 16 16'> \
            <path fill-rule='evenodd' d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'/> \
            <path fill-rule='evenodd' d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'/> \
            </svg> Sign Out</a>";
        elSignOut.onclick = function() {
            localStorage.setItem("access", "");
            localStorage.setItem("refresh", "");
            window.location.href = "/";
        };
        dropdownList.appendChild(elSignOut);

        navItemAccountIcon.appendChild(dropdownList);
        navListAccount.appendChild(navItemAccountIcon);
    };
};
