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

// Button Delete

const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");
  console.log(path);
  
  
  buttonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?");
      if(isConfirm) {
        const id = button.getAttribute("data-id");
        const action =  `${path}${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }    
    })
  })
}

// End Button Delete


// Upload Image
const uploadImage = document.querySelector("[upload-image]");
console.log(uploadImage);
if(uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]")
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  console.log(uploadImageInput);
  console.log(uploadImagePreview);
  uploadImageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  })
}
// End Upload Image

// Upload Audio

const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");

  uploadAudioInput.addEventListener("change", (e) => {
    if(e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);

      const source = uploadAudioPlay.querySelector("source");
      source.src = audio;
      uploadAudioPlay.load();
    }
  })
}

// End Upload Audio
