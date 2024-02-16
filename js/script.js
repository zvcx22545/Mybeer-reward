let preveiwContainer = document.querySelector('.products-preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');
// let SumbitModal = preveiwContainer.querySelectorAll('#submit-modal');

document.querySelectorAll('.products-container').forEach(product =>{
  product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
      let target = preview.getAttribute('data-target');
      if(name == target){
        preview.classList.add('active');
      }
    });
  };
});

previewBox.forEach(close =>{
  close.querySelector('.fa-times').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
  };
});

const btn = document.querySelector("button[aria-expanded='false']");
        const menu = document.querySelector("#mobile-menu");
        
        btn.addEventListener('click', () => {
          const expanded = btn.getAttribute('aria-expanded') === 'true'|| false;
          
          btn.setAttribute('aria-expanded', !expanded);
          menu.classList.toggle('hidden');
        });
      
        // Javascript to handle user profile dropdown toggling
        const userMenuBtn = document.querySelector('button#user-menu');
        const userMenu = document.querySelector('div[role="menu"]');
      
        userMenuBtn.addEventListener('click', () => {
          userMenu.classList.toggle('hidden');
        });
      
        // Click outside to close the user menu
        window.addEventListener('click', function(e){
          if (!userMenuBtn.contains(e.target)){
            userMenu.classList.add('hidden');
          }
        });



        