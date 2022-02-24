import { createTransaction, getCurrentStockValue, getCurrentUser, getStockBalance } from '../data/fetchData.js'
import { navBar } from '../partials/nav.js';

const containerStockTransaction = document.getElementById("transactionBuySell");

export function displayContainerStockTransaction(oUser, oStock, oStockBalance, oStockCurrent) {
    // Clear Container
    containerStockTransaction.innerHTML = "";

    // Display Account
    let elCardAccount = document.createElement("div");
    elCardAccount.className = "card shadow";
    elCardAccount.style = "color: #6610f2!important; height:480px;"

    let elCardAccountTitle = document.createElement("div");
    elCardAccountTitle.className = "card-header lead";
    elCardAccountTitle.style = "border-left:0.25rem solid #6610f2!important;"
    elCardAccountTitle.innerHTML = "<p class='float-left mb-0'>Account Balance</p> <svg class='float-right' xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='currentColor' class='bi bi-currency-euro' viewBox='0 0 16 16'> \
    <path d='M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z'/> \
    </svg>";
    elCardAccount.appendChild(elCardAccountTitle);

    let elCardAccountBody = document.createElement("div");
    elCardAccountBody.className = "card-body";
    if (localStorage.getItem('access')) {
        // if user signed in    
        // -------------------------- Account Balance --------------------------
        // Display Account Balance
        let elAccountBalance = document.createElement("div");
        elAccountBalance.innerHTML = "<p class='mb-0'>Cash Balance</p> \
        <h5 class='text-secondary'>€" + oUser.balance + "</h5>";
        elCardAccountBody.appendChild(elAccountBalance);

        // Display Buy Card
        let formBuy = document.createElement("form");
        
        // Title Buy
        let formTitle = document.createElement("div");
        formTitle.innerHTML = "<hr><p class='mb-0'>Buy Stock (Min €1.00)</p>"
        formBuy.appendChild(formTitle)

        // Input container
        let inputBuy = document.createElement("div");
        inputBuy.className = "input-group mb-3";
        
        // Icon of input
        let inputIcon = document.createElement("span");
        inputIcon.className = "input-group-text text-primary";
        inputIcon.id = "icon-buy";
        inputIcon.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' fill='currentColor' class='bi bi-currency-euro' viewBox='0 0 16 16'> \
        <path d='M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z'/> \
        </svg>"
        inputBuy.appendChild(inputIcon);

        // Input
        let inputBox = document.createElement("input");
        inputBox.className = "form-control";
        inputBox.setAttribute('id', 'Buy');
        inputBox.setAttribute('type', 'number');
        inputBox.setAttribute('placeholder', "0.00");
        inputBox.setAttribute('max', oUser.balance);
        inputBox.setAttribute('min', 1.00);
        inputBox.setAttribute('aria-label', 'Buy');
        inputBox.setAttribute('aria-describedby', 'icon-buy');
        inputBox.setAttribute('step', ".01");
        inputBuy.appendChild(inputBox);
        
        if (oUser.balance < 1.00) {
            // Display disabled buy button with message
            inputBox.setAttribute('disabled', '');
            inputBox.setAttribute('placeholder', "Insufficient Funds");
        }

        // Add input to form
        formBuy.appendChild(inputBuy);


        // Add EventListener for form
        formBuy.addEventListener('submit', function(e) {
            e.preventDefault()
            let data = {
                'user': oUser.id,
                'type': 1,
                'total': document.getElementById("Buy").value,
                'stock_id': oStock.id,
                'stock_price': oStockCurrent['c']
            };
            createTransaction(data).then(bResponse => {
                if (bResponse) {
                    const oStockCurrentPromise = getCurrentStockValue(oStock.ticker);
                    oStockCurrentPromise.then(oStockCurrent => {
                        getCurrentUser().then(oUser => {
                            getStockBalance(oStock.id).then(oStockBalance => {
                                displayContainerStockTransaction(oUser, oStock, oStockBalance, oStockCurrent);
                            })
                        });
                        navBar();
                        alert("Buy Transaction Successful! Your points have been added to the leaderboard! ");
                    });
                };
            });
        });
        elCardAccountBody.appendChild(formBuy)
        // -------------------------- End Account Balance --------------------------

        // -------------------------- Stock Balance --------------------------

        let elStockBalance = document.createElement("div");
        if (oStockBalance[0]) {
            // If user owns this stock Display their Stock Balance and has a total value > 2
            if (Math.floor(oStockBalance[0].quantity * oStockCurrent['c'] * 100)/100 >= 2) {
                elStockBalance.innerHTML = "<hr><p class='mb-0'>Stock Balance</p> \
                <h5 class='text-secondary'> €" + Math.floor(oStockBalance[0].quantity * oStockCurrent['c'] * 100)/100 + "</h5>"
                // ---- Due to issue with rounding this was removed ----
                // <p class='mb-0'>Stock Average Purchase Value</p> \
                // <h5 class='text-secondary'> €" + oStockBalance[0].average_value + "</h5>"
            } else {
                // Due to maths logic error at low decimal don't include avg value
                elStockBalance.innerHTML = "<hr><p class='mb-0'>Stock Balance</p> \
                <h5 class='text-secondary'> €" + Math.floor(oStockBalance[0].quantity * oStockCurrent['c'] * 100)/100 + "</h5>"
                // ---- Due to issue with rounding this was removed ----
                // <p class='mb-0'>Stock Average Purchase Value</p> \
                // <h5 class='text-secondary'> Cannot Calculate</h5>"
            }
        } else { 
            // If user owns this stock Display their Stock Balance
            elStockBalance.innerHTML = "<hr><p class='mb-0'>Stock Balance</p> \
            <h5 class='text-secondary'>No Stock Balance</h5>";
        };
        elCardAccountBody.appendChild(elStockBalance);

        // Display Sell Form
        let formSell = document.createElement("form");
        
        // Title Sell
        formTitle = document.createElement("div");
        formTitle.innerHTML = "<hr><p class='mb-0'>Sell Stock (Min €2.00)</p>"
        formSell.appendChild(formTitle);

        // Input container
        let inputSell = document.createElement("div");
        inputSell.className = "input-group mb-3";
        
        // Icon of input
        inputIcon = document.createElement("span");
        inputIcon.className = "input-group-text text-primary";
        inputIcon.id = "icon-sell";
        inputIcon.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' fill='currentColor' class='bi bi-currency-euro' viewBox='0 0 16 16'> \
        <path d='M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z'/> \
        </svg>"
        inputSell.appendChild(inputIcon);

        // Input
        inputBox = document.createElement("input");
        inputBox.className = "form-control";
        inputBox.setAttribute('id', 'Sell');
        inputBox.setAttribute('type', 'number');
        inputBox.setAttribute('placeholder', "0.00");
        inputBox.setAttribute('min', 2.00);
        inputBox.setAttribute('aria-label', 'Sell');
        inputBox.setAttribute('aria-describedby', 'icon-sell');
        inputBox.setAttribute('step', ".01");
        inputSell.appendChild(inputBox);
        
        if (oStockBalance[0] && oStockBalance[0].total_purchase_value >= 2) {
            inputBox.setAttribute('max', Math.floor(oStockBalance[0].quantity * oStockCurrent['c'] * 100)/100);
        } else {
            // Display disabled buy button with message
            inputBox.setAttribute('disabled', '');
            inputBox.setAttribute('placeholder', "Insufficient Stocks");
        }

        // Add input to form
        formSell.appendChild(inputSell);


        // Add EventListener for form
        formSell.addEventListener('submit', function(e) {
            e.preventDefault();
            let data = {
                'user': oUser.id,
                'type': 3,
                'total': document.getElementById("Sell").value,
                'stock_id': oStock.id,
                'stock_price': oStockCurrent['c']
            };

            createTransaction(data).then(bResponse => {
                if (bResponse) {
                    const oStockCurrentPromise = getCurrentStockValue(oStock.ticker);
                    oStockCurrentPromise.then(oStockCurrent => {
                        getCurrentUser().then(oUser => {
                            getStockBalance(oStock.id).then(oStockBalance => {
                                displayContainerStockTransaction(oUser, oStock, oStockBalance, oStockCurrent);
                            })
                        });
                        navBar();
                        alert("Sell Transaction Successful! Your points have been added to the leaderboard!");
                    });
                };
            });
        });
        elCardAccountBody.appendChild(formSell)
    } else {
        // Please Sign In Box
    };
    elCardAccount.appendChild(elCardAccountBody);
    // -------------------------- End Stock Balance --------------------------

    containerStockTransaction.appendChild(elCardAccount);
}