
function displayQuotes(){
    let quoteGrid = document.getElementById('quote-grid');
    let quoteHeader = quoteGrid.querySelector("h3");
    let quoteAuthor = quoteGrid.querySelector("p").querySelector("span");
    let likesdiv = document.querySelector("#likes")
    let likesButton = document.querySelector("#likes-button");
    let likesNumber = document.querySelector("#counter");
    let comment = document.querySelector("#comment");
    let commentButton = comment.querySelector("button");
    let hiddenComment = comment.querySelector("#comment-quote");
    let commentList = comment.querySelector("ul")
    let searchBar = document.querySelector("#search-author")
    let nextQuote = document.querySelector("#next-quote")
    
    fetch("https://type.fit/api/quotes")
    .then(re=>{
        if (re.ok){
            return re.json()
        }
    })
    .then(function(quotesData){
            let randomIndex = Math.floor(Math.random() * quotesData.length)
            quoteHeader.textContent = quotesData[randomIndex].text
            quoteAuthor.textContent = quotesData[randomIndex].author.split(",")[0]
            searchAuthor(quotesData)
            showNextQuote(quotesData)
    })
    .catch(error => console.log(error.message))

    //increase like counter
    function increaseLikes(){
        likesButton.addEventListener("click", function(){
            likesNumber.textContent = parseInt(likesNumber.textContent) + 1;
        })
    }
    increaseLikes()
    function publishComment(){
        commentButton.addEventListener("click", function(){
            hiddenComment.style.display = "block";
            hiddenComment.addEventListener("keydown", function(event){
                if (event.keyCode===13){
                    event.preventDefault()
                    if (hiddenComment.value ===""){
                        alert("Enter some relevant comment")
                    }
                    else{
                        let myComment = document.createElement("li")
                        myComment.textContent = hiddenComment.value;
                        commentList.appendChild(myComment);
                        hiddenComment.value = "";
                    }
                    

                }
            })
        })
    }
    publishComment()

    //searching quote by author
    function searchAuthor(famousQuotes){
        searchBar.addEventListener("input", function(){
            let quoteArray = [];
            famousQuotes.forEach(function(ele){
                if(ele.author.toLowerCase().includes(searchBar.value.toLowerCase())){
                    quoteArray.push(ele)

                }
            })
            let ranIndex = Math.floor(Math.random() * quoteArray.length)
            quoteHeader.textContent = quoteArray[ranIndex].text
            quoteAuthor.textContent = quoteArray[ranIndex].author.split(",")[0]
            
        
        })
    }
    //searchAuthor()

    // show next quote
    function showNextQuote(nextArray){
        nextQuote.addEventListener("click", function(){
            let randomIndex = Math.floor(Math.random() * nextArray.length);
            quoteHeader.textContent = nextArray[randomIndex].text;
            quoteAuthor.textContent = nextArray[randomIndex].author.split(",")[0];
            comment.querySelector("ul").innerHTML = "";
            likesNumber.textContent = 0;
        })
    }
    //showNextQuote()
}

document.addEventListener("DOMContentLoaded", displayQuotes)