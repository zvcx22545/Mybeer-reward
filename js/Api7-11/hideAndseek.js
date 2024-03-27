// document.addEventListener('DOMContentLoaded', function () {
//     const processLoading = document.getElementById('processLoading');
//     const closeBTN = document.getElementById('closeSuccess');
//     const successDiv = document.getElementById('success');
//     const form = document.getElementById('form-submit');
//     const top = document.getElementById('top-contents');
//     const sentButton = document.getElementById('sent');

//     // ซ่อน div "processLoading" และ "success" เมื่อเริ่ม
//     processLoading.style.display = 'none';
//     successDiv.style.display = 'none';
//     closeBTN.style.display = 'none';
//     top.style.display = 'block';

//     sentButton.addEventListener('click', () => {
//         processLoading.style.display = 'flex';
//         form.style.display = 'none';
//         top.style.display = 'none';

//         setTimeout(() => {
//             processLoading.style.display = 'none';
//             successDiv.style.display = 'block';
//             closeBTN.style.display = 'none';
//             closeBTN.style.display = 'flex';
//             form.style.display = 'none';

//             var countdown = 3; 
//             var countdownButton = document.getElementById("countdownButton");

//             countdownButton.innerText = "( " + countdown + " ) " + " ปิด";

//             var countdownInterval = setInterval(function () {
//                 countdown--;
//                 if (countdown <= 0) {
//                     clearInterval(countdownInterval);
//                     countdownButton.innerText = "เสร็จสิ้น";
//                     setTimeout(function () {
//                         location.reload();
//                     }, 1000);
//                 } else {
//                     countdownButton.innerText = "( " + countdown + " ) " + " ปิด";
//                 }
//             }, 1000);

//         }, 5000);
//     });

// });

