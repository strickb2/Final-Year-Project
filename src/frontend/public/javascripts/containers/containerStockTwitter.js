import { getTweetsStock, getTweetSentimentStock } from "../data/fetchData.js";

const containerStockTwitter = document.getElementById("twitterFeed");

export function displayContainerStockTwitter(twitter_handle) {
    containerStockTwitter.innerHTML = "";

    // Card Twitter
    let cardTwitter = document.createElement("div");
    cardTwitter.className = "card shadow";
    cardTwitter.style = "color: #1266F1!important;";

    // Card Header + Sentiment Emoji + Percent Sentiment
    let oPromiseSentiment = getTweetSentimentStock(twitter_handle);
    let elCardHeader = document.createElement("div");
    elCardHeader.className = "card-header lead";
    elCardHeader.style = "border-left:0.25rem solid #1266F1!important;"
    elCardHeader.innerHTML = "<div class='float-left'><svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='currentColor' class='bi bi-twitter mr-2 float-left' viewBox='0 0 16 16'> \
    <path d='M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z'/> \
    </svg>\
    <p class='mb-0 float-left'>Twitter</p>\
    </div>" 

    oPromiseSentiment.then(oSentiment => {
        if (oSentiment.sentiment === "pos") {
            elCardHeader.innerHTML += "<p class='mb-0 ml-1 float-right text-success'>  " + oSentiment.percent + "%</p>\
            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='currentColor' class='bi bi-emoji-sunglasses-fill text-success float-right' viewBox='0 0 16 16'> \
            <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.22 4.22 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A2.99 2.99 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515L2.31 5.243zM4.969 9.75A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z'/> \
            </svg>"
        } else if (oSentiment.sentiment === "neg") {
            elCardHeader.innerHTML += "<p class='mb-0 ml-1 float-right text-danger'>  " + oSentiment.percent + "%</p>\
            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='currentColor' class='bi bi-emoji-frown-fill text-danger float-right' viewBox='0 0 16 16'> \
            <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm-2.715 5.933a.5.5 0 0 1-.183-.683A4.498 4.498 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.498 3.498 0 0 0 8 10.5a3.498 3.498 0 0 0-3.032 1.75.5.5 0 0 1-.683.183zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z'/> \
            </svg>"
        } else {
            elCardHeader.innerHTML += "<p class='mb-0 ml-1 float-right text-warning'>  " + oSentiment.percent + "%</p>\
            <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='currentColor' class='bi bi-emoji-expressionless-fill text-warning float-right' viewBox='0 0 16 16'> \
            <path d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM4.5 6h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm5 0h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm-5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1z'/> \
            </svg>"
        };
    });
    
    cardTwitter.appendChild(elCardHeader);

    // Card Body + Individual tweets
    let elCardBody = document.createElement("div");
    elCardBody.className = "card-body overflow-auto";
    elCardBody.style = "max-height: 560px"
    let oPromiseTwitterFeed = getTweetsStock(twitter_handle);
    oPromiseTwitterFeed.then(oTwitterFeed => {
        for (let sIdTweet in oTwitterFeed) {
            // Format date was made
            let dt = new Date(oTwitterFeed[sIdTweet].created_at);
            
            // Create card with text
            let cardTweet = document.createElement("div");
            cardTweet.className = "card p-2 mb-3 justify-content-between";
            cardTweet.style = "border-left:0.25rem solid #1266F1!important;";
            cardTweet.innerHTML = "<div class='d-flex justify-content-between'><p style='font-size: 0.9rem' class='mb-0'>" + twitter_handle + "</p><p style='font-size: 0.8rem' class='text-muted mb-0'>" + dt.toDateString() + "</p></div><div class='d-flex justify-content-left'><p class='text-dark' style='font-size: 0.8rem'>" + oTwitterFeed[sIdTweet].text + "</p></div>";

            // Add Card to Twitter card body
            elCardBody.appendChild(cardTweet);
        }
        // Add Card Body to Twitter Card
        cardTwitter.appendChild(elCardBody);
    });

    // Add Twitter Card to container
    containerStockTwitter.appendChild(cardTwitter);
}