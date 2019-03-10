// *** Figure out how to add each feature on your own. Try at least to implement it, get as far as you can. ***.

const itunes = new ITUNES;
const lyrics = new LYRICS;
const ui = new UI;
const youtube = new YOUTUBE;

let optionMovie = document.getElementById('option-movie');
let optionMusic = document.getElementById('option-music');
let searchInput = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');
let searchCategoryList = document.getElementById('search-category-list');
let resultsContainer = document.querySelector('.results-container');
let removeButton = document.getElementById('remove-all-results-button');
let modal = document.querySelector('.modal');
let body = document.querySelector('body');
let siteContainer = document.querySelector('.site-container');

//Event Listener - 
searchCategoryList.addEventListener('change', function (event) {
    if (searchCategoryList.value === 'Music') {
        searchInput.setAttribute('placeholder', 'Artist, Genre, Song, or Album');
    } else if (searchCategoryList.value === 'Movie') {
        searchInput.setAttribute('placeholder', 'Director, Genre, Actor, Year, or Movie Title');
    }
}) //end searchCategory Event Listener

//Event Listener - Add Search Result To The Page When The Search Button is Clicked
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (searchCategoryList.value === 'Pick A Category' || searchInput.value === '') {
        ui.displayError('#dc3545', 'Please Fill Out All Fields');
        window.setTimeout(() => {
            ui.clearError();
        }, 3000)
    } else {
        if (searchCategoryList.value === 'Music') {
            ui.displayLoadingAnimation();
            itunes.searchMusic(searchInput.value).then(function (data) {
                ui.removeLoadingAnimation()
                ui.postMusicResults(data);
                searchInput.value = '';
            }).catch((error) => {
                ui.displayError('#dc3545', 'Invalid Search Term');
                window.setTimeout(() => {
                    ui.clearError();
                }, 3000)
            })
        } else if (searchCategoryList.value === 'Movie') {
            itunes.searchMovie(searchInput.value).then(function (data) {
                ui.postMovieResults(data);
                searchInput.value = '';
            })
        }
    }
}) //end searchButton event listener

//Event Listener - Remove An Item When The 'X' Icon is clicked
resultsContainer.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.className === 'btn btn-default remove-card' || event.target.className === 'glyphicon glyphicon-remove remove-item') {
        event.target.parentElement.parentElement.parentElement.remove();
    }
})

//Event Listener - Remove All Search Results
removeButton.addEventListener('click', function (event) {
    event.preventDefault();
    //If the results container, which houses all of the search results, has any search results inside of it, then remove each child one by one
    if (resultsContainer.children.length > 0) {
        for (let x = 0; x < resultsContainer.children.length; x++) {
            resultsContainer.children[x].remove();
        }
    }
    // If there aren't any search results , then display an error, then 3 seconds later,  remove it
    else {
        ui.displayError('#dc3545', 'No Search Results Available');
        window.setTimeout(() => {
            ui.clearError();
        }, 3000);
    }
})

//Event Listener - Remove A Particular Search Result
resultsContainer.addEventListener('click', function (event) {
    event.preventDefault();
    //Each search result container has a button. If the button is clicked, then remove the parent of that button, which is the search result container itself, for that particular search result
    if (event.target.className === 'remove-search-result btn btn-danger mt-3') {
        event.target.parentElement.remove();
    }
})


//Event Listener - Launch A Modal That Contains The Lyrics To The Song, When The User Clicks To View The Lyrics From A Song
resultsContainer.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.className === 'view-song-lyric') {
        //Get The Song Title
        let songTitle = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        //Full Artist Name With The Dash
        let fullArtistName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        //Find The Character Index Of The Dash In The Artist Name String
        let indexOfHyphen = fullArtistName.indexOf('-');

        //Grab The Characters After The Dash, and trim the whitespace before the beginning of the artist name. This will result in just the artist Name
        let artistName = fullArtistName.slice(indexOfHyphen + 1, fullArtistName.length).trim();


        // First it will display the loading animation, then once the promise is resolved, (the API returns a result), the loading animation will be removed, and the modal with the lyrics on the screen will be dislayed

        ui.displayLoadingAnimation();

        lyrics.lyricSeed(artistName, songTitle).then(function (response) {
            ui.appendDataToModal(response, songTitle);
            ui.removeLoadingAnimation();
            ui.toggleModal();

            //Also perform a get request from the youtube API, in order to get the id of the video
            youtube.searchYoutube(`${songTitle} ${artistName}`).then(function (response) {
                //When successful, add an event listener to the play song button that is in the modal.
                document.querySelector('.modal-play-song').addEventListener('click', function (event) {
                    //When the 'play song' button inside the modal is clicked, call a function that accepts a video ID as a parameter, and it will display a mini youtube player, that contains the audio of the song
                    //Instead of getting the first result, I am grabbing the second result, because it's likely that the first result is a music video, which can be much longer than the actual song. The second result is more likely to be just the song.
                    ui.createMiniYTPlayer(response.ytResults[1].id.videoId);
                })
            })
        }).catch(function (error) {
            ui.removeLoadingAnimation();
            ui.displayErrorModal(`${error}`);
            ui.toggleModal();

            //Also perform a get request from the youtube API, in order to get the id of the video
            youtube.searchYoutube(`${songTitle} ${artistName}`).then(function (response) {
                //When successful, add an event listener to the play song button that is in the modal.
                document.querySelector('.modal-play-song').addEventListener('click', function (event) {
                    //When the 'play song' button inside the modal is clicked, call a function that accepts a video ID as a parameter, and it will display a mini youtube player, that contains the audio of the song
                    //I am grabbing the very first result here, because it is likely that this isn't a well known song
                    ui.createMiniYTPlayer(response.ytResults[0].id.videoId);
                })
            })
        }) //end catch
    } //end if
}) //end searchLyric Listener


