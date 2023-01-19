function changeImage() {
    var imm = document.getElementById("audio")
    document.getElementById('lofi').muted=!document.getElementById('lofi').muted
    if (imm.getAttribute('src') == "./images/vol-on.png"){
        imm.src = './images/vol-off.png';
    } else {
        imm.src = './images/vol-on.png';
    }
}