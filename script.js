const canvas=document.getElementById('canvas');
const canvasContainer=document.querySelector('.canvas-container');

const ctx=canvas.getContext('2d');
let img= new Image();

document.getElementById('upload').addEventListener('change',function(event){
    const file=event.target.files[0];
    const reader=new FileReader();
    reader.onload=function(e){
        img.src=e.target.result;
    }
        reader.readAsDataURL(file);
});

img.onload=function(){
    canvas.width=img.width;
    canvas.height=img.height;
    ctx.drawImage(img,0,0);
    canvasContainer.style.display='block';
}

function applyFilters() {
    const brightness = document.getElementById('brightness').value;
    const contrast = document.getElementById('contrast').value;
    const saturation = document.getElementById('saturation').value;
    const grayscale = document.getElementById('grayscale').value;

    ctx.filter = `brightness(${100 + parseInt(brightness)}%) contrast(${100 + parseInt(contrast)}%) saturate(${100 + parseInt(saturation)}%) grayscale(${grayscale}%)`;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}  

document.getElementById('brightness').addEventListener('input', applyFilters);
document.getElementById('contrast').addEventListener('input', applyFilters);
document.getElementById('saturation').addEventListener('input', applyFilters);
document.getElementById('grayscale').addEventListener('input', applyFilters);

document.getElementById('download').addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});