// 3 - When a person enters a search, the page should go directly to the search results, the top.
// 4 - if a person enters a search value, that they have already entered before, show a message. (Don't know how I would do this)
// 5 - 

class UI {
    postMusicResults(responseData) {
        //Container For The Search Result For That Particular Search
        let searchResult = document.createElement('div');
        searchResult.className = 'search-result container-fluid mt-5';
        searchResult.setAttribute('id', `search-result-${document.getElementById('search-input').value.trim()}`);
        searchResult.style.borderTop = 'solid 3px gray';

        //Assigning An In Page Name to the search result container, so that we can go to it when the button is clicked
        searchResult.setAttribute('name', `search-result-${document.getElementById('search-input').value.trim()}`);

        //Assign the search button an href of the search result so that when the button is clicked, it'll go straight to the search result
        document.getElementById('search-button').setAttribute('href', `#search-result-${document.getElementById('search-input').value.trim()}`);

        //if a person enters a search value, that they have already entered before, show a message. Or don't post more results

        //Give The Search Result A Name On The Page
        let searchResultName = document.createElement('h4');
        searchResultName.appendChild(document.createTextNode(document.getElementById('search-input').value.toUpperCase()));
        searchResultName.style.display = 'inline';
        searchResult.appendChild(searchResultName);

        //Create A BootStrap Row
        let divRow = document.createElement('div');
        divRow.className = 'row';

        //Create A Button That Will Allow For The User To Remove Those Search Results
        let removeSearchResult = document.createElement('button');
        removeSearchResult.className = 'remove-search-result btn btn-danger mt-3';
        removeSearchResult.setAttribute('type', 'button');
        removeSearchResult.setAttribute('id', `search-result-button-${document.getElementById('search-input').value.trim()}`);
        removeSearchResult.appendChild(document.createTextNode('Remove These Results'));
        removeSearchResult.style.margin = '15px 0px 15px 15px';
        searchResult.appendChild(removeSearchResult, divRow);

        //Create An Array That Will Hold All Of The Card Containers
        let resultsArray = [];

        //At Each Iteration of our loop, create a column and a card displaying the details of the song, or artist
        for (let x = 0; x < responseData.results.length; x++) {

            //Create The BootStrap Column Wrapper
            let divColumn = document.createElement('div');
            divColumn.className = 'col-md-6 card-column'; //each column will take up 6 spaces, hence 2 columns because the max is 12

            //Create The Card Container
            let card = document.createElement('div');
            card.className = 'card mb-3';

            //Create The Image Container and The 'X' Glyhpicon
            let cardImgContainer = document.createElement('div');
            cardImgContainer.className = 'card-image-container';
            let cardImg = document.createElement('img');
            cardImg.className = 'card-img-top';
            cardImg.setAttribute('src', `${responseData.results[x].artworkUrl100}`);

            //Creating The X Button Delete Glyphicon
            let removeButton = document.createElement('button');
            removeButton.setAttribute('type', 'button');
            removeButton.setAttribute('aria-label', 'Right Align');
            removeButton.className = 'btn btn-default remove-card';
            let deleteIcon = document.createElement('span');
            deleteIcon.className = 'glyphicon glyphicon-remove remove-item';
            deleteIcon.setAttribute('aria-hidden', 'true');
            deleteIcon.appendChild(document.createTextNode('X'));
            removeButton.appendChild(deleteIcon);

            //Append The Delete Icon and the Card Image To The Image Container
            cardImgContainer.appendChild(removeButton);
            cardImgContainer.appendChild(cardImg);

            //Create The Card Body
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            //Card Body Title and Artist Name
            let cardBodyTitle = document.createElement('h5');
            cardBodyTitle.className = 'card-title';
            cardBodyTitle.appendChild(document.createTextNode(`${responseData.results[x].trackCensoredName}`));
            let cardBodyArtistName = document.createElement('h5');
            cardBodyArtistName.className = 'card-title card-title-artist-name';
            cardBodyArtistName.appendChild(document.createTextNode(`Artist - ${responseData.results[x].artistName}`));

            //Preview Song
            let cardTextSong = document.createElement('p');
            cardTextSong.className = 'card-text';
            let cardTextSongAudio = document.createElement('audio');
            cardTextSongAudio.style.width = '100%';
            cardTextSongAudio.setAttribute('controls', 'controls');
            cardTextSongAudio.setAttribute('preload', 'auto');
            cardTextSongAudio.setAttribute('src', `${responseData.results[x].previewUrl}`);
            cardTextSongAudio.setAttribute('type', 'audio/m4a');
            cardTextSongAudio.appendChild(document.createTextNode('Your browser does not support the audio element'));
            cardTextSong.appendChild(document.createTextNode('Preview Song : '));
            cardTextSong.appendChild(cardTextSongAudio);

            //Album Info
            let albumInfoText = document.createElement('p');
            albumInfoText.appendChild(document.createTextNode(`Album : ${responseData.results[x].collectionCensoredName}`));

            //View More From Artist
            let cardTextArtist = document.createElement('p');
            let linkToArtist = document.createElement('a');
            linkToArtist.className = 'view-artist-link';
            linkToArtist.setAttribute('href', `${responseData.results[x].artistViewUrl}`);
            linkToArtist.setAttribute('target', '_blank');
            linkToArtist.appendChild(document.createTextNode('Click To View More From Artist'));
            cardTextArtist.appendChild(linkToArtist);

            //Create A Button To View The Song's Lyrics
            let viewSongLyricContainer = document.createElement('p');
            viewSongLyricContainer.className = 'view-song-lyric-container';
            let viewSongLyric = document.createElement('a');
            viewSongLyric.className = 'view-song-lyric';
            viewSongLyric.setAttribute('href', '#');
            viewSongLyric.appendChild(document.createTextNode('Click To View Song Lyrics'));
            viewSongLyricContainer.appendChild(viewSongLyric);

            //Create A Button To View The Music Video For The Song
            let viewSongVideoContainer = document.createElement('p');
            viewSongVideoContainer.className = 'view-song-video-container';
            let viewSongVideo = document.createElement('a');
            viewSongVideo.className = 'view-song-video';
            viewSongVideo.setAttribute('href', '#');
            viewSongVideo.appendChild(document.createTextNode('Click To Hear Full Song'));
            viewSongVideoContainer.appendChild(viewSongVideo);

            cardBody.appendChild(cardBodyTitle);
            cardBody.appendChild(cardBodyArtistName);
            cardBody.appendChild(cardTextSong);
            cardBody.appendChild(albumInfoText);
            cardBody.appendChild(cardTextArtist);
            cardBody.appendChild(viewSongLyricContainer);
            cardBody.appendChild(viewSongVideoContainer);

            //Append the cardImage and Cardbody to the Card, append each card to our 4 column div
            // append each column to our row. After 4 columns are appended to our row, it will start a new row on the next line.
            //and push the card div to our array
            card.appendChild(cardImgContainer);
            card.appendChild(cardBody);
            divColumn.appendChild(card);
            divRow.appendChild(divColumn);
            //cardDeck.appendChild(divRow)
            resultsArray.push(card);

        }

        //Loop through the results and append each to the card deck container
        for (let x = 0; x < resultsArray.length; x++) {
            //cardDeck.appendChild(resultsArray[x])
            searchResult.appendChild(divRow);
        }

        document.querySelector('.results-container').appendChild(searchResult);

    } // end postMusicResults Prototype

