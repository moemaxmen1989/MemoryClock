document.getElementById("btn1").addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("btn1").classList.add("before")
    document.getElementById("btn2").classList.remove("before")
    document.getElementById("input1").classList.remove("before")
})

document.getElementById("btn2").addEventListener("click", (e) => {
    e.preventDefault()

    document.getElementById("btn2").classList.add("before")
    document.getElementById("input1").classList.add("before")
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
