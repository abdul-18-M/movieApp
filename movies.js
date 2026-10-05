const searchForm = document.querySelector("form")
const movieContainer = document.querySelector(".movie-container")
const inputBox = document.querySelector(".input-box")
const clearBtn = document.querySelector(".clear-btn")

inputBox.addEventListener("input", () => {
    if (inputBox.value.trim() !== "") {
        clearBtn.style.display = "block"
    }
    else {
        clearBtn.style.display = "none"
    }
})

const getMovieInfo = async (movie) => {
    try {
        const myApiKey = "YOUR_API_KEY"
        const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Unable to fetch movie data")
        }

        const data = await response.json()

        if (data.Response === "False") {

            showErrorMessage("Movie Not Found!")
            return;
        }

        showMovieData(data)
    }
    catch (error) {
        showErrorMessage("Something went wrong!")
    }
}

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `
                <div class="message">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <h2>${message}</h2>
                    <p>Please try searching for another movie.</p>
                </div>`
}

const showMovieData = (data) => {
    movieContainer.innerHTML = ""
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data

    const movieElement = document.createElement("div")
    movieElement.classList.add("movie-info")
    movieElement.innerHTML = `
            <h2>${Title}</h2>
            <p>
                <strong>Rating ⭐: </strong> ${imdbRating}
            </p>
            <p>
               <strong>Released Date: </strong> ${Released}   
            </p>
            <p>
                <strong>Duration: </strong>${Runtime}
            </p>
            <p>
                <strong>Cast: </strong>${Actors}
            </p>
            <p>
                <strong>Plot: </strong>${Plot}
            </p>`

    const movieGen = document.createElement("div")
    movieGen.classList.add("movie-genre")

    const genreTitle = document.createElement("h3")
    genreTitle.textContent = "Genres"

    movieGen.appendChild(genreTitle)

    Genre.split(",").forEach((ele) => {
        const p = document.createElement("p")
        p.textContent = ele.trim()

        movieGen.appendChild(p)
    })

    movieElement.appendChild(movieGen)

    const moviePoster = document.createElement("div")
    moviePoster.classList.add("movie-poster")
    moviePoster.innerHTML = `
            <img src="${Poster}" alt=${Title} Poster>`

    movieContainer.appendChild(moviePoster)
    movieContainer.appendChild(movieElement)
}

searchForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    const movieName = inputBox.value.trim()

    if (movieName === "") {
        movieContainer.innerHTML = `
                        <div class="message">
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <h2>Enter Movie Name</h2>
                            <p>Please enter a movie name before searching.</p>
                        </div>`
        return;
    }
    getMovieInfo(movieName);
}
)

clearBtn.addEventListener("click", () => {
    inputBox.value = ""
    clearBtn.style.display = "none"
    inputBox.focus()
})
