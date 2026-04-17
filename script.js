
let currentsong = new Audio();
let play = document.querySelector("#play");
let playimg = document.querySelector("#play").firstElementChild;
let songname = document.querySelector(".album-data").firstElementChild;
let currenttime = document.querySelector("#currenttime");
let currduration = document.querySelector("#duration");
let seekbar = document.querySelector(".timer");
let songs = [];
let currfolder = "";
let currentTrackIndex = 0;
let img = document.querySelector(".album-img");

const playlistCatalog = {
    ncs: {
        info: {
            heading: "No copyright songs",
            description: "Songs for you"
        },
        songs: [
            "Bangaru Kalla Buchamo.mp3",
            "Camila Cabello - Señorita.mp3",
            "Coolio - Gangsta's Paradise.mp3",
            "Love Me Like You Do.mp3"
        ]
    },
    cs: {
        info: {
            heading: "No copyright songs",
            description: "Songs for you"
        },
        songs: [
            "Nenu Nuvvantu.mp3",
            "Oh Priya Priya.mp3",
            "Rooba Rooba.mp3"
        ]
    },
    Arijit_Singh_Specials: {
        info: {
            heading: "Arijit Singh Specials",
            description: "A curated Arijit Singh playlist"
        },
        songs: [
            "Agar Tum Saath Ho  _ Tamasha _.mp3",
            "Apna Bana Le - Full Audio _ Bhediya _.mp3",
            "Bekhayali Full Song _ Kabir Singh _.mp3",
            "Chahun Main Ya Naa_Aashiqui 2.mp3",
            "Kesariya - Film Version _ Brahmāstra _.mp3",
            "Khairiyat - Chhichhore.mp3",
            "Tujhe Kitna Chahne Lage - Kabir Singh.mp3",
            "_Tum Hi Ho_ Aashiqui 2.mp3"
        ]
    },
    Pritam: {
        info: {
            heading: "Pritam",
            description: "Popular Pritam tracks"
        },
        songs: [
            "Dunki O Maahi.mp3",
            "Kesariya.mp3",
            "MetroIn Dino Zamaana Lage.mp3",
            "Tera Hone Laga Hoon.mp3",
            "VE KAMLEYA.mp3",
            "Yeh Tune Kya Kiya.mp3"
        ]
    },
    SPBalu: {
        info: {
            heading: "S.P. Balasubrahmanyam",
            description: "Classic Telugu hits"
        },
        songs: [
            "Aakanulal.mp3",
            "Aavesamantha.mp3",
            "Allantha Doorala.mp3",
            "Are Emaindhi.mp3",
            "Emouthundhi.mp3",
            "Swathi Chinuku.mp3",
            "Tella Chiraku.mp3",
            "Theeganai Mallelu.mp3"
        ]
    },
    Sid_sriram: {
        info: {
            heading: "Sid Sriram",
            description: "Melodic favorites"
        },
        songs: [
            "Inkem Inkem Inkem Kaavaale.mp3",
            "Kumkumala.mp3",
            "Maate Vinadhuga.mp3",
            "Samajavaragamana.mp3",
            "Undiporaadhey.mp3",
            "Urike Urike.mp3"
        ]
    }
};

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

async function getsongs(folder) {
    currfolder = folder;
    const playlist = playlistCatalog[folder];

    if (!playlist) {
        songs = [];
        return songs;
    }

    songs = playlist.songs.slice();

    const songul = document.querySelector(".songslist").getElementsByTagName("ul")[0];
    songul.innerHTML = "";

    for (const song of songs) {
        songul.innerHTML += `<li data-song="${song}">
                            <i class="fa-solid fa-music" style="font-size: 1rem;"></i>
                            <div class="songinfo">
                                <div class="name">${song.replaceAll("%20", " ")}</div>
                                <div class="artist">artist</div>
                            </div>
                            <div class="playinfo">
                                <span>play now</span>
                                <img src="assets/player_icon3.png" style="opacity: 1; height: 1.3rem; width: 1.3rem;">
                            </div>
                        </li>`;
    }

    Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            playMusic(e.dataset.song);
        });
    });

    const playlistTitle = document.querySelector(".album-title");
    const playlistInfo = document.querySelector(".album-info");

    if (playlistTitle) {
        playlistTitle.textContent = playlist.info.heading;
    }

    if (playlistInfo) {
        playlistInfo.textContent = playlist.info.description;
    }

    return songs;
}

