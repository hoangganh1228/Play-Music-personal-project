// APlayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);
    const ap = new APlayer({
        container: aplayer,
        audio: [
          {
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
          },
        ],
        autoplay: true,
        volume: 0.8
      });
    const elementAvatar = document.querySelector(".singer-detail .inner-avatar");
    ap.on('play', function () {
        elementAvatar.style.animationPlayState = "running";
    });
    
    ap.on('pause', function () {
        elementAvatar.style.animationPlayState = "paused";
    });

    ap.on('ended', function () {
      const link = `/songs/listen/${dataSong._id}`;
      const options = {
        method: "PATCH"
      };
      
      fetch(link, options)
        .then(res => res.json())
        .then(data => {
          if(data && data.code == 200) {
            const span = document.querySelector(".inner-listen span");
            span.innerHTML = `${data.listen} lượt nghe`;
          }
        })
      })
}
//End APlayer

// Button Like

const buttonLike = document.querySelector("[button-like]");

if(buttonLike) {
  buttonLike.addEventListener('click', () => {
    const idSong = buttonLike.getAttribute("button-like");
    const isActive = buttonLike.classList.contains("active");

    const typeLike = isActive ? "dislike" : "like";

    const link = `/songs/like/${typeLike}/${idSong}`;

    const options = {
      method: "PATCH"
    }

    fetch(link, options)
      .then(res => res.json())
      .then(data => {
        if(data && data.code == 200) {
          const span = buttonLike.querySelector("span");
          span.innerHTML = `${data.like} thích`
          buttonLike.classList.toggle("active")
        }
      })
  })
}

// End Button Like

// Button Favorite

const buttonFavorite = document.querySelector("[button-favorite]");
if(buttonFavorite) {
  buttonFavorite.addEventListener("click", () => {
    const idSong = buttonFavorite.getAttribute("button-favorite");
    const isActive = buttonFavorite.classList.contains("active");

    const typeFavorite = isActive ? "unfavorite" : "favorite";

    const link = `/songs/favorite/${typeFavorite}/${idSong}`;

    const options = {
      method: "PATCH"
    };

    fetch(link, options)
      .then(res => res.json())
      .then(data => {
        if(data && data.code == 200) {
          buttonFavorite.classList.toggle("active");
        }
      })
  })
}

// End Button Favorite

// Search Suggest

const boxSearch = document.querySelector(".box-search");
if(boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const innerSuggest = boxSearch.querySelector(".inner-suggest");


  input.addEventListener("keyup", () => {
    const keyword = input.value;

    const link = `/search/suggest?keyword=${keyword}`;
    fetch(link)
      .then(res => res.json())
      .then(data => {
        if(data && data.code == 200) {
          const songs = data.songs;
          if(songs.length > 0) {
            const htmls = songs.map(item => {
              return `
                <a class="inner-item" href="/songs/detail/${item.slug}">
                  <div class="inner-image">
                    <img src="${item.avatar}" />
                  </div>
                  <div class="inner-info">
                      <div class="inner-title">${item.title}</div>
                      <div class="inner-singer">
                        <i class="fa-solid fa-microphone-lines"></i> ${item.infoSinger.fullName}
                      </div>
                  </div>
                </a>
              `;
            });
            const innerList = boxSearch.querySelector(".inner-list");
            innerList.innerHTML = htmls.join("");
            innerSuggest.classList.add("show");
          } else {
            innerSuggest.classList.remove("show");
          }
        }
      })
  })
}

// End Search Suggest

// Playlist

const buttonAddPlaylist = document.querySelector("[button-add-playlist]");
const playlistList = document.getElementById("playlistList")
const createPlaylistButton = document.getElementById("createNewPlaylist");
const addToPlaylistButton = document.getElementById("addToPlaylist");
const modalPlaylist = new bootstrap.Modal(document.getElementById("playlistModal"));
const modalCreatePlaylist = new bootstrap.Modal(document.getElementById("createPlaylistModal"));

buttonAddPlaylist.addEventListener("click", () => {
  const idSong = buttonAddPlaylist.getAttribute("data-id");

  modalPlaylist.show();
  const link = '/songs/playlists/list';
  const options = {
    method: "GET",
    credentials: "include",
  }
  fetch(link, options)
    .then(res => res.json())
    .then(data => {
      const playlistList = document.getElementById("playlistList");
      playlistList.innerHTML = "";

      if(data.playlists && data.playlists.length > 0) {
        data.playlists.forEach(playlist => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="playlist-${playlist.id}" value="${playlist.id}">
              <label class="form-check-label" for="playlist-${playlist.id}">${playlist.title}</label>
            </div>
          `;
          playlistList.appendChild(li);
        }); 
      } else {
        playlistList.innerHTML = "<li>Chưa có danh sách phát nào</li>";
      }
    })
    .catch(err => {
      console.error("Lỗi khi tải danh sách playlist:", err);
    });

})

createPlaylistButton.addEventListener("click", () => {
  modalPlaylist.hide(); // Ẩn modal chọn playlist
  modalCreatePlaylist.show(); // Hiển thị modal tạo playlist mới
});

const savePlaylistButton = document.getElementById("savePlaylist");
const playlistTitle = document.getElementById("playlistTitle");
const playlistStatus = document.getElementById("playlistStatus");

savePlaylistButton.addEventListener("click", () => {
  const newPlaylistName = playlistTitle.value.trim();
  const statusPlaylist = playlistStatus.value;

  
  if (newPlaylistName && statusPlaylist) {
    const link = `/songs/create/playlist`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        title: newPlaylistName,
        status: statusPlaylist 
      })
    };
    fetch(link, options)
      .then(res => res.json())
      .then(data => {
        if(data && data.code == 200) {
          alert("Playlist mới đã được tạo thành công!");
          modalCreatePlaylist.hide();
        } else {
          alert("Có lỗi xảy ra khi tạo playlist!");
        }
      })
  } else {
    alert("Tên playlist không được để trống!"); 
  }

  
})

if(addToPlaylistButton) {
  addToPlaylistButton.addEventListener("click", () => {
    
  })
}

// End Playlist


// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);
    closeAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden")
    })
}
//End Show Alert