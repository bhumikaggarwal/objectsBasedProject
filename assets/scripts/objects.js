"use strict"
const addMovieButton = document.getElementById("add-movie-btn");
const searchMovieButton = document.getElementById("search-btn");
const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => 
        movie.info.title.includes(filter)
      );

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("Li");
    const {info , ...otherProps} = movie ;
    console.log(otherProps);
    // const {title: movieTitle} = info ;
    let {getFormattedTitle} = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + "-";               //let text = getFormattedTitle.apply(movie, []) whereas call take argument as infinite list
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if(val.trim() === ''){
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
       
      },
      get title(){
        return this._title ;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      console.log(this);
      return this.info.title.toUpperCase();
    }
  };
  movies.push(newMovie);
  renderMovies();
};
newMovie.info.title = title ;
console.log(newMovie.info.title);

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};
addMovieButton.addEventListener("click", addMovieHandler);
searchMovieButton.addEventListener("click", searchMovieHandler);
