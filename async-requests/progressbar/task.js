const progressBar = document.getElementById('progress');
const input = document.getElementById('file');
const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", input.files[0]);
    xhr.upload.addEventListener("progress", (e) => showProgress(e));
    xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');
    xhr.send(formData);
})

  function showProgress(e) {
    progress = e.loaded / e.total;
    progressBar.value = progress;
  }