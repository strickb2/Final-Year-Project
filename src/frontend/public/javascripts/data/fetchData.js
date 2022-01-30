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
    return fetchAuthenticatedData("http://127.0.0.1:8000/users/")
}