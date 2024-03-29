function Showalerts(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon || "error",
      confirmButtonText: "ตกลง",
    });
  }

  //Validate Phone number

  function setupInputValidation(phoneCaptainId) {
   
    var phoneCaptain = document.getElementById(phoneCaptainId);
    //   var emailCaptian = document.querySelector('input[name="emailCaptian"]');
    //   var AgeInput = document.querySelector('input[name="age"]');

    if (phoneCaptain) {
      phoneCaptain.oninput = function () {
        this.value = this.value.replace(/\D/g, "");
      };
      phoneCaptain.onblur = function () {
        var value = this.value;
        if (value.length !== 10) {
          Showalerts("แจ้งเตือน!", "กรุณากรอกเบอร์โทรให้ถูกต้อง", "error");
          this.value = value.slice(0, 10);
        }  
       
      };
    }

  }

setupInputValidation("Telephone")



  