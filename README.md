# Spootify-clone





🎧 Spotify Clone – Web Music Player


A Spotify-inspired music streaming UI clone built using **HTML, CSS, and JavaScript**.  
This project replicates Spotify’s modern design and includes essential playback functionality, dynamic playlist rendering, and responsive layouts.



📸 Demo

<img width="1919" height="899" alt="Screenshot 2025-07-16 120153" src="https://github.com/user-attachments/assets/3f92c4cd-714f-4932-9a51-9b56b2451431" />



🚀 Features

- 🎵 **Play/Pause/Next/Previous** music tracks
- 📁 **Dynamic playlist loading** from local folders
- 🕒 **Seekbar with current time and duration**
- 🔊 **Volume slider with mute toggle**
- 🧑‍🎤 **Artist and album cards** with playable interaction
- 📱 **Responsive design** with hamburger menu for mobile devices
- 🧠 Written in **vanilla JavaScript** (no frameworks)



🛠️ Tech Stack

- **HTML5** – Semantic structure
- **CSS3** – Flexbox, media queries, transitions
- **JavaScript (ES6+)** – DOM manipulation, Audio API, event handling



📁 Project Structure

```

Spotify-Clone/
│
├── index.html
├── style.css
├── script.js
├── /assets/
│   ├── icons, images, album art
├── /songs/
│   ├── ncs/
│   ├── cs/
│   └── ...
└── README.md

````

> 🎵 Add your `.mp3` songs into the `/songs/<playlist-name>/` folders



🧪 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/RahulRavulakolu/Spootify-clone.git
   cd Spootify-clone
````

2. Open `index.html` in a browser (VS Code Live Server or double-click)

3. Make sure your songs are in subfolders inside `/songs/`, e.g.:

   ```
   /songs/ncs/track1.mp3
   /songs/cs/track2.mp3
   ```


🚀 Deploying on Render

This repository includes a [`render.yaml`](render.yaml) blueprint for a static site deployment.

1. Create a new **Blueprint** or **Static Site** on Render.
2. Connect this repository.
3. Use the repository root as the publish path.
4. Deploy the site.

This project is configured to work without a local development server. The playlist data is loaded from a static manifest, so the app works after deployment on Render.



🧠 What I Learned

* DOM manipulation and dynamic event handling in JavaScript
* Handling audio using the **HTML5 Audio API**
* Creating **responsive designs** using **Flexbox** and **media queries**
* Structuring modular UI with reusable cards and playlists



🎯 Future Improvements

* Add **search functionality**
* Add **user authentication**
* Connect to **backend (Node.js / Firebase)** for real playlists
* Add **song metadata** (title, artist, album) with `info.json`
* **Deploy on GitHub Pages**



🤝 Contribution

Contributions and suggestions are welcome!
Please fork this repo, create a branch, and submit a pull request.






🙋‍♂️ Author

Made with ❤️ by [**Rahul Ravulakolu**](https://github.com/RahulRavulakolu)