const playMusic = (track, pause = false) => {
    currentTrackIndex = songs.indexOf(track);

    if (currentTrackIndex < 0) {
        currentTrackIndex = 0;
    }

    currentsong.src = `songs/${currfolder}/${encodeURI(track)}`;

    if (!pause) {
        currentsong.play();
        playimg.src = "assets/Pause-Button.png";
    }

    songname.innerHTML = decodeURI(track);
};

async function main() {
    await getsongs("ncs");

    if (songs.length > 0) {
        playMusic(songs[0], true);
    }

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            playimg.src = "assets/Pause-Button.png";
        } else {
            currentsong.pause();
            playimg.src = "assets/player_icon3.png";
        }
    });

    currentsong.addEventListener("loadedmetadata", () => {
        seekbar.max = currentsong.duration;
        currduration.innerHTML = `${secondsToMinutesSeconds(currentsong.duration)}`;
    });

    currentsong.addEventListener("timeupdate", () => {
        currenttime.innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)}`;
        seekbar.value = currentsong.currentTime;
    });

    seekbar.addEventListener("input", () => {
        currentsong.currentTime = seekbar.value;
    });

    currentsong.addEventListener("ended", () => {
        if (currentTrackIndex + 1 < songs.length) {
            playMusic(songs[currentTrackIndex + 1]);
        }
    });

    document.querySelector("#hamburger").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = "0";
    });

    document.querySelector("#close-btn").addEventListener("click", () => {
        document.querySelector(".sidebar").style.left = "-120%";
    });

    previous.addEventListener("click", () => {
        currentsong.pause();

        if ((currentTrackIndex - 1) >= 0) {
            playMusic(songs[currentTrackIndex - 1]);
        }
    });

    next.addEventListener("click", () => {
        currentsong.pause();

        if ((currentTrackIndex + 1) < songs.length) {
            playMusic(songs[currentTrackIndex + 1]);
        }
    });

    document.querySelector(".volume-slider").addEventListener("input", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    });

    const slider = document.getElementById("rangeSlider");
    slider.addEventListener("input", function () {
        const value = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = `linear-gradient(to right, #1bd760 ${value}%, #ffffff ${value}%)`;
    });

    Array.from(document.getElementsByClassName("card")).forEach(card => {
        const folder = card.dataset.folder;

        if (!folder) {
            return;
        }

        card.addEventListener("click", async item => {
            songs = await getsongs(item.currentTarget.dataset.folder);

            if (songs.length > 0) {
                playMusic(songs[0]);
            }
        });
    });

    document.getElementById("volume-btn").addEventListener("click", e => {
        if (e.target.src.includes("controls_icon5.png")) {
            e.target.src = e.target.src.replace("controls_icon5.png", "mute.png");
            e.target.classList.add("volume-btn");
            currentsong.volume = 0;
            document.querySelector(".volume-slider").value = "0";
            document.querySelector("#rangeSlider").style.background = "linear-gradient(to right, #1bd760 0%, #ffffff 0%)";
        } else {
            e.target.src = e.target.src.replace("mute.png", "controls_icon5.png");
            e.target.classList.remove("volume-btn");
            currentsong.volume = 0.10;
            document.querySelector(".volume-slider").value = "10";
            document.querySelector("#rangeSlider").style.background = "linear-gradient(to right, #1bd760 10%, #ffffff 10%)";
        }
    });
}

main();