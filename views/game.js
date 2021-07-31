function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

const template = document.querySelector("#coloredCox")
const container = document.querySelector("#gridContainer")
const SIZE = 6

for (let i = 0; i < SIZE; i++) {
    console.log("i: ", i)
    const clonedBox = template.content.cloneNode(true)
    const clonedDiv = clonedBox.querySelector(".colored-box")
    clonedDiv.style.backgroundColor = `rgb(${getRandomInt(255)}, ${getRandomInt(255)}, ${getRandomInt(255)})`
    console.log("clonedDiv: ", clonedDiv.style)
    container.append(clonedBox)
}
