  var shows = ["The Office", "Parks and Recreation", "Orange is the New Black", "Dexter", "Breaking Bad", "Gossip Girl", "That 70s Show"];	

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayShowInfo() {
    // apiKey = "kJR77B2ujy4wj3mBj7sFA2PhIZgT0Tka"
    console.log("hello")
    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kJR77B2ujy4wj3mBj7sFA2PhIZgT0Tka&q=" + show + "&limit=25&offset=0&rating=G&lang=en"

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


      for(var i=0; i<response.data.length; i++){
        var image=$('<img src = '+ response.data[i].images.original.url +'>')
      $("#show-view").append(image)
      }

      // var image=$('<img src = '+ response.data[0].images.original.url +'>')
      // $("#show-view").append(image)
      
      // Creating a div to hold the movie
      var showDiv = $("<div class='show'>");

      // Storing the rating data
      var rating = response.Rated;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Rating: " + rating);

      // Displaying the rating
      showDiv.append(pOne);

      // Storing the release year
      var released = response.Released;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + released);

      // Displaying the release year
      showDiv.append(pTwo);

      // Storing the plot
      var plot = response.Plot;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Plot: " + plot);

      // Appending the plot
      showDiv.append(pThree);

      // Retrieving the URL for the image
      var imgURL = response.Poster;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      showDiv.append(image);

      // Putting the entire movie above the previous movies
      $("#shows-view").prepend(showDiv);
    });

  }

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < shows.length; i++) {

      // Then dynamicaly generating buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("movie-btn");
      // Adding a data-attribute
      a.attr("data-name", shows[i]);
      // Providing the initial button text
      a.text(shows[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where a movie button is clicked
  $("#add-show").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var show = $("#movie-input").val().trim();

    // Adding movie from the textbox to our array
    shows.push(show);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayShowInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

