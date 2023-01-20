function changeImage() {
    var imm = document.getElementById("audio")
    var aud = document.getElementById('lofi')
    aud.muted = !aud.muted;
    if (imm.getAttribute('src') == "./images/vol-on.png"){
        imm.src = './images/vol-off.png';
    } else {
        imm.src = './images/vol-on.png';
    }
}