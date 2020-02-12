//CAMERA

// (function() {
//   // The width and height of the captured photo. We will set the
//   // width to the value defined here, but the height will be
//   // calculated based on the aspect ratio of the input stream.

//   var width = 320; // We will scale the photo width to this
//   var height = 0; // This will be computed based on the input stream

//   // |streaming| indicates whether or not we're currently streaming
//   // video from the camera. Obviously, we start at false.

//   var streaming = false;

//   // The various HTML elements we need to configure or control. These
//   // will be set by the startup() function.

//   var video = null;
//   var canvas = null;
//   var photo = null;
//   var startbutton = null;

//   function startup() {
//     video = document.getElementById("video");
//     canvas = document.getElementById("canvas");
//     photo = document.getElementById("photo");
//     startbutton = document.getElementById("startbutton");

//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: false })
//       .then(function(stream) {
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch(function(err) {
//         console.log("An error occurred: " + err);
//       });

//     video.addEventListener(
//       "canplay",
//       function(ev) {
//         if (!streaming) {
//           height = video.videoHeight / (video.videoWidth / width);

//           // Firefox currently has a bug where the height can't be read from
//           // the video, so we will make assumptions if this happens.

//           if (isNaN(height)) {
//             height = width / (4 / 3);
//           }

//           video.setAttribute("width", width);
//           video.setAttribute("height", height);
//           canvas.setAttribute("width", width);
//           canvas.setAttribute("height", height);
//           streaming = true;
//         }
//       },
//       false
//     );

//     startbutton.addEventListener(
//       "click",
//       function(ev) {
//         takepicture();
//         ev.preventDefault();
//       },
//       false
//     );

//     clearphoto();
//   }

//   // Fill the photo with an indication that none has been
//   // captured.

//   function clearphoto() {
//     var context = canvas.getContext("2d");
//     context.fillStyle = "#AAA";
//     context.fillRect(0, 0, canvas.width, canvas.height);

//     var data = canvas.toDataURL("image/png");
//     photo.setAttribute("src", data);
//   }

//   // Capture a photo by fetching the current contents of the video
//   // and drawing it into a canvas, then converting that to a PNG
//   // format data URL. By drawing it on an offscreen canvas and then
//   // drawing that to the screen, we can change its size and/or apply
//   // other changes before drawing it.

//   function takepicture() {
//     var context = canvas.getContext("2d");
//     if (width && height) {
//       canvas.width = width;
//       canvas.height = height;
//       context.drawImage(video, 0, 0, width, height);

//       var data = canvas.toDataURL("image/png");
//       photo.setAttribute("src", data);
//     } else {
//       clearphoto();
//     }
//   }

//   // Set up our event listener to run the startup process
//   // once loading is complete.
//   window.addEventListener("load", startup, false);
// })();

//TURN file TO STRING 64BIT

let id;
let state = true;
function previewFile() {
  const preview = document.querySelector("img");
  const fileUpload = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      state = false;
      console.log(reader.result);
      preview.src = reader.result;
      axios
        .post("https://api.plant.id/identify", {
          key: "UmsFkuSbBP6RHGd2cX8RseQopiEZyOG2sB6xiuayUXjl1w8rMz",
          images: [reader.result]
        })
        .then(response => {
          console.log(typeof response.data.id);
          console.log(response.data.id);
          console.log();
          id = response.data.id;
          state = true;
          console.log("idenTifIcatioN data");
        })
        .catch(err => console.log(err));
    },
    false
  );

  if (fileUpload) {
    reader.readAsDataURL(fileUpload);
    console.log(fileUpload);
  }
  // readyState will be 2 Button invisible when pic upload

  reader.onloadend = function() {
    // check asyncronously that the id exists and then send create button
    let checkId = setInterval(function() {
      if (state) {
        console.log("DONE", reader.readyState);
        document.getElementById("imgUpload").style.display = "";
        document.getElementById("imgUploadText").innerHTML = "😍";
        document.getElementById("imgUploadH1").innerHTML = "Looks good!";
        document.getElementById("lable").innerHTML = "Select a different image";
        document.querySelector("#plantFileId").value = id;

        clearInterval(checkId);
      } else {
        document.getElementById("imgUpload").style.display = "none";
      }
    }, 1);
  };
}

//   axios.get('http://jsonplaceholder.typicode.com/todos', {
//     params: {
//       id: todoId
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//     resultElement.innerHTML = generateSuccessHTMLOutput(response);
//   })
//   .catch(function (error) {
//       resultElement.innerHTML = generateErrorHTMLOutput(error);
//   });
// }

/* setTimeout(function() {
  axios
    .post("https://api.plant.id/check_identifications", {
      key: "UmsFkuSbBP6RHGd2cX8RseQopiEZyOG2sB6xiuayUXjl1w8rMz",
      ids: [id]
    })
    .then(information => {
      console.log(information);
      // console.log(req.body.0.suggestions.0.plant.common_name);
      axios
        .post("http://localhost:3000/plantForm", { information })
        .then(something => {
          console.log(something);
        })
        .catch(err => console.log(err));

      //console.log(suggestions.plant.common_name);
      // response.render("plantInfo.hbs", {
      //   name: "req.body.0.suggestions.[0].plant.common_name"
      // });
    });
}, 1200);
 */
