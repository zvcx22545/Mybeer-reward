
$(document).ready(function () {
  // Initial API calls to populate dropdowns
  // (Your GetProduct and GetAdmin AJAX calls here)

  // Form submission handler
  $("#form-submit").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect user input
    let phone = $("#Telephone").val();
    let Customer_id = $("#userid").val(); // Assuming this is how you get the selected admin ID
    let mainProductId = $("#selectBox").val();
    let products = []; // Array to hold all products

    // Iterate over all product fields
    $(".container-form").each(function () {
      let productId = $(this).find(".select-Box").val(); // Adjust selector as needed
      let price = parseInt($(this).find(".Price").val()); // Adjust selector as needed
      if (productId && !isNaN(price)) {
        products.push({ id: productId, price: price });
      }
    });

    if (mainProductId) {
      // Add the main product with its details to the products array
      // You might need to adjust this to include a default price or fetch the price from another input if applicable
      let mainProductPrice = parseInt($("#Price").val()); // Assuming there's a price input for the main product
      if (!isNaN(mainProductPrice)) {
        // Check if main product price is a valid number
        products.push({ id: mainProductId, price: mainProductPrice });
      }
    }
    console.log(products);

    let imageUrl = null; // Initial imageUrl

    let fileInput = document.getElementById("upload-img");
    if (fileInput.files.length > 0) {
      let formData = new FormData();
      formData.append("file", fileInput.files[0]);

      // Adjusted Image Upload AJAX call
      let Uploadfile = {
        url: "https://games.myworld-store.com/api/upload/file",
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
      };

      $.ajax(Uploadfile)
        .done(function (response) {
          // Assuming the response is JSON and contains a property named 'url'
          let jsonResponse = JSON.parse(response); // Parse the response as JSON
          imageUrl = jsonResponse.url; // Extract the image URL

          // Now that you have the imageUrl, proceed to submit form data
          submitFormData(phone, Customer_id, products, imageUrl);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.error("Error uploading image:", textStatus, errorThrown);
          // You can still submit the form without an image URL if necessary
          submitFormData(phone, Customer_id, products, imageUrl);
        });
    } else {
      // No image to upload, proceed to submit form data
      submitFormData(phone, Customer_id, products, imageUrl);
    }
  });

  function submitFormData(phone, Customer_id, products, imageUrl) {
    // Prepare data for Submitform API
    let data = {
      phone: phone,
      customer_id: Customer_id,
      slip_image_url: imageUrl,
      products: products,
    };
    console.log(data);
    // Submitform API AJAX call
    $.ajax({
      url: "https://games.myworld-store.com/api-dev/orders/storefrontTransaction",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
      },
      data: JSON.stringify(data),
      success: function (response) {
        console.log("Form submitted successfully:", response);
        SuccessOnSubmit();

        // Handle success, maybe show a success message or redirect
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error submitting form:", textStatus, errorThrown);
        // Handle error
      },
    });
  }

  const SuccessOnSubmit = () => {
    const processLoading = document.getElementById("processLoading");
    const successDiv = document.getElementById("success");
    const closeBTN = document.getElementById("closeSuccess");
    const form = document.getElementById("form-submit");
    const top = document.getElementById("top-contents");
    const sentButton = document.getElementById("sent"); // Ensure this button exists in your HTML

    // Immediately show loading, hide form and top contents
    processLoading.style.display = "flex";
    form.style.display = "none";
    top.style.display = "none";

    // After a delay (e.g., simulating processing time or waiting for a background task)
    setTimeout(() => {
      // Hide loading, show success message and the close button
      processLoading.style.display = "none";
      successDiv.style.display = "block";
      closeBTN.style.display = "flex"; // 'none' followed by 'flex' seems redundant, just set to 'flex'

      // Countdown and potential page reload logic here
      let countdown = 3;
      let countdownButton = document.getElementById("countdownButton");
      countdownButton.innerText = "( " + countdown + " ) ปิด";

      let countdownInterval = setInterval(function () {
        countdown--;
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          countdownButton.innerText = "เสร็จสิ้น";
          setTimeout(function () {
            location.reload(); // Or redirect as needed
          }, 1000);
        } else {
          countdownButton.innerText = "( " + countdown + " ) ปิด";
        }
      }, 1000);
    }, 5000);
  };

  const paymentValue = (Paymentinput) => {
    let paymentInput = document.getElementById(Paymentinput);
    if (paymentInput.files.length > 0) {
      console.log("Payment is successfuly");
    } else {
      showAlert("แจ้งเตือน!", "กรุณาอัพโหลดสลิปชำระเงิน", "error");
    }
  };

  let checkPayment = document.getElementById("sent"); // Corrected letiable name
  checkPayment.addEventListener("click", function () {
    paymentValue("upload-img");
  });
});

