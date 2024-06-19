let params = new URLSearchParams(window.location.search);

let uid = params.get("name");
let room = params.get("room");

var roomtopoint = [
  {
    room: "room1",
    point: 10
  },
  {
    room: "room2",
    point: 10
  },
  {
    room: "room3",
    point: 20
  }
];

var counter = 5;
if (uid !== null && room !== null) {
  let countdown = setInterval(async function () {
    // await savePoint(uid, room);
    console.log("no clossssss");

    counter--;
    if (counter < 0) {
      console.log("clossssss");
      clearInterval(countdown);
      window.open("", "_self");
      window.close();
    }
  }, 5000);
}

const showSuccessModal = (point) => {
  let modal = document.getElementById("#show-point-modal");
  modal.style.display = "block";
  modal.querySelector(
    "p"
  ).innerHTML = `You will be redirected in ${point} seconds`;
};

const showFailModal = () => {
  let modal = document.getElementById("#show-point-modal");
  modal.style.display = "block";
  modal.querySelector(
    "p"
  ).innerHTML = `You will be redirected in ${counter} seconds`;
};

// Get the button element
const button = document.getElementById("myButtonssss");

// Add a click event listener to the button
button.addEventListener("click", function () {
  try {
    window.open("", "_self");
    window.close();
  } catch (e) {}
});

// const savePoint = (uid, room) => {
//   $.ajax({
//     url: "https://api.raisely.com/v3/points",
//     type: "POST",
//     data: JSON.stringify({
//       data: {
//         name: uid,
//         room: room
//       }
//     }),
//     headers: {
//       "Content-Type": "application/json"
//     },
//     success: function (data, textStatus, jqXHR) {
//       if (jqXHR.status === 200) {
//         let roomPoint = roomtopoint.find(r => r.room === room);
//         if (roomPoint) {
//           showSuccessModal(roomPoint.point);
//         } else {
//           showFailModal();
//         }
//       } else {
//         showFailModal();
//       }
//     },
//     error: function (error) {
//       console.log(error);
//     }
//   });
// };
