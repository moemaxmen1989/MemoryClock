

const play = document.getElementById("playbutton");


play.addEventListener('click', (e)=>{

e.preventDefault();
document.getElementById("form").classList.remove("before");
play.innerHTML = "<a> Start </a>";

})