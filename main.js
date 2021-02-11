function searchSongs(){
    const searchText = document.getElementById('search-field').value; // focus must be  value 'v' is capital letter
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
       fetch(url)
       .then(res=> res.json())
       .then(data =>  displaySong(data.data))
       .catch(error => displayError('something is wrong, please wait or try again after sometime')) // just only use catch method
}

const displaySong = songs =>{
      console.log(songs)
      const songsContainer = document.getElementById('songs-container')
      songsContainer.innerHTML = "";
      songs.forEach(song => {
          const songDiv = document.createElement('div')
          songDiv.className = "single-result row align-items-center my-3 p-3";
          songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls  muted>
                            <source src="${song.preview}" type="audio/ogg">           
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
          `
          songsContainer.appendChild(songDiv);
      });     
}

const getLyrics =  async (artist, title) =>{
    console.log(artist);
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
       try{      
        const res = await fetch(url);
        const data = await res.json(); 
        displayLyrics(data.lyrics)
       }
       catch(error){ displayError('failed to load')} //catch error if try is failed to load
        
}

const displayLyrics = (lyrics) => {
  const lyric = document.getElementById('lyric-container')
   lyric.innerText = lyrics;
}
const displayError = (error) => {
  document.getElementById('error').innerText = error;
}