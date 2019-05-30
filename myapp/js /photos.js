let canvas, canvashold, canvas_2d, canvashold_2d, video, videodiv, photodiv, jbimg, santa, bbeardimg;

window.onload = function() {
    jbimg = new Image();
    jbimg.src = "superimpose/image1.png";
    santa = new Image();
    santa.src = "superimpose/image2.png";
    bbeardimg = new Image();
    bbeardimg.src = "superimpose/image3.png";
    canvas = document.getElementById('canvas'); //demo
    canvashold = document.getElementById('canvashold'); //sent to server
    canvas_2d = canvas.getContext('2d');
    canvashold_2d = canvashold.getContext('2d');
    video = document.getElementById('video');
    photodiv = document.getElementById('photodiv');
    videodiv = document.getElementById('videodiv');
    photodiv.style.display = "none";
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            try {
                video.srcObject = stream;
            }
            catch (error) {
                video.src = window.URL.createObjectURL(stream);
            }
            video.play();
        });
    }
    document.getElementById('capture').addEventListener('click', snap);
}

function snap(){
    photodiv.style.display = "block";
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetHeight;
    canvas_2d.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    canvashold.width = video.offsetWidth;
    canvashold.height = video.offsetHeight;
    canvashold_2d.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
    canvashold.style.display = "block";
    canvas.style.display = "none";
    videodiv.style.display = "none";
}

function examplePreview()
{
	var bbeard = document.getElementById("image1");
	var jb = document.getElementById("image2");
    var santa_hat = document.getElementById("image3");
    canvashold_2d.drawImage(canvas, 0, 0);

	if (jb.checked)
	{
        canvashold_2d.drawImage(jbimg,0,0,canvas.width, canvas.height);
	}
    if (bbeard.checked)
    {
        canvashold_2d.drawImage(bbeardimg, (40/100 * canvas.width) , (52 / 100 * canvas.height) , (26/100 * canvas.width) ,(26/100 * canvas.height));
    }
    if (santa_hat.checked) 
    {
		canvashold_2d.drawImage(santa, (40/100 * canvas.width) , (8 / 100 * canvas.height) , (45/100 * canvas.width) ,(45/100 * canvas.height));
	}
}

function savetogallery()
{
    var image = canvas.toDataURL();
    xhr = new XMLHttpRequest();
    var bbeard = document.getElementById("bbeard");
	var jb = document.getElementById("jb");
    var santa_hat = document.getElementById("hat");
    xhr.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.querySelector('#status').innerHTML = this.response;
        }
    }
    xhr.open("post", "modal/savephoto.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("image=" + escape(image) + "&bbeard=" + bbeard.checked  + "&santa=" + santa_hat.checked + "&jb=" + jb.checked + "&width=" + canvas.width + "&height=" + canvas.height);
}
