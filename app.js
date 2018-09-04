(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    const searchedForText = 'flawer';
	const unsplashRequest = new XMLHttpRequest();

	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
	unsplashRequest.onload = addImage;
	unsplashRequest.setRequestHeader('Authorization', 'Client-ID 6b0f9a78e85c615cda70d2e051b990e6d1fda670d1594804e8c871aa332e0974');
	unsplashRequest.send();

	function addImage(){
		let htmlContent = '';
	     const data = JSON.parse(this.responseText);
	     if(data && data.results && data.results[0]){
	     const firstImage = data.results[0];

	     htmlContent = `<figure>
	         <img src="${firstImage.urls.regular}" alt="${searchedForText}">
	         <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
	     </figure>`}
	     else{
	     	htmlContent = '<div class="No-image-error">No image available</div>';
	     }

	     responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

	const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=6d606b4ea1c649d898d6017d75822013`);
	articleRequest.send();

	function addArticles () {
		let htmlContent = '';
	     const data = JSON.parse(this.responseText);
	     if(data.response && data.response.docs && data.response.docs.length>1){
	     htmlContent = '<ul>'+ data.response.docs.map(article =>`<li class="article">
	     	<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p> 
	     	</li>`).join('') +'</ul>';
	     }
	     else{
	     	htmlContent = '<div class="error-no-article">No article available</div>';
	     }

	     responseContainer.insertAdjacentHTML('beforeend', htmlContent);
	}

})();