//Api 701

var GetProduct = {
    "url": "https://games.myworld-store.com/api-dev/options/storeFrontProduct",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
    },
  };

  $.ajax(GetProduct)
  .done(function (response) {
    // Clear previous options
    $("#selectBox").empty();

    // Add default option
    $("#selectBox").append(
      '<option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>'
    );

    // Iterate over each option in the response
    response.forEach(function (option) {
      // Append option to select box
      let displayName =
        option.name.length > 50
          ? option.name.slice(0, 50) + "..."
          : option.name;
      $("#selectBox").append(
        '<option value="' + option.id + '">' + displayName + "</option>"
      );
    });

    // Set the initial price value based on the first option
    if (response.length > 0) {
      // Format the initial price value
      let initialPrice = parseFloat(0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      $('#Price').val(initialPrice);
    }

    // Handle change event on select box
    $("#selectBox").change(function() {
      // Get the selected option id
      let selectedId = $(this).val();
      
      // Find the corresponding option in the response array
      let selectedOption = response.find(option => option.id == selectedId);
      
      // Set the price to the matched option's price
      if (selectedOption) {
        $("#selectedOption").text(selectedOption.name);
        // Format the price value
        let formattedPrice = parseFloat(selectedOption.price).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        $('#Price').val(formattedPrice);
      }
    });
  })
  .fail(function (xhr, status, error) {
    console.error("Error fetching products:", error);
  });


//Api 702
let GetAdmin = {
    "url": "https://games.myworld-store.com/api/options/admin",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
    },
};
$.ajax(GetAdmin)
  .done(function (response) {
    // Clear previous options
    $("#sellerSelectBox").empty();

    // Add default option
    $("#sellerSelectBox").append(
      '<option value="" disabled selected>ชื่อผู้ขายสินค้า</option>'
    );

    // Add options fetched from API
    response.forEach(function (optionAdmin) {
      $("#sellerSelectBox").append(
        '<option value="' +
          optionAdmin.admin_id +
          '">' +
          optionAdmin.name +
          "</option>"
      );
    });

    // Set the initial selected option name on the span
    
    // Handle change event on select box
    $("#sellerSelectBox").change(function() {
      // Get the selected option id
      let selectedId = $(this).val();
      
      // Find the corresponding option in the response array
      let selectedOption = response.find(option => option.admin_id == selectedId);
      
      // Set the name to the matched option's name
      if (selectedOption) {
        $("#selectedOption1").text(selectedOption.name); // Set the text of the span to the name of the selected option
      }
    });
  })
  .fail(function (xhr, status, error) {
    console.error("Error fetching admins:", error);
  });


// function submitFormData(phone, productId, Customer_id,Price, imageUrl) {
//     // Prepare data for Submitform API
//     let data = {
//         phone: phone,
//         admin_id: adminId,
//         slip_image_url: imageUrl,
//         products: [
//             {
//                 id: productId,
//                 price: Price // This should be dynamically set based on selected product
//             }
//         ]
//     };

//     // Submitform API AJAX call
//     $.ajax({
//         url: "https://games.myworld-store.com/api-dev//orders/shopTransaction",
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
//         },
//         data: JSON.stringify(data),
//         success: function(response) {
//             console.log('Form submitted successfully:', response);
//             // Handle success, maybe show a success message or redirect
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//             console.error('Error submitting form:', textStatus, errorThrown);
//             // Handle error
//         }
//     });
// }
