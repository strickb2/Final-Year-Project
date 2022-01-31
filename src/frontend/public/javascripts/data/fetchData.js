export async function fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function fetchAuthenticatedData(url) {
    let sToken = localStorage.getItem('access');
    let reponse = await fetch(url, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sToken,
        },
    });
    let data = await reponse.json();
    return data;
}

export async function fetchPOSTTransactionData(url, data) {
    let sToken = localStorage.getItem('access');
    if (data['stock_id']) {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sToken,
            },
            mode: 'cors',
            body: JSON.stringify({
                user_id: data['user'],
                type: data['type'],
                total: data['total'],
                stock: {
                    stock_id: data['stock_id'],
                    stock_price: data['stock_price']
                }
            })
        });
        if (response.status >= 199 && response.status <= 299) {
            return true
        } else {
            alert("An Error Occurred")
            return false
        }
    } else {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sToken,
            },
            mode: 'cors',
            body: JSON.stringify({
                user_id: data['user'],
                type: data['type'],
                total: data['total'],
            })
        });
        return response
    }
}

// All or Specified General Stock Data
export function getStockData(id=null) {
    if (id === null) {
        return fetchData("http://127.0.0.1:8000/stocks/general/");
    } else {
        return fetchData("http://127.0.0.1:8000/stocks/general/?stock_id=" + id);
    };
};

// Finnhub values for specific stock
export function getCurrentStockValue(sTicker) {
    return fetchData("http://127.0.0.1:8000/api/finnhub/currentvalue/?ticker=" + sTicker);
};

// Google news articles for given query
export function getNewsArticles(query) {
    return fetchData("http://127.0.0.1:8000/api/googlenews/articles/?query=" + query);
};

export function getCurrentUser() {
    return fetchAuthenticatedData("http://127.0.0.1:8000/users/current/");
};

export function getStockBalance(stockId=null) {
    if (stockId === null) {
        return fetchAuthenticatedData("http://127.0.0.1:8000/user/stockbalance/");
    } else {
        return fetchAuthenticatedData("http://127.0.0.1:8000/user/stockbalance/?stock_id=" + stockId);
    }
}

export function createTransaction(data) {
    if (data) {
        return fetchPOSTTransactionData("http://127.0.0.1:8000/transactions/create/", data);
    }
}

export function getTimeSeries(sTicker) {
    return fetchData("http://127.0.0.1:8000/api/alphavantage/timeseries/?ticker=" + sTicker)
}