//Event - Launch A Modal That Contains The Video Iframe To The Song
resultsContainer.addEventListener('click', function (event) {
    if (event.target.className === 'view-song-video') {
        //Get The Song Title
        let songTitle = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        //Full Artist Name With The Dash
        let fullArtistName = event.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        //Find The Character Index Of The Dash In The Artist Name String
        let indexOfHyphen = fullArtistName.indexOf('-');

        //Grab The Characters After The Dash, and trim the whitespace before the beginning of the artist name. This will result in just the artist Name
        let artistName = fullArtistName.slice(indexOfHyphen + 1, fullArtistName.length).trim();


        // First it will display the loading animation, then once the promise is resolved, (the API returns a result), the loading animation will be removed, and the modal with the lyrics on the screen will be dislayed
        ui.displayLoadingAnimation();

        youtube.searchYoutube(`${songTitle} ${artistName}`).then(function (data) {
            ui.removeLoadingAnimation();

            //Inside The CreateIFrame Method, I already appended the Iframe To the iframe-container that is inside the modal, in the html file. So i don't have to call appendDataModal, I can just display the modal
            ui.createIframe(data.ytResults[0].id.videoId);
            ui.toggleModal();
        }).catch(function (error) {
            ui.removeLoadingAnimation();
            ui.displayErrorModal('Video Not Found');
            ui.toggleModal();

        })
    }
})


/*Event Listener - Close Modal */
document.querySelector('.close-modal').addEventListener('click', function (event) {
    event.preventDefault();
    ui.toggleModal();
})






/*
@media only screen and (max-width: 600px)  {...}
What this query really means, is "If [device width] is less than or equal to 600px, then do {...}"

So if the email is opened on an iPhone 5S, with a screen width of 320px, the media query will trigger and all of the styles contained in { ... } will take effect.

Min-Width

Here is an example of a min-width query.

@media only screen and (min-width: 600px)  {...}
What this query really means, is "If [device width] is greater than or equal to 600px, then do {...}"

So if the email is opened on an iPhone 5S, with a screen width of 320px, the media query will not trigger and the styles contained in { ... } will not take effect. */

/* GENIUS
Client ID - 
M5RiqxcQ3TgpTzDqVqYZ-Xn6IDOY-l009l03Gi257gly39PkDDutugbZHvywG1JR

Client Secret - 
uaIU_Od9kRBE7RsJPdI8vA8mhNiti31QXFXTSnSHga8-uqdm3RtERm6ONNs09eYDpeco7Cb1VcsMhiCTnvH2CA

Client Access Token -
QoAX0WjaxbUnONkdtVfchBTJONWw8ZMp-Xp4iHoBDtAno_xpBpiwPsPV5aLWj-Pb
*/

/* Musixmatch Lyrics API - Gives Free 2k API CALLS
Link - 
https://developer.musixmatch.com/documentation
API KEY - 60e87e6dffd3b7a828299c53b3beecae

API Seeds -Lyric API - Over 1 million song records
Get - https://orion.apiseeds.com/api/music/lyric/:artist/:track
Link - 
https://apiseeds.com/documentation/lyrics
API Key - 2jOZP3YkUXH5D12s13Cbj48KVb4Vbm1eO8fkWyBz2t3QrbkvwIH5C6M05FhVgMPZ
*/



/*
List Of Song Lyric APIS
https://www.programmableweb.com/category/lyrics/api

7 Best Song Lyric APIs
https://rapidapi.com/collection/lyrics-apis
    - Figure out how to use the musix match api using that test playground in the link
*/


/* YOUTUBE API KEY
AIzaSyC_swvvoLmXpzb867umALBdwXgNhrUJgUQ

*/
// https://requirejs.org/docs/api.html#jsfiles
// https://requirejs.org/docs/node.html