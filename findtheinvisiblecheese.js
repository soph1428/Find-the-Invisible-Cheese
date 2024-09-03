var cheese = document.getElementById("cheese"),
start = document.getElementById("startButton"),
cheesesfound = document.getElementById("cheesesfound"),
fastesttime = document.getElementById("fastesttime"),
stopwatch = document.getElementById("stopwatch"),
cNote = document.createElement("audio"), stopwatchInterval = "",
yum = document.createElement("audio"), distance = ""
cNote.volume = 0, yum.src = `yum.mp3`
if (localStorage.getItem("Cheeses Found")) {
    cheesesfound.textContent = `Cheeses Found: ${localStorage.getItem("Cheeses Found")}`
} if (localStorage.getItem("Fastest Time")) {
    fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
} function changeDistances(x, y) {
    var xDifference = x, yDifference = y
    distance = Math.sqrt(xDifference * xDifference + yDifference * yDifference)
} start.onclick = function(e) {
    start.style.display = "none"
    document.getElementById(`directions`).style.display = "none"
    cNote.src = "cNote.mp3", cNote.loop = true, cNote.play()
    startStopwatch(), cheese.style.left = `${Math.floor(Math.random() * ((innerWidth - cheese.width) + 1))}px`
    cheese.style.top = `${Math.floor(Math.random() * ((innerHeight - cheese.height) + 1))}px`
    move(e)
}; document.addEventListener("mousemove", move)
document.querySelectorAll(`*`).forEach(elem => elem.addEventListener(`mousemove`, function() {
    if (cNote.volume != 1) elem.style.cursor = `unset`
}))
document.addEventListener("touchmove", (e) => {move(e.targetTouches[0])})
document.addEventListener("touchend", () => {cNote.volume = 0})
function move(e) {
    e.target.style.cursor = "unset"
    if (cNote.loop) {
        changeDistances(Number(cheese.style.left.slice(0, cheese.style.left.length - 2)) + cheese.width / 2 - e.clientX,
        Number(cheese.style.top.slice(0, cheese.style.top.length - 2)) + cheese.height / 2 - e.clientY)
        if (distance > 500) cNote.volume = 0.1
        else if (distance < 400 && distance > 300) cNote.volume = 0.3
        else if (distance < 200 && distance > 100) cNote.volume = 0.6
        else if (distance < cheese.width / 3) {
            cNote.volume = 1
            e.target.style.cursor = "pointer"
        }
    }
} function startStopwatch() {
    var ones = true, tens = false, mins = false
    stopwatchInterval = setInterval(() => {
        if (ones) {stopwatch.textContent = `Stopwatch: ${stopwatch.textContent.slice(11, stopwatch.textContent.length - 1)}${Number(stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length)) + 1}`
            if (stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length) == "9") {
                ones = false, tens = true
            } if (stopwatch.textContent.slice(stopwatch.textContent.length - 2, stopwatch.textContent.length) == "59") {
                ones = false, tens = false, mins = true
            }
        } else if (tens) {stopwatch.textContent = `Stopwatch: ${stopwatch.textContent.slice(11, stopwatch.textContent.length - 2)}${Number(stopwatch.textContent.slice(stopwatch.textContent.length - 2, stopwatch.textContent.length - 1)) + 1}0`
            tens = false, ones = true
        } else if (mins) {stopwatch.textContent = `Stopwatch: ${Number(stopwatch.textContent.slice(11, 12)) + 1}:00`
            mins = false, ones = true
        }
    }, 1000)
} document.addEventListener("click", () => {
    if (cNote.volume == 1 && start.style.display == `none`) {
        cheese.style.display = "unset", cNote.volume = 0
        cheese.style.animation = "cheeseAnimation 0.7s ease-out forwards"
        clearInterval(stopwatchInterval)
        false, cNote.loop = false
        if (fastesttime.textContent == "Fastest Time: 0:00") {
            localStorage.setItem("Fastest Time", stopwatch.textContent.slice(11, stopwatch.textContent.length))
            fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
        } else if (stopwatch.textContent.slice(11, 12) < fastesttime.textContent.slice(14, 15) || stopwatch.textContent.slice(13, 14) < fastesttime.textContent.slice(16, 17) && stopwatch.textContent.slice(11, 12) == fastesttime.textContent.slice(14, 15) ||
            stopwatch.textContent.slice(11, 12) == fastesttime.textContent.slice(14, 15) && stopwatch.textContent.slice(13, 14) == fastesttime.textContent.slice(16, 17) && stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length) <
            fastesttime.textContent.slice(fastesttime.textContent.length - 1, fastesttime.textContent.length)) {
            localStorage.setItem("Fastest Time", stopwatch.textContent.slice(11, stopwatch.textContent.length))
            fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
        } stopwatch.textContent = "Stopwatch: 0:00"
        cheesesfound.textContent = `Cheeses Found: ${Number(cheesesfound.textContent.slice(cheesesfound.textContent.indexOf(":") + 2, cheesesfound.textContent.length)) + 1}`
        localStorage.setItem("Cheeses Found", Number(cheesesfound.textContent.slice(cheesesfound.textContent.indexOf(":") + 2, cheesesfound.textContent.length)))
        setTimeout(() => {yum.play()}, 500)
        setTimeout(() => {start.style.display = "block"
            cheese.style.display = ""
            cheese.style.animation = ""
        }, 1500)
    }
})