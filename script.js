
let currentsong = new Audio();
let play = document.querySelector("#play");
let playimg = document.querySelector("#play").firstElementChild;
let songname = document.querySelector(".album-data").firstElementChild;
let currenttime = document.querySelector("#currenttime");
let currduration = document.querySelector("#duration");
let seekbar = document.querySelector(".timer");
let songs;
let currfolder;
let img = document.querySelector(".album-img");
console.dir(img)
//it used to converts the time
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder){
    currfolder = folder;
    let a = await fetch(`http://127.0.0.1:5500/${currfolder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    
    let dta = div.getElementsByClassName("icon icon icon-mp3 icon-default"); //songs dic class name is that icon icon-mp3 
    
    songs = [];
    for (let index = 0; index < dta.length; index++) {
        const element = dta[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1]);
        }
    }
    //show all the songs in the playlist
    let songul = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    songul.innerHTML = ""
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> 
                            <i class="fa-solid fa-music" style="font-size: 1rem;"></i>
                            <div class="songinfo">
                                <div class="name"> ${song.replaceAll("%20"," ")}</div>
                                <div class="artist">artist</div>
                            </div>
                            <div class="playinfo">
                                <span>play now</span>
                                <img src="/assets/player_icon3.png"  style="opacity: 1; height: 1.3rem; width: 1.3rem;">
                            </div>
                            </li>`
        
       
    }
    //gives the array of song names
    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",()=>{
            console.log(e.querySelector(".songinfo").firstElementChild.innerHTML);
            playMusic(e.querySelector(".songinfo").firstElementChild.innerHTML.trim());
        })
        
    })
    return songs
};
 
//to play the song 
const playMusic = (track,pause=false)=>{
    currentsong.src = `/${currfolder}/`+track;
    if (!pause){
        currentsong.play()
        playimg.src = "http://127.0.0.1:5500/assets/Pause-Button.png"
    }
    
    songname.innerHTML= decodeURI(track);
}
//to add the albums
// async function displayAlbums(){
//     let a = await fetch("http://127.0.0.1:5500/songs/");
//     let response = await a.text();
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a")
//     let cardcontainer = document.getElementsByClassName("card-container")
//     Array.from(anchors).forEach(async e=>{
       
//         if(e.href.includes("/songs/")){
//             let folder = e.href.split("/").slice(-1)[0]
//             //get metadata  from the folder
//             let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
//             let response = await a.json();
//             console.log(cardcontainer)
//             cardcontainer.innerHTML = cardcontainer.innerHTML + `<div class="card" data-folder="ncs">
//             <div class="icon-wrapper">
//                 <i class="fa-solid fa-play"></i>
//             </div>
//             <img src="/assets/card8.png" class="cards-img">
//             <p class="cards-title">${response.title}</p>
//             <p class="cards-info">${response.description}</p>
//         </div>`
//         }
//     })
// }

async function main(){
    //get songs from the server
    await getsongs("songs/ncs");
    playMusic(songs[0],true)

    //adding albums on the page
    // displayAlbums()

    // play and pause and next functionality
    play.addEventListener("click",()=>{
        if(currentsong.paused){
            currentsong.play()
            playimg.src="http://127.0.0.1:5500/assets/Pause-Button.png"
        }else{
            currentsong.pause()
            playimg.src="http://127.0.0.1:5500/assets/player_icon3.png"
        }
    })

    //listen for timeupdate event
    currentsong.addEventListener("timeupdate",()=>{
        currenttime.innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}` //setting starting time
        currduration.innerHTML = `${secondsToMinutesSeconds(currentsong.duration)}` //setting end time
        currentsong.addEventListener("loadedmetadata", () => {
            seekbar.max = currentsong.duration;
        });
          
        // Update range input as the song plays
        currentsong.addEventListener("timeupdate", () => {
            seekbar.value = currentsong.currentTime;
        });
          
        // Allow user to seek manually
        seekbar.addEventListener("input", () => {
            currentsong.currentTime = seekbar.value;
        });
    
    })
    //add an event listner to hamburger
    document.querySelector("#hamburger").addEventListener("click",()=>{
        document.querySelector(".sidebar").style.left = "0";
    })
    document.querySelector("#close-btn").addEventListener("click",()=>{
        document.querySelector(".sidebar").style.left = "-120%";
    })

    //add event listner to previous
    previous.addEventListener("click",()=>{
        currentsong.pause();
        
        let index = songs.indexOf(currentsong.src.split("/").splice(-1)[0]);
        if ((index-1) >= 0){
            playMusic(songs[index-1]);
            console.log(index-1);
        }
    });
    //add event lister to next
    next.addEventListener("click",()=>{
        currentsong.pause();
        let index = songs.indexOf(currentsong.src.split("/").splice(-1)[0]);
        if ((index+1) < songs.length){
            playMusic(songs[index+1]);
            console.log(index+1);
        }
    });

    //add event listner to volume
    document.querySelector(".volume-slider").addEventListener("change",(e)=>{
        console.log("current volume",e.target.value);
        currentsong.volume = parseInt(e.target.value)/100;
    });

    

    //to cahnge the volume region color
    const slider = document.getElementById("rangeSlider");
    slider.addEventListener("input", function () {
    const value = (this.value - this.min) / (this.max - this.min) * 100;
    
    this.style.background = `linear-gradient(to right, #1bd760 ${value}%, #ffffff ${value}%)`;
    });

    //load playlist when card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async item=>{
            console.log(item.currentTarget.dataset.folder)
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            console.dir(songs)
            playMusic(songs[0])
        })
    })
    //adding event listner to change volume btn to mute
    document.getElementById("volume-btn").addEventListener("click",e=>{
        if(e.target.src.includes("icon5.png")){
            e.target.src = e.target.src.replace("controls_icon5","mute")
            e.target.classList.add("volume-btn")
            currentsong.volume = 0
            document.querySelector(".volume-slider").value = "0"
            document.querySelector("#rangeSlider").style.background = "linear-gradient(to right, #1bd760 0%, #ffffff 0%)";
        }
        else{
            e.target.src = e.target.src.replace("mute","controls_icon5")
            e.target.classList.remove("volume-btn")
            currentsong.volume = 0.10
            document.querySelector("#rangeSlider").value = "10"
            document.querySelector("#rangeSlider").style.background = "linear-gradient(to right, #1bd760 10%, #ffffff 10%)";
        }
    })

};
main();