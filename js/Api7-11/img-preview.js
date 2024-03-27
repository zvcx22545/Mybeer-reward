const uploadImgInput = document.getElementById('upload-img');
const imgPreview = document.getElementById('img-preview');

uploadImgInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                const maxWidth = 160;
                const maxHeight = 160;

                const width = img.width;
                const height = img.height;

                let newWidth = width;
                let newHeight = height;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > height) {
                        newWidth = maxWidth;
                        newHeight = maxWidth / aspectRatio;
                    } else {
                        newHeight = maxHeight;
                        newWidth = maxHeight * aspectRatio;
                    }
                }

                imgPreview.style.backgroundImage = `url(${e.target.result})`;
                imgPreview.style.backgroundSize = `${newWidth}px ${newHeight}px`;
                imgPreview.style.backgroundPosition = 'top';
                imgPreview.style.backgroundRepeat = 'no-repeat';
                imgPreview.textContent = ''; // Clear the default text

                // Add click event listener to imgPreview to open the modal
                imgPreview.onclick = () => {
                    openImageModal(e.target.result);
                };
            };
        };

        reader.readAsDataURL(file);
    } else {
        imgPreview.style.backgroundImage = 'none';
        imgPreview.style.backgroundSize = 'auto';
        imgPreview.textContent = '100*100';
    }
});

function openImageModal(imageSrc) {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '50%'; // Set max width to prevent image from being too large
    img.style.maxHeight = '80%'; // Set max height to prevent image from being too large
    img.style.margin = 'auto'; // Center the image inside the modal

    modal.appendChild(img);

    modal.onclick = () => {
        modal.remove(); // Remove modal when clicked
    };

    document.body.appendChild(modal);
}
