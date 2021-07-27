

const play = document.getElementById("playbutton");
const start = document.getElementById("start");

play.addEventListener('click', (e)=>{
e.preventDefault();
document.getElementById("form").classList.remove("before");
document.getElementById("start").classList.remove("before");
play.classList.add("before")
})

document.getElementById("main-form").addEventListener('submit', (e)=>{

e.preventDefault();


document.getElementById("pause").classList.remove("before");
document.getElementById("form").classList.add("before");
document.getElementById("start").classList.add("before");

})

document.getElementById("pause").addEventListener('click',(e)=>{
e.preventDefault();

})

