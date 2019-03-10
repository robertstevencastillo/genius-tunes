'use strict';
/*global fetch */

//Cors workaround - https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
//My Cors Proxy Created Via The Cors Anywhere Github Repo- https://stormy-lowlands-62219.herokuapp.com/
//Go to your heroku.com account, and you will see your cors proxy there. The Steps to create your own cors proxy I've listed down below
//Add a proxy url before each fetch request

class ITUNES {
    async searchMusic(searchTerm) {
        const proxyurl = "https://stormy-lowlands-62219.herokuapp.com/";
        let response = await fetch(`${proxyurl}https://itunes.apple.com/search?term=${searchTerm}&media=music&limit=1`);
        let responseObj = await response.json();
        return {
            results: responseObj.results
        }
    } // end searchMusic Prototype

    async searchMovie(searchTerm) {
        let response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&media=movie&limit=12`);
        let responseObj = await response.json();
        return {
            results: responseObj.results
        }
    } //end searchMovie Prototype
} //end ITUNES Class

class LYRICS {
    async lyricSeed(artistName, trackName) {
        const proxyurl = "https://stormy-lowlands-62219.herokuapp.com/";
        let api_key = '2jOZP3YkUXH5D12s13Cbj48KVb4Vbm1eO8fkWyBz2t3QrbkvwIH5C6M05FhVgMPZ';
        let response = await fetch(`${proxyurl}https://orion.apiseeds.com/api/music/lyric/${artistName}/${trackName}?apikey=${api_key}`);
        let responseObj = await response.json();
        return {
            lyricResult: responseObj.result
        }
    } // end lyricSeed()

    async musixMatch(artistName, trackName) {
        let apikey = '60e87e6dffd3b7a828299c53b3beecae'
        let response = await fetch(`https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=${artistName}&q_artist=${trackName}&apikey=${apikey}`)
        let responseObj = await response.json();
        return {
            musixLyric: responseObj
        }
    }
} // end LYRICS CLASS

class YOUTUBE {
    async searchYoutube(searchTerm) {
        const proxyurl = "https://stormy-lowlands-62219.herokuapp.com/";
        let response = await fetch(`${proxyurl}https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchTerm}&key=AIzaSyC_swvvoLmXpzb867umALBdwXgNhrUJgUQ`)
        let responseObj = await response.json();
        return {
            ytResults: responseObj.items
        }
    } //end searchYoutube()
} //end YOUTUBE CLASS


/*
Scraping Genius https://bigishdata.com/2016/09/27/getting-song-lyrics-from-geniuss-api-scraping/ 

Possible Scrapping Libraries
1 - 
https://github.com/scf4/lyricist

Or Do It Yourself With Node JS
*/


/*
You can easily run your own proxy using code from https://github.com/Rob--W/cors-anywhere/.
The steps are performed in git bash unless other wise specified
You can also easily deploy your own proxy to Heroku in literally just 2-3 minutes, with 5 commands:

cd into your project folder
git clone https://github.com/Rob--W/cors-anywhere.git
cd cors-anywhere/
npm install
open window cmd - 1 - herko login -i , and then enter login credentials
heroku create
git push heroku master

*/