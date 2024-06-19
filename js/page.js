document.addEventListener('DOMContentLoaded', function() {
  const tradingBtn = document.getElementById('trading');
  const orderHistoryBtn = document.getElementById('order-History');
  const orderTrandingBtn = document.getElementById('order-Trading');
  const productsContainer = document.getElementById('contents-product');
  const tableHs = document.getElementById('table-hs');
  const tableTd = document.getElementById('table-td');
  const submitmodal = document.getElementById('submit-modal1');
  const submitmodal2 = document.getElementById('submit-modal2');
  const formdata = document.getElementById('form-check2');
  const checked1 = document.getElementById('bordered-radio-1');
  const checked2 = document.getElementById('bordered-radio-2');
  const preveiwContainer = document.querySelector('.products-preview');

  // กำหนดคลาสเริ่มต้นสำหรับการซ่อน productsContainer
  // productsContainer.classList.add('hidden');
  tableTd.style.display = 'none';
  tableHs.style.display = 'none';
  checked1.checked = true;
  formdata.classList.add('hidden');
  submitmodal.classList.add('hidden');

  // ตัวแปรสถานะเพื่อเก็บการคลิกของ submitmodal และ submitmodal2
  let isSubmitModalClicked = false;
  let isSubmitModal2Clicked = false;

  checked1.addEventListener('change', () => {
    formdata.classList.add('hidden');
    submitmodal.classList.add('hidden');
    submitmodal2.classList.remove('hidden');
  });

  checked2.addEventListener('change', () => {
    formdata.classList.remove('hidden');
    submitmodal2.classList.add('hidden');
    submitmodal.classList.remove('hidden');
  });

  tradingBtn.addEventListener('click', function() {
    document.getElementById('trading').classList.add('active');
    document.getElementById('order-History').classList.remove('active');
    document.getElementById('order-Trading').classList.remove('active');
    productsContainer.classList.remove('hidden');
    tableHs.style.display = 'none';
    tableTd.style.display = 'none';
  });

  orderTrandingBtn.addEventListener('click', function() {
    document.getElementById('order-Trading').classList.add('active');
    document.getElementById('trading').classList.remove('active');
    document.getElementById('order-History').classList.remove('active');
    productsContainer.classList.add('hidden');
    tableHs.style.display = 'none';
    tableTd.style.display = 'block';
  });

  orderHistoryBtn.addEventListener('click', function() {
    document.getElementById('order-History').classList.add('active');
    document.getElementById('trading').classList.remove('active');
    document.getElementById('order-Trading').classList.remove('active');
    productsContainer.classList.add('hidden');
    tableHs.style.display = 'block';
    tableTd.style.display = 'none';
  });

  // เพิ่ม event listener สำหรับ submitmodal
  submitmodal.addEventListener('click', function() {
    if (!isSubmitModalClicked) {
      isSubmitModalClicked = true;
      // ดำเนินการเพิ่มเติมที่คุณต้องการทำเมื่อ submitmodal ถูกคลิก
      this.classList.add('disabled'); // ปิดการทำงานของปุ่ม
    }
  });

  // เพิ่ม event listener สำหรับ submitmodal2
  submitmodal2.addEventListener('click', function() {
    if (!isSubmitModal2Clicked) {
      isSubmitModal2Clicked = true;
      this.textContent('กำลังบันทึก...');
      // ดำเนินการเพิ่มเติมที่คุณต้องการทำเมื่อ submitmodal2 ถูกคลิก
      this.classList.add('disabled'); // ปิดการทำงานของปุ่ม
    }
  });
});
