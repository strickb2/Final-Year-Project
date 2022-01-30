let containerListNews = document.getElementById("listNews");

export function displayContainerListNews(oData) {
    let cardListNews = document.createElement("div");
    cardListNews.className = "card shadow";
      
    // Card Header
    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header font-weight-bold text-warning";
    cardHeader.innerHTML = "Top News";
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
        elArticleImage.innerHTML = "<img class='img-fluid rounded-start' style='height:100%' src='" + oArticle.urlToImage + "'></img>";
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
      cardBody.innerHTML = "<h6 class='text-warning'> " + oData['error'] + "</h6>";
    };
    cardListNews.appendChild(cardBody);
    containerListNews.appendChild(cardListNews);
  };