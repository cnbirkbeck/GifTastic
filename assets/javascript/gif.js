// document .ready to start the functions after the DOM is ready
$(document).ready(function(){
    //Variables needed for gifs
    var topics = ["Belle", "Beast", "Gaston", "Russell", "Carl Fredricksen", "Emperor Kuzco", "Simba", "Maleficent", "Wreck It Ralph", "Vanellope Von Schweetz", "Sadness", "Winnie the Pooh", "Mary Poppins", "Captain Hook", "Judy Hopps", "Ursula"];
    // setting up music 
    const theme = new Audio ("assets/Disney Songs Mashup.mp3");
    // setting music to not play at start
    var musicPlaying = false;
    var results;

    // To see key for later in code
    //var giphyURL = "https://api.giphy.com/v1/gifs/trending?api_key=SCFTkvR3txLJ9ux4FL5opLJUZERJRjHF";

    //With Music Function
    $("#musicBtn").on( "click", function(){
        if(musicPlaying===false){
            theme.play();
            musicPlaying = true;
        }
        else{
            theme.pause();
            musicPlaying = false;
        }
    });

    //Create Buttons and Add On Click Function

    function createBtns(){
        $("#disneyBtns").empty();

        for (i=0; i< topics.length; i++){
            var btn = $("<button>");
            btn.addClass("character-btn");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);

            $("#disneyBtns").append(btn);
        };
    };

    $("#add-character").on("click", function(event){

        event.preventDefault();

        var character = $("#disney-input").val().trim();

        topics.push(character);
        $("#disney-input").val("");

        createBtns();

        console.log(topics);
    });
    // call createBtn function to ensure buttons are available to user 
    createBtns();
    //Function for adding Giphy Content
    function dataPull(){
        var characterName= $(this).attr("data-name");
        var characterStr = characterName.split(" ").join("+");
        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + characterStr + "&api_key=SCFTkvR3txLJ9ux4FL5opLJUZERJRjHF&limit=10";

        $.ajax({
            url: giphyURL,
            method:"GET"
        }).done(function(response){
            //console log to test
            console.log(giphyURL);
            console.log(response);

            results= response.data;

            $("#gifs").empty;

            for (var i=0; i < results.length; i++){
                var characterDiv = $("<div>");
                var para = $("<p class = 'rating'>").text("Rating: " + results[i].rating);
                var characterImg = $("<img>");

                para.addClass("rating-text")

                characterImg.addClass("image-gifs")
                    characterImg.attr("src", results[i].images.fixed_height_still.url);
                    characterImg.attr("data-state","still");
                characterImg.attr("data-position", i);
                
                    characterDiv.append(para);
                characterDiv.append(characterImg);
                characterDiv.addClass("individual-gifs")
                
                $("#gifs").prepend(characterDiv);
            };
        });
    };

    //Using document on Click function to apply the function for the elements after the page has loaded

    $(document).on("click",".character-btn", dataPull);

        //Animating the Gifs
        function gifAnimate(){
            var state = $(this).attr("data-state");
            var position = $(this).attr("data-position"); // should return a string
            position = parseInt(position); // string to integer

            console.log(results[position].images.fixed_height.url);
            console.log(position);

            if(state === "still"){
                console.log("here");
                $(this).attr("src", results[position].images.fixed_height.url);
                $(this).attr("data-state", "animate");
            } else{
                $(this).attr("src", results[position].images.fixed_height_still.url);
                $(this).attr("data-state", "still");
            }
        };

    $(document).on("click", ".image-gifs", gifAnimate);
});    
