  var shows = ["The Office", "Parks and Recreation", "Orange is the New Black", "Dexter", "Breaking Bad", "Gossip Girl", "That 70s Show"];	

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayShowInfo() {
    // apiKey = "kJR77B2ujy4wj3mBj7sFA2PhIZgT0Tka"
    console.log("hello")
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kJR77B2ujy4wj3mBj7sFA2PhIZgT0Tka&q=" + show + "&limit=10&offset=0&rating=G&lang=en" 

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      console.log(response.data)
      console.log(response.data[0])
      console.log(response.data[0].images)
      console.log(response.data[0].images.original)
      console.log(response.data[0].images.original.url)
      console.log(response.data[0].rating)
      
      var results= response.data;
      for(var i=0; i<results.length; i++){
      
        var showDiv = $("<div class='show'>");
        var rating = results[i].rating;
        var pOne = $("<p>").text("Rating: " + rating);
        var image = $("<img>")
    
        
        image.addClass("gif");
        image.attr("src", results[i].images.original_still.url);
        image.attr("data-state", "still");
        image.attr("data-still", results[i].images.original_still.url);
        image.attr("data-animate", results[i].images.original.url);

        showDiv.append(image);
        showDiv.append('<a href="' + results[i].images.original.url + '" target="_blank"');
        showDiv.append('<br>');
        showDiv.append(pOne);

        $("#show-view").prepend(showDiv);
        }
      });

  }
    $(document).on("click", '.gif', function() {
      event.stopPropagation();
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#show-view").empty();

    // Looping through the array of movies
    for (var j = 0; j < shows.length; j++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("show-btn");
      // Adding a data-attribute
      a.attr("data-name", shows[j]);
      // Providing the initial button text
      a.text(shows[j]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-show").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var show = $("#show-input").val().trim();

    // Adding movie from the textbox to our array
    shows.push(show);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".show-btn", displayShowInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

