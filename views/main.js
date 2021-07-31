document.getElementById("btn1").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("btn1").classList.add("before")
    document.getElementById("btn2").classList.remove("before")
    document.getElementById("input1").classList.remove("before")

    game.advanceGameState()
})

document.getElementById("btn2").addEventListener("click", (e) => {
    e.preventDefault()

    const button2 = document.getElementById("btn2")
    const input1 = document.getElementById("input1")

    if (game.setPlayerName(input1.value)) {
        game.advanceGameState()
        input1.classList.remove("error")
        input1.classList.add("before")
        button2.classList.add("before")
    } else {
        input1.classList.add("error")
    }
})
// hamburger menu
function myFunction() {
    var x = document.getElementById("myLinks")
    if (x.style.display === "block") {
        x.style.display = "none"
    } else {
        x.style.display = "block"
    }
}
