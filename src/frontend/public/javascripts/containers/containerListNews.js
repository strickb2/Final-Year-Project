let containerListNews = document.getElementById("listNews");

export function displayContainerListNews(oData) {
  containerListNews.innerHTML = "";
    let cardListNews = document.createElement("div");
    cardListNews.className = "card shadow";
      
    // Card Header
    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header lead text-warning";
    cardHeader.style = "border-left: .25rem solid #ffc107!important;"
    cardHeader.innerHTML = "<p class='float-left mb-0'>Top News</p><svg class='float-right' xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' class='bi bi-newspaper' viewBox='0 0 16 16'> \
    <path d='M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z'/> \
    <path d='M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z'/> \
    </svg>";
    cardListNews.appendChild(cardHeader)
      
    // Card Body
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    if (oData['status'] === "ok") {
      oData = oData.articles;
      for (let idArticle in oData) {
        let oArticle = oData[idArticle];
        
        // Article Card
        let elArticleCard = document.createElement("div");
        elArticleCard.className = "card p-2 mb-3";
        elArticleCard.style = "border-left: .25rem solid #ffc107!important;"

        let elArticleCardLink = document.createElement("a");
        elArticleCardLink.className = "card-block stretched-link text-dark";
        elArticleCardLink.style = "text-decoration: none;";
        elArticleCardLink.href = oArticle.url;
        elArticleCard.appendChild(elArticleCardLink);

        // Article Card Row
        let elArticleRow = document.createElement("div");
        elArticleRow.className = "row position-relative justify-content-left";
        elArticleCardLink.appendChild(elArticleRow);

        // Article Image left
        let elArticleImage = document.createElement("div");
        elArticleImage.className = "col-3";
        elArticleImage.innerHTML = "<img class='img-fluid rounded-start' style='height:150px; width:100%'  src='" + oArticle.urlToImage + "'></img>";
        elArticleRow.appendChild(elArticleImage)

        // Article Content middle to right
        let elArticleContent = document.createElement("div");
        elArticleContent.className = "col-9";

        // Article Content Title
        let dt = new Date(oArticle.publishedAt)
        let elArticleContentTitle = document.createElement("div");
        elArticleContentTitle.className = "d-flex justify-content-between";
        elArticleContentTitle.innerHTML = "<h6>" + oArticle.title + "</h6>  \
        <small class='text-muted'><i>" + dt.toDateString()  + "</i></small>";
        elArticleContent.appendChild(elArticleContentTitle);

        let elArticleContentBody = document.createElement("div");
        elArticleContentBody.className = "d-flex justify-content-left";
        elArticleContentBody.innerHTML = "<p class='fs-4'>" + oArticle.description + "</p>";
        elArticleContent.appendChild(elArticleContentBody);

        elArticleRow.appendChild(elArticleContent);

        cardBody.append(elArticleCard);
      };
    } else {
      cardBody.innerHTML = "<p class='text-warning mb-0'> " + oData['error'] + "</p>";
    };
    cardListNews.appendChild(cardBody);
    containerListNews.appendChild(cardListNews);
  };