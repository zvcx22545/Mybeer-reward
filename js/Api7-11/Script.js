document.addEventListener("DOMContentLoaded", function() {
    // โค้ดสำหรับ select element แรก
    var selectBox = document.getElementById("selectBox");
    var icon1 = document.getElementById("icon1");
    var lastSelectedOption = null;

    // เมื่อคลิกที่ select element แรก
    document.addEventListener("click", function(event) {
        var isClickInsideSelect = selectBox.contains(event.target);
        var isClickOnIcon = event.target === icon1;
        if (isClickInsideSelect && !isClickOnIcon) {
            icon1.style.transform = "rotate(180deg)";
        } else {
            icon1.style.transform = "rotate(0deg)";
        }
    });

    // เมื่อมีการเลือก option ใน select element แรก
    selectBox.addEventListener("change", function() {
        var selectedOption = selectBox.options[selectBox.selectedIndex];
        if (selectedOption !== lastSelectedOption) {
            setTimeout(function() {
                icon1.style.transform = "rotate(0deg)";
            }, 10); 
        }
        lastSelectedOption = selectedOption;
    });


    // โค้ดสำหรับ select element ที่สอง
    var sellerSelectBox = document.getElementById("sellerSelectBox");
    var icon2 = document.getElementById("icon2");
    var sellerLastSelectedOption = null;

    // เมื่อคลิกที่ select element ที่สอง
    document.addEventListener("click", function(event) {
        var isClickInsideSelect = sellerSelectBox.contains(event.target);
        var isClickOnIcon = event.target === icon2;
        if (isClickInsideSelect && !isClickOnIcon) {
            icon2.style.transform = "rotate(180deg)";
        } else {
            icon2.style.transform = "rotate(0deg)";
        }
    });

    // เมื่อมีการเลือก option ใน select element ที่สอง
    sellerSelectBox.addEventListener("change", function() {
        var selectedOption = sellerSelectBox.options[sellerSelectBox.selectedIndex];
        if (selectedOption !== sellerLastSelectedOption) {
            setTimeout(function() {
                icon2.style.transform = "rotate(0deg)";
            }, 10); 
        }
        sellerLastSelectedOption = selectedOption;
    });


});










// const selectBox = document.getElementById('selectBox');
//     const selectedOption = document.getElementById('selectedOption');
//     selectBox.addEventListener('change', function() {
//         selectedOption.textContent = this.options[this.selectedIndex].textContent;
//     });
// const selectBox1 = document.getElementById('sellerSelectBox');
//     const selectedOption1 = document.getElementById('selectedOption1');
//     selectBox1.addEventListener('change', function() {
//         selectedOption1.textContent = this.options[this.selectedIndex].textContent;
//     });
const priceInput = document.getElementById('Price');
    priceInput.addEventListener('blur', function(event) {
        this.value = parseFloat(this.value).toFixed(2);
    });