
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    $greeting.text('So, you want ot visit '+ address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=1200x720&location=' + address + '';
    $body.append('<img class="bgimg" src=" '+ streetviewUrl + '">');

    // YOUR CODE GOES HERE! NYTimes

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=202afa73c8bb09340e53c42de03600d8:16:70196210';
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About' + city);

        articles = data.response.docs;
        for (var i=0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class = "article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>'+ article.snippet + '</p>'+
                '</li>');
        };
    }).error(function(e){
            $nytHeaderElem.text('New York Times Articles couuld not be loaded');
    });

    // YOUR CODE GOES HERE! WIKI
    var wikiUrl = 'http://en.kipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources.");
    }, 5000);

    $.ajax({
        url:wikiUrl,
        dataType: "jsonp",
        success: function( response ){
            var articleList = response[1];
            for (var i=0;i<articleList.length; i++){
                article = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + article;
                $wikiElem.append('<li><a href="' + url + '">' + article + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);

        }
    }); 


    return false;
};

$('#form-container').submit(loadData);

// loadData();
