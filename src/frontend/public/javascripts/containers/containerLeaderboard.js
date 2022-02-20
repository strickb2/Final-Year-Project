const containerLeaderboard = document.getElementById("leaderboard");

export function displayContainerLeaderboard(oLeaderboard) {
    if (oLeaderboard.length > 2) {
        // Leaderboard Top 3 Row
        let rowCards = document.createElement("div");
        rowCards.className = "row justify-content-center";
        
        // Col One
        let colOne = document.createElement("div");
        colOne.className = "col-4";
        let cardSecond = document.createElement("div");
        cardSecond.className = "card mt-3 pb-2";
        cardSecond.style = "background-color: #C0C0C0";
        cardSecond.innerHTML = "<div class='card-body'> \
            <p style='font-size:80px' class='text-center'>&#129352</p>\
            <h4 class='text-center text-white'>" + oLeaderboard[1].points + " points</h4>\
            <h4 class='text-center'>@" + oLeaderboard[1].user_id.username + "</h4>\
            </div>"
        colOne.appendChild(cardSecond)
        rowCards.appendChild(colOne);

        // Col Two
        let colTwo = document.createElement("div");
        colTwo.className = "col-4";
        let cardFirst = document.createElement("div");
        cardFirst.className = "card pb-4";
        cardFirst.style = "background-color: #FFD700";
        cardFirst.innerHTML = "<div class='card-body'> \
            <p style='font-size:80px' class='text-center'>&#129351</p>\
            <h4 class='text-center text-white'>" + oLeaderboard[0].points + " points</h4>\
            <h4 class='text-center'>@" + oLeaderboard[0].user_id.username +" </h4>\
            </div>"
        colTwo.appendChild(cardFirst);
        rowCards.appendChild(colTwo);

        // Col Three
        let colThree = document.createElement("div");
        colThree.className = "col-4";
        let cardThird = document.createElement("div");
        cardThird.className = "card mt-4";
        cardThird.style = "background-color: #CD7F32";
        cardThird.innerHTML = "<div class='card-body'> \
            <p style='font-size:80px' class='text-center'>&#129353</p>\
            <h4 class='text-center text-white'>" + oLeaderboard[2].points + " points</h4>\
            <h4 class='text-center'>@" + oLeaderboard[2].user_id.username + "</h4>\
            </div>"
        colThree.appendChild(cardThird);
        rowCards.appendChild(colThree);

        containerLeaderboard.appendChild(rowCards);

        // Leaderboard Table
        let tableLeaderboard = document.createElement("table");
        tableLeaderboard.className = "table table-hover table-light mt-3";

        // Table Head
        let tableHead = document.createElement("thead");
        // tableHead.className = "text-white";
        tableHead.style = "background-image: linear-gradient(to right, #ffc700, #fad500, #f3e300, #eaf100, #deff00);";
        // tableHead.className = "background-image: linear-gradient(to right top, #f4ff00, #f7f900, #faf300, #fdee00, #ffe800);"
        tableHead.innerHTML = "<tr class='text-center'> \
        <th colspan='3' class='text-left col-4' >Leaderboard</th> \
        </tr>"
        tableLeaderboard.appendChild(tableHead);

        let tableBody = document.createElement("tbody");
        for (let sId in oLeaderboard) {
            // Display rows of users in leaderboard
            let tableRow = document.createElement("tr");
            tableRow.className = "text-center justify-content-center";
            
            // First item in row
            let rowHead = document.createElement("th");
            rowHead.scope = "row";
            rowHead.className = "col-4"
            rowHead.innerHTML = parseInt(sId) + 1;
            tableRow.appendChild(rowHead);

            let rowUser = document.createElement("td");
            rowUser.className = "col-4";
            rowUser.innerHTML = "@" + oLeaderboard[sId].user_id.username;
            tableRow.appendChild(rowUser);

            let rowPoints = document.createElement("td");
            rowPoints.className = "col-4";
            rowPoints.innerHTML = oLeaderboard[sId].points + " points";
            tableRow.appendChild(rowPoints);

            tableBody.appendChild(tableRow);
        };
        tableLeaderboard.appendChild(tableBody);
        containerLeaderboard.appendChild(tableLeaderboard);
    } else {
        // Display error no leaderboard found
    }

}