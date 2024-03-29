// let stateKey = "lineAccessToken";
// let CALLBACK_URL = "https://mybeer-point.com";
// let CLIENT_ID = "2002643017";
// let CLIENT_SECRET = "6fa02e2c38585be6eb059593e044112c";
let LiffID = "2002643017-7pYpek5O";

async function fetchUserProfile() {
  try {
    // User is logged in, fetch the user profile immediately
    try {
       liff
        .getProfile()
        .then((profile) => {
          // console.log('User profile:', profile);
          console.log(profile)

          const customer_id = profile.userId;

          if( document.getElementById("CustomerId"))
          {
            document.getElementById("CustomerId").value = customer_id;
          }
          else if( document.getElementById("userid"))
          {
            document.getElementById("userid").value = customer_id;
          }
          //Api 301 Get all user
          const getuserprofile =
            "https://games.myworld-store.com/api/customers/customerInfo";

          let Getuserprofile = {
            url: getuserprofile,
            method: "POST",
            timeout: 0,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              customer_id: customer_id,
              picture: profile.pictureUrl, // Use the variable here
              name: profile.displayName,
            }),
          };
          $.ajax(Getuserprofile).done(function (response) {
            // Update the HTML content with the API data
            $("#Nameuser").text(response.name);
            $("#points").text(`Points: ${response.point}`);
            $("#Profileimage").attr("src", response.picture);
            $("#Profilemini").attr("src", response.picture);
            $("#Telephone").attr("value",response.phone);

            var userPoints = response.point;

            //Api 605 Get all merchandise

            let Allmerchandise = {
              url: `https://games.myworld-store.com/api/merchandises/publish/${customer_id}/`,
              method: "GET",
              timeout: 0,
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
              },
            };

            $.ajax(Allmerchandise)
              .done(function (response) {
                // Check if the response is an array and has items
                if (Array.isArray(response)) {
                  // Loop through the array of merchandise items
                  response.forEach(function (item) {
                    var isEnabled = userPoints >= item.point;

                    // Generate the merchandise HTML
                    const canredeem = item.can_redeem;
                    var merchandiseHTML = `
                  <div class="product ${
                    !isEnabled || !canredeem ? "disabled-overlay" : ""
                  }" data-merchandise-id="${item.merchandise_id}">
                          <img src="../images/logo-2_1.png" alt="">
                          <div class="content" data-name="p-1">
                              <img src="${item.picture}" alt="${item.name}">
                              <h3>${item.title1}</h3>
                              <h4>${item.title2}</h4>
                              <div class="price">${item.description}</div>
                          </div>
                      </div>
                  `;

                    $("#products-container").append(merchandiseHTML);
                  });

                  // Attach a click event listener to product elements
                  $(document).on("click", ".product", function (event) {
                    if ($(this).hasClass("disabled-overlay")) {
                      event.preventDefault();
                      event.stopPropagation();

                      // Hide the modal
                      $("#modalpreview").css("display", "none");
                    } else {
                      // $('#modalpreview').css('display','grid')
                    }
                  });

                  // Apply grayscale filter only to the images inside disabled products
                  $(".disabled-overlay img").css("filter", "grayscale(100%)");

                  let selectedMerchandiseId = null;

                  // Attach a click event listener to product elements
                  $(".product").on("click", function () {
                    var selectedMerchandiseId = $(this).data("merchandise-id");

                    if (selectedMerchandiseId) {
                      var imgSrc = $(
                        '.product[data-merchandise-id="' +
                          selectedMerchandiseId +
                          '"] .content img'
                      ).attr("src");

                      var h3Value = $(this).find("h3").text();
                      var h4Value = $(this).find("h4").text();
                      var descriptionValue = $(this).find(".price").text();
                      $("#text-Modal").text(h3Value);
                      $("#text2-Modal").text(h4Value);
                      $("#description").text(descriptionValue);
                      $("#mockimage").attr("src", imgSrc);
                      $("#merchandiseId").val(selectedMerchandiseId);

                      //Api 402 get all trade
                    } else {
                      console.error("Merchandise ID is missing or empty.");
                    }
                  });
                } else {
                  console.error("Response is not an array or is empty.");
                }
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX request failed:", textStatus, errorThrown);
              });
          });
          $("#submit-modal").on("submit", function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Collecting values from the form
            var formData = {
              address: $("#address").val(),
              province: $("#province").val(),
              district: $("#district").val(),
              sub_district: $("#subDistrict").val(),
              postcode: $("#zipCode").val(),
              receiver_name: $("#receiverName").val(),
              phone: $("#phone").val(),
              merchandise_id: $("#merchandiseId").val(),
              customer_id: $("#CustomerId").val(),
              type: "shipping", // Initialize with an empty string
            };

            $("input[type='radio'][name='bordered-radio']").on(
              "change",
              function () {
                // Get the value of the selected radio button and update formData.type
                formData.type = $(this).val();
              }
            );

            // Initially set the type based on the checked radio button
            formData.type = $(
              "input[type='radio'][name='bordered-radio']:checked"
            ).val();

            // Add an event listener to the radio buttons
            // Check if merchandise_id is set properly
            if (
              !formData.merchandise_id ||
              formData.merchandise_id === "default_merchandise_id"
            ) {
              // Handle the case when merchandise_id is not set
              // For example, you can alert the user or set a default value
              return; // Stop the function execution if merchandise_id is not set
            }

            // Api 302 trading trading Merchandise
            // AJAX request setup
            var tradeMerchandise = {
              url: "https://games.myworld-store.com/api/customers/tradeMerchandise",
              method: "POST",
              timeout: 0,
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
              },
              data: JSON.stringify({
                merchandise_id: formData.merchandise_id,
                customer_id: formData.customer_id,
                receiver_name: formData.receiver_name,
                address: formData.address,
                sub_district: formData.sub_district,
                district: formData.district,
                province: formData.province,
                postcode: formData.postcode,
                phone: formData.phone,
                type: formData.type,
              }),
            };

            // $("#submit-modal1").submit(function (e) {
            //   e.preventDefault();
            //   // Coding
            //   $("#modalpreview").modal("toggle"); //or  $('#IDModal').modal('hide');
            //   return false;
            // });

            // Sending the AJAX request
            // This is your existing AJAX success callback
            let Name = profile.displayName;
            $.ajax(tradeMerchandise).done(function (response) {
              if (response.type === "onsite") {
                if (response.point == 0) {
                  Swal.fire({
                    title: "ยืนยันรับสิทธิ์สำเร็จ",
                    html:
                      "<span '>กรุณายืนยันตัวตนกับทีมเจ้าหน้าที่</span>" +
                      "</span>",
                    icon: "",
                    confirmButtonText: "ปิด",
                    customClass: {
                      confirmButton:
                        " mb-[-2rem] w-[100%] h-[30px] rounded-[3px] bg-cyan-500 border-1 border-[#28B7E1] text-[#fff] flex justify-center items-center",
                      title: "mt-[-2.5rem]",
                    },
                    buttonsStyling: false,
                    padding: "4rem 2rem",
                    allowOutsideClick: false, // ไม่อนุญาตให้คลิกภายนอกต่างๆ
                    showLoaderOnConfirm: true, // Show loader animation on confirm button
                    preConfirm: () => {
                      // Simulate some processing time (e.g., AJAX request)
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                        }, 3000); // Simulating 2 seconds of processing time
                      });
                    },
                  }).then((result) => {
                    // Check if the "ปิด" button was clicked
                    if (result.isConfirmed) {
                      // Reload the website after processing is done
                      location.reload();
                    }
                  });
                } else {
                  Swal.fire({
                    title: "กรุณาบันทึกหน้าจอ",
                    html:
                      "<span>และแสดงให้กับเจ้าหน้าที<br>เพื่อใช้ยืนยันรับสิทธิ์แลกซื้อ</span>" +
                      '<div class="flex justify-between mt-[2rem] justify-item-center w-[100%] px-[5px] rounded-lg border-[1px] p-[5px] text-[#B0B0B0]"><p>Order number :</p> ' +
                      "<span class='text-[#B0B0B0]'>" +
                      response.trade_number + // Here, concatenate the response.trade_number correctly
                      "</span></div>",
                    icon: "",
                    confirmButtonText: "ปิด",
                    customClass: {
                      confirmButton:
                        "mt-[2rem] mb-[-2rem] w-[100%] h-[30px] rounded-[3px] bg-cyan-500 border-1 border-[#28B7E1] text-[#fff] flex justify-center items-center",
                      title: "mt-[-3rem]",
                    },
                    buttonsStyling: false,
                    padding: "4rem 2rem",
                    allowOutsideClick: false, // ไม่อนุญาตให้คลิกภายนอกต่างๆ
                    showLoaderOnConfirm: true, // Show loader animation on confirm button
                    preConfirm: () => {
                      // Simulate some processing time (e.g., AJAX request)
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          resolve();
                        }, 3000); // Simulating 2 seconds of processing time
                      });
                    },
                  }).then((result) => {
                    // Check if the "ปิด" button was clicked
                    if (result.isConfirmed) {
                      // Reload the website after processing is done
                      location.reload();
                    }
                  });
                }
              } else if (response.type === "shipping") {
                Swal.fire({
                  title: "ต้องการแลกสิทธิ์หรือไม่?",
                  text: "เมื่อกดปุ่ม 'ยืนยัน' ท่านจะไม่สามารถแก้ไขข้อมูลได้",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "ปิด",
                  confirmButtonText: "ยืนยัน",
                }).then((result) => {
                  if (result.isConfirmed) {
                    console.log("หากกดยืนยัน ");
                    Swal.fire({
                      title: "แลกสิทธิ์สำเร็จ!",
                      text: "การแลกสิทธิ์ของคุณได้รับการยืนยันแล้ว",
                      icon: "success",
                      confirmButtonColor: "#3085d6",
                      confirmButtonText: "ปิด",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        console.log("กดปิด จะปิด Modal");
                      }
                    });
                  } else {
                    console.log("Modal would be closed");
                  }
                });
                location.reload();
              }

              // Directly hide the modal by changing its style
              document.getElementById("modalpreview").style.display = "none";
              // Optionally, clear the form or take other actions
            });

            // Optionally, clear the form or take other actions
          });

          var customerTrade = {
            url: `https://games.myworld-store.com/api/trades/customer/${customer_id}`,
            method: "GET",
            timeout: 0,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
            },
          };

          try {
            $.ajax(customerTrade)
              .done(function (response) {
                if (Array.isArray(response)) {
                  let tableBody = $("tbody"); // Assuming you have a <tbody> element in your HTML
                  let rowNumber = 0; // Initialize the row number counter
                  let merchandiseId = $("#merchandiseId").val();

                  response.forEach(function (Tradeorder, index) {
                    let Time = moment
                      .tz(Tradeorder.created_at, "Asia/Bangkok")
                      .format("DD/MM/YYYY HH:mm:ss");
                    let Type = Showtype(Tradeorder.type);
                    let ApproveProduct = getApproveStatus(
                      Tradeorder.approve_status
                    );
                    let ApproveProductText = ApproveProduct.circle.text();
                    let bgColor = ApproveProduct.bgColor;
                    let circleClass = ApproveProduct.circleClass; // Retrieve circleClass from the result of getApproveStatus
                    let Shipment = getShipmentstatus(
                      Tradeorder.shipment_status
                    );
                    let ShipmemtText = Shipment.Shipments.text();
                    let ShipmentClass = Shipment.ShipmentClass;
                    let bgShipment = Shipment.bgColor;
                    console.log(circleClass);
                    let additionalClasses = "";
                    let Shipmemttext = "";

                    // Check if bgColor is "bg-red-400", if true, add "text-white" class
                    if (bgColor === "bg-red-400") {
                      additionalClasses = "text-white";
                    }
                    if (bgShipment === "bg-red-400") {
                      Shipmemttext = "text-white";
                    }
                    const ContenTradeing = `
                    <div class="grid border-[#DBDBDB] px-3 py-6 mb-6 gap-2 shadow-lg">
                    <div class="flex justify-between">
                      <h1 class="text-2xl">${Tradeorder.trade_number}</h1>
                        <div class="flex gap-2 items-center ${bgColor} rounded-full py-1 px-2">
                        <div class="${circleClass} h-4 w-4 rounded-full"></div>
                        <h1 class="${additionalClasses}">${ApproveProductText}</h1>
                        </div>
                    </div>
                      <div class="flex gap-2">
                      
                        <p class="text-[#B3B3B3] text-xl">วันที่แลกซื้อ :</p> <p class="text-xl">${Time}</p>
                      </div>
                      <div class="flex gap-2">
                        <p class="text-[#B3B3B3] text-xl">Product :</p> <p class="text-xl">${Tradeorder.merchandise.name}</p>
                      </div>
                      <div class="flex gap-2">
                        <p class="text-[#B3B3B3] text-xl">จำนวน Point ที่แลก :</p> <p class="text-xl">${Tradeorder.merchandise.point}</p>
                      </div>

                    <div class="flex justify-between">
                      <div class="flex gap-2">
                        <p class="text-[#B3B3B3] text-xl">การรับของ :</p> <p class="text-xl">${Type}</p>
                      </div>
                      <div class="flex items-center gap-2">
                        <p class="text-[#B3B3B3] text-xl">การตรวจสอบ :</p> 
                        <div class="flex gap-2 items-center ${bgShipment} rounded-full py-1 px-2">
                          <div class="${ShipmentClass} h-4 w-4 rounded-full"></div>
                          <h1 class="${Shipmemttext}">${ShipmemtText}</h1>
                        </div>
                      </div>
                    </div>
                    </div>
                    `;
                    $("#TradeHistory").append(ContenTradeing);
                  });
                  // ... rest of your code ...
                }
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX request failed:", textStatus, errorThrown);
              });
          } catch (e) {
            console.log(e);
          }

          const Showtype = (type) => {
            if (type === "onsite") {
              return "รับหน้าบูธ";
            } else if (type === "shipping") {
              return "จัดส่ง";
            } else {
              return type; // คืนค่า type ตามที่ได้รับ หากไม่ตรงกับเงื่อนไขใดๆ
            }
          };

          function getShipmentstatus(Shipstatus) {
            let ShipmentClass;
            let bgColor;
            // Create the status circle element

            // Depending on the status, change the color of the circle
            if (Shipstatus === "pending") {
              ShipmentClass = "bg-[#F1BC00]";
              bgColor = "bg-[#F4EBCB]";
              // Set the text and background color for the Shipstatus cell if it's "Shipping"
              return {
                Shipments: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid red",
                    color: "red",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("รอดำเนินการ")),
                ShipmentClass: ShipmentClass,
                bgColor: bgColor,
              };
            }
            if (Shipstatus === "complete") {
              ShipmentClass = "bg-[#1FD831]";
              bgColor = "bg-[#CBF4CC]";
              // Set the text and background color for the Shipstatus cell if it's "Shipping"
              return {
                Shipments: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid #1AA127",
                    color: "#1AA127",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("จัดส่งสำเร็จ")),
                ShipmentClass: ShipmentClass,
                bgColor: bgColor,
              };
            }
            if (Shipstatus === "cancel") {
              ShipmentClass = "bg-red-700";
              bgColor = "bg-red-400";
              // If Shipstatus is not "Shipping", handle other Shipstatuses here
              // For the sake of example, let's assume it's "Complete"
              return {
                Shipments: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid red",
                    color: "red",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("ยกเลิกจัดส่ง")),
                ShipmentClass: ShipmentClass,
                bgColor: bgColor,
              };
            }
            return Shipstatus;
          }

          function getApproveStatus(Approvestatus) {
            let circleClass; // Define circleClass here
            let bgColor;

            // Depending on the status, change the color of the circle
            if (Approvestatus === "pending") {
              circleClass = "bg-[#F1BC00]";
              bgColor = "bg-[#F4EBCB]";
              // Set the text and background color for the Approvestatus cell if it's "Shipping"
              return {
                circle: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid red",
                    color: "red",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("รอดำเนินการ")),
                circleClass: circleClass,
                bgColor: bgColor,
              };
            }

            if (Approvestatus === "complete") {
              circleClass = "bg-[#1FD831]";
              bgColor = "bg-[#CBF4CC]";

              // Set the text and background color for the Approvestatus cell if it's "Shipping"
              return {
                circle: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid red",
                    color: "red",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("ตรวจสอบแล้ว")),
                circleClass: circleClass,
                bgColor: bgColor,
              };
            }
            if (Approvestatus === "cancel") {
              circleClass = "bg-red-700";
              bgColor = "bg-red-400";
              return {
                circle: $("<div>")
                  .css({
                    display: "flex",
                    padding: "5px 3px",
                    border: "1px solid red",
                    color: "red",
                    gap: "7px",
                    "align-items": "center",
                    "justify-content": "center",
                  })
                  .append(document.createTextNode("ยกเลิกสิทธิ์")),
                circleClass: circleClass,
                bgColor: bgColor,
              };
            }
            return Approvestatus;
          }
          // $.ajax(customerTrade).done(function (response) {
          //   console.log(response);
          //   response.forEach(function (Trading) {
          //     if (selectedMerchandiseId === Trading.merchandise_id) {
          //       const merchandiseid = Trading.merchandise_id;
          //       console.log(selectedMerchandiseId, merchandiseid);
          //       const alttrade = Trading.trade_number;
          //       const Trade_id = Trading.trade_id;
          //       console.log(alttrade, Trade_id);
          //     }
          //   });
          // });

          // Api 204 All GetOrder

          let GetOrders = {
            url: `https://games.myworld-store.com/api/orders/customer/${customer_id}`,
            method: "GET",
            timeout: 0,
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
            },
          };
          try {
            $.ajax(GetOrders)
              .done(function (response) {
                if (Array.isArray(response)) {
                  let tableBody = $("tbody"); // Assuming you have a <tbody> element in your HTML
                  let rowNumber = 0; // Initialize the row number counter
                  

                  response.forEach(function (order, index) {
                    order.orderItems.forEach(function (item) {
                      let statusElement = getStatusElement(
                        order.shipmentStatus
                      );
                      let Statustext = statusElement.circle.text();
                      const Ordercontent = `
                                            <div class="grid border-[#DBDBDB] p-2 gap-2 shadow-md">
                                <div class="flex justify-between">
                                  <div class="flex gap-2">
                                    <p class="text-[#B3B3B3]">Order :</p> <p>${order.orderNumber}</p>
                                  </div>
                      <!-- Status -->
                                      <h1>${Statustext}</h1>
                      <!-- ------- -->
                                </div>
                                  <div class="flex gap-2">
                                    <p class="text-[#B3B3B3]">Name :</p> <p>Peter Parker</p>
                                  </div>
                                  <div class="flex gap-2">
                                    <p class="text-[#B3B3B3]">Product :</p> <p>${item.name}</p>
                                  </div>
                                          
                                <div class="flex justify-between">
                                  <div class="flex gap-2">
                                    <p class="text-[#B3B3B3]">Amount :</p> <p>${order.discountAmount}</p>
                                  </div>
                                  <div class="flex items-center gap-2">
                                    <p class="text-[#B3B3B3]">Price (THB) :</p> 
                      <!-- Status -->
                                    <div class="flex gap-1 items-center bg-[#CBF4CC] rounded-full py-1 px-2">
                                      <div class="bg-[#1FD831] h-4 w-4 rounded-full"></div>
                                      <h1>${order.totalPrice}</h1>
                                    </div>
                      <!-- ------ -->
                                  </div>
                                </div>
                            </div>
                      `;
                      let row = $("<tr>").addClass(
                        "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      );

                      row.append(
                        $("<td>")
                          .addClass("px-6 py-4")
                          .text(index + 1)
                      ); // Order number
                      row.append(
                        $("<td>").addClass("px-6 py-4").text(order.orderNumber)
                      );
                      // row.append(
                      //   $("<td>")
                      //     .addClass("px-6 py-4")
                      //     .text(order.shippingAddress.recipientName)
                      // );
                      row.append(
                        $("<td>").addClass("px-6 py-4").text(item.name)
                      );
                      row.append(
                        $("<td>")
                          .addClass("px-6 py-4")
                          .text(order.discountAmount)
                      );
                      row.append(
                        $("<td>").addClass("px-6 py-4").text(order.totalPrice)
                      );
                    
                      row.append(
                        $("<td>").addClass("px-6 py-4").append(statusElement)
                      );

                      // ... append other cells ...

                      $("#OrderHistory").append(Ordercontent);
                    });
                  });
                  // ... rest of your code ...
                }
              })
              .fail(function (jqXHR, textStatus, errorThrown) {
                console.error("AJAX request failed:", textStatus, errorThrown);
              });
          } catch (e) {
            console.log(e);
          }

          function getStatusElement(status) {
            // Create the status circle element
            let circle = $("<span>").addClass("status-circle");

            // Depending on the status, change the color of the circle
            if (status === "SHIPMENT_READY") {
              circle.css({
                display: "flex",
                width: "15%",
                height: "16px",
                "border-radius": "50%",
                "background-color": "#8349CD",
                position: "relative",
                "align-items": "center",
                "align-items": "center",
                "justify-content": "center",
              });
              // Set the text and background color for the status cell if it's "Shipping"
              return $("<div>")
                .css({
                  display: "flex",
                  "background-color": "#F0E7FC",
                  padding: "5px 0px",
                  "border-radius": "100px",
                  color: "#8349CD",
                  gap: "7px",
                  "align-items": "center",
                  "justify-content": "center",
                })
                .append(circle)
                .append(document.createTextNode("เตรียมจัดส่ง"));
            } else if (status === "ON_DELIVERY") {
              circle.css({
                display: "flex",
                width: "15%",
                height: "16px",
                "border-radius": "50%",
                "background-color": "#F1BC00",
                position: "relative",
                "align-items": "center",
                "justify-content": "center",
              });
              // Set the text and background color for the status cell if it's "Shipping"
              return $("<div>")
                .css({
                  display: "flex",
                  "background-color": "#F4EBCB",
                  padding: "5px 0px",
                  color: "#F1BC00",
                  "border-radius": "100px",
                  gap: "7px",
                  "align-items": "center",
                  "justify-content": "center",
                })
                .append(circle)
                .append(document.createTextNode("กำลังจัดส่ง"));
            } else if (status === "SHIPPED_ALL") {
              circle.css({
                display: "flex",
                width: "15%",
                height: "16px",
                "border-radius": "50%",
                "background-color": "#1FD831",
                position: "relative",
                "align-items": "center",
                "justify-content": "center",
              });
              // Set the text and background color for the status cell if it's "Shipping"
              return $("<div>")
                .css({
                  display: "flex",
                  "background-color": "#CBF4CC",
                  padding: "5px 0px",
                  color: "#1FD831",
                  "border-radius": "100px",
                  gap: "7px",
                  "align-items": "center",
                  "justify-content": "center",
                })
                .append(circle)
                .append(document.createTextNode("จัดส่งแล้ว"));
            }
            if (status === "PENDING") {
              circle.css({
                display: "flex",
                width: "15%",
                height: "16px",
                "border-radius": "50%",
                "background-color": "#DE6914",
                position: "relative",
                "align-items": "center",
                "justify-content": "center",
              });
              // Set the text and background color for the status cell if it's "Shipping"
              return $("<div>")
                .css({
                  display: "flex",
                  "background-color": "#FFEEE2",
                  padding: "5px 0px",
                  color: "#DE6914",
                  "border-radius": "100px",
                  gap: "7px",
                  "align-items": "center",
                  "justify-content": "center",
                })
                .append(circle)
                .append(document.createTextNode("รอดำเนินการ"));
            }
            if (status === "NO_SHIPMENT") {
              circle.css({
                display: "flex",
                width: "15%",
                height: "16px",
                "border-radius": "50%",
                "background-color": "#6D6D6D",
                position: "relative",
                "align-items": "center",
                "justify-content": "center",
              });
              // Set the text and background color for the status cell if it's "Shipping"
              return $("<div>")
                .css({
                  display: "flex",
                  "background-color": "#E2E2E2",
                  padding: "5px 0px",
                  color: "#6D6D6D",
                  "border-radius": "100px",
                  gap: "7px",
                  "align-items": "center",
                  "justify-content": "center",
                })
                .append(circle)
                .append(document.createTextNode("ยังไม่จัดส่ง"));
            }
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Error processing profile:", error);
    }
  } catch (error) {
    console.error("Error during AJAX request:", error);
  }
}


document.addEventListener('DOMContentLoaded', async function() {

  try {
    // Initialize LIFF
    liff.ready.then(() => {
      if (liff.isLoggedIn()) {
        console.log('User is logged in. Fetching user profile...');
        fetchUserProfile();
      } else {
        console.log('User is not logged in. Redirecting to login...');
        liff.login({
          redirectUri: "https://liff.line.me/2002643017-EN5j2n0d"
        })
        .catch((error) => {
          console.error('Error during login:', error);
          alert('Error during login. Please try again.');
        });
      }
    });
  } catch (error) {
    console.error('Error initializing LIFF:', error);
    alert('Error initializing app. Please try again.');
    // Redirect to the specified URL if initialization fails
  }
});