    postMovieResults(responseData) {
        console.log(responseData);
    } // end postMovieResults Prototype

    displayError(backgroundColor, message) {
        //First Call The ClearError function, in case there's a error div already in the UI
        //Clear Error removes the error div from the page, if there's one that is present on the page.
        //More styles for this error div are in the html file
        this.clearError();
        let div = document.createElement('div');
        div.style.background = backgroundColor;
        div.className = 'display-error';
        div.appendChild(document.createTextNode(message));
        document.querySelector('.container-fluid').insertBefore(div, document.querySelector('.results-container'));
    } // end displayError Prototype

    displayErrorModal(message) {
        let modalErrorContainer = document.querySelector('.modal-error');
        modalErrorContainer.innerHTML = `${message}`;

        //Also display the play song button
        let modalPlaySong = document.querySelector('.modal-play-song');
        modalPlaySong.style.display = 'inline';
    } //end displayErrorModal()

    clearError() {
        let errorDiv = document.querySelector('.display-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    } // end clearError()

    appendDataToModal(lyricResponseData, songTitle) {
        document.querySelector('.modal-title').textContent = songTitle;
        document.querySelector('.modal-text').textContent = lyricResponseData.lyricResult.track.text;

        //Also display the play song button
        let modalPlaySong = document.querySelector('.modal-play-song');
        modalPlaySong.style.display = 'inline';

        //Pause the audio element inside the card, in case there's audio playing from the audio element, when the 'view song lyrics' link is clicked
        document.querySelector('audio').pause();

    } //end appenedDataToModal()


    attachModalListeners(modal) {
        modal.querySelector('.close-modal').addEventListener('click', this.toggleModal);
        modal.querySelector('.overlay').addEventListener('click', this.toggleModal);
    } // end attachModalListener

    detachModalListeners(modal) {
        modal.querySelector('.close-modal').removeEventListener('click', this.toggleModal);
        modal.querySelector('.overlay').removeEventListener('click', this.toggleModal);
    } //end detachModalListener

    toggleModal() {
        let modal = document.querySelector('.modal');
        let currentState = modal.style.display;

        //When toggleModal() is called, it will check if the modal is currently displayed on the screen. If it is not, then the modal will be displayed as a result of calling toggleModal(). 
        //If toggleModal() is called and the modal is on the screen, then it will get hidden.

        if (modal.style.display === 'none') {
            modal.style.display = 'block';
            this.attachModalListeners(modal);
        } else {
            modal.style.display = 'none';
            this.detachModalListeners(modal);
            let divIFrameContainer = document.querySelector('.iframe-video');
            if (divIFrameContainer.children.length > 0) {
                this.removeIframe();
            }

            //Here I am erasing the text portion, the title, remove the text content that is streaming the audio of the song, remove the play song button, removing any text inside the modal if it's displaying the Lyrics not found message ,and removing the iframe, when the modal is turned off.
            //This resets the modal to the bare bones state
            document.querySelector('.modal-title').innerHTML = '';
            document.querySelector('.modal-text').innerHTML = '';
            divIFrameContainer.innerHTML = '';
            document.querySelector('.stream-song-container').innerHTML = '';
            document.querySelector('.modal-play-song').style.display = 'none';
            document.querySelector('.modal-error').innerHTML = '';
        }
    } //end toggleModal()

    createIframe(videoID) {
        let divIFrameContainer = document.querySelector('.iframe-video');

        //Check To See If The Iframe Container in the modal, has iframes in it, if it does, then delete them.
        if (divIFrameContainer.children.length > 0) {
            this.removeIframe();
        }

        divIFrameContainer.setAttribute('id', `video-${videoID}`);
        let iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '315');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoID}`);
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        divIFrameContainer.appendChild(iframe);

        //Pause the audio element inside the card, in case there's audio playing from the audio element, when the 'click to hear full song' link is clicked
        document.querySelector('audio').pause();
    } //end createIframe()

    removeIframe() {
        let divIFrameContainer = document.querySelector('.iframe-video');

        //Delete each Iframe inside the Iframe Container
        for (let x = 0; x < divIFrameContainer.children.length; x++) {
            divIFrameContainer.removeChild(divIFrameContainer.children[x]);
        }
    } //end removeIframe();

    createMiniYTPlayer(videoId) {
        //Remove the play song button when called. 
        document.querySelector('.modal-play-song').style.display = 'none';

        let ytPlayerContainer = document.querySelector('.stream-song-container');
        ytPlayerContainer.innerHTML = `
        <object type="application/x-shockwave-flash" width="30" height="25" data="https://www.youtube.com/v/${videoId}?version=2&theme=dark"><param name="movie" value="https://www.youtube.com/v/${videoId}?version=2&theme=dark" /><param name="wmode" value="transparent" /></object>`;
        // Got that from this site - http://navarr.me/ytaudio/
    }

    displayLoadingAnimation() {
        /*When called it will make the screen unclickable, and make it more opaque, unclear, and display a loading animation  */

        let container = document.querySelector('.site-container');
        container.style.opacity = '0.2';
        container.style.pointerEvents = 'none';

        let loadingContainer = document.querySelector('.loading-container');
        loadingContainer.classList.add('show');
        loadingContainer.style.display = 'block';

    } // end displayLoadingGif()

    removeLoadingAnimation() {
        /*When called, it will make the screen clickable again, and apparent, or give it's default clearness, and remove the loading animation  */

        let container = document.querySelector('.site-container');
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';

        let loadingContainer = document.querySelector('.loading-container');
        loadingContainer.classList.remove('show');
        loadingContainer.style.display = 'none';

    } // end removeLoadingGif()


    scrollToResult(elementToScrollTo) {
        //.console.log(window.scrollBy(0, elementToScrollTo.getBoundingClientRect().top + window.scrollY))
        console.log(elementToScrollTo);
        //console.log(resultsArray[resultsArray.length - 1].scrollTop)
        // console.log(divRow.getBoundingClientRect().top)
        //window.scrollBy(0, searchResultName.getBoundingClientRect())
    } // end scrollToResult()
}


























// *** DEPRECATED - WILL NOT USE

/* 
    moveProgressBar() {
        // *** Notate What You Are Doing ***
        When called, will display a progress bar the top of screen. Every 3 milliseconds the progress bar will move 33.33%, when the width of the progress bar reaches past 99, it will remove itself. 

        let progressBarContainer = document.querySelector('.progress-bar-container');
        let progressBar = document.querySelector('.progress-bar');
        //let body = document.querySelector('body')
        let container = document.querySelector('.site-container')
        container.style.zIndex = 2;
        progressBarContainer.style.display = 'block';
        let currentProgress = 0;

        let interval = window.setInterval(function() {
            window.setInterval(function() {
                currentProgress += 33.333
                progressBar.style.width = currentProgress + '%'
                if (currentProgress >= 99) {
                    clearInterval(interval)
                    let thatUI = new UI;
                    thatUI.resetProgressBar()
                }
            }, 300)
        }, 1000)


    } // moveProgressBar()

    resetProgressBar() {
        // *** Notate What You Are Doing ***

        window.setTimeout(function() {
            let progressBarContainer = document.querySelector('.progress-bar-container');
            let progressBar = document.querySelector('.progress-bar');
            //let body = document.querySelector('body')
            let container = document.querySelector('.site-container')
            progressBar.style.width = 0;
            progressBarContainer.style.display = 'none';
            progressBarContainer.style.zIndex = 2;
            container.style.zIndex = 1
        }, 1000)

    } //resetProgressBar()
*/