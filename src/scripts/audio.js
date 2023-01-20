function changeImage() {
    var imm = document.getElementById("audio")
    if (imm.getAttribute('src') == "./images/vol-on.png"){
        imm.src = './images/vol-off.png';
    } else {
        imm.src = './images/vol-on.png';
    }
}