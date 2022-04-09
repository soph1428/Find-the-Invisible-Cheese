var cheese = document.getElementById("cheese"),
socket = io.connect("https://findtheinvisiblecheese.herokuapp.com");
start = document.getElementById("startButton"),
cheesesfound = document.getElementById("cheesesfound"), globalcheesesfound = document.getElementById(`globalcheesesfound`),
fastesttime = document.getElementById("fastesttime"), globalfastesttime = document.getElementById(`globalfastesttime`),
stopwatch = document.getElementById("stopwatch"), stopwatchInterval = "",
cNote = document.createElement("audio"),
yum = document.createElement("audio"),
xDifference = "", Difference = "", distance = "", detectMousePos = false
cNote.volume = 0, yum.src = `yum.mp3`
if (localStorage.getItem("Cheeses Found")) {
    cheesesfound.textContent = `Cheeses Found: ${localStorage.getItem("Cheeses Found")}`
}
if (localStorage.getItem("Fastest Time")) {
    fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
} socket.on(`Global`, (data) => {globalcheesesfound.textContent = `Global Cheeses Found: ${data.cheeseText}`, localStorage.setItem(`Global Cheeses Found`, data.cheeseText), globalfastesttime.textContent = `Global Fastest Time: ${data.timeText}`, localStorage.setItem(`Global Fastest Time`, data.timeText), socket.emit(`Global`, {cheeseText: data.cheeseText, timeText: data.timeText})})
if (localStorage.getItem(`Global Cheeses Found`)) {
    globalcheesesfound.textContent = `Global Cheeses Found: ${localStorage.getItem("Global Cheeses Found")}`
}
if (localStorage.getItem(`Global Fastest Time`)) {
    globalfastesttime.textContent = `Global Fastest Time: ${localStorage.getItem("Global Fastest Time")}`
}
function changeDistances(x, y) {
    xDifference = x, yDifference = y
    distance = Math.sqrt(xDifference * xDifference + yDifference * yDifference)
}
start.onclick = function() {
    start.style.display = "none"
    cNote.src = "cNote.mp3", cNote.loop = true, cNote.play()
    startStopwatch(), changeDistances("", "")
    cheese.style.left = `${Math.floor(Math.random() * (((innerWidth - 100) - 100 + 1) + 100))}px`
    cheese.style.top = `${Math.floor(Math.random() * (((innerHeight - 100) - 100 + 1) + 100))}px`
    detectMousePos = true
}
document.addEventListener("mousemove", move)
document.addEventListener("touchmove", (e) => {move(e.targetTouches[0])})
function move(e) {
    document.documentElement.style.cursor = "unset"
    if (detectMousePos) {
    changeDistances(Number(cheese.style.left.slice(0, cheese.style.left.length - 2)) + cheese.width / 2 - e.clientX,
    Number(cheese.style.top.slice(0, cheese.style.top.length - 2)) + cheese.height / 2 - e.clientY)
    if (distance > 800) cNote.volume = 0.1
    else if (distance < 600 && distance > 300) cNote.volume = 0.3
    else if (distance < 150 && distance > 75) cNote.volume = 0.5
    else if (distance < 50 && distance > 0) cNote.volume = 1
    if (distance < cheese.width / 4) document.documentElement.style.cursor = "pointer"
    }
}
function startStopwatch() {
    var ones = true, tens = false, mins = false
    stopwatchInterval = setInterval(() => {
        if (ones) {stopwatch.textContent = `Stopwatch: ${stopwatch.textContent.slice(11, stopwatch.textContent.length - 1)}${Number(stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length)) + 1}`
            if (stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length) == "9") {
                ones = false, tens = true
            }
            if (stopwatch.textContent.slice(stopwatch.textContent.length - 2, stopwatch.textContent.length) == "59") {
                ones = false, tens = false, mins = true
            }
        }
        else if (tens) {stopwatch.textContent = `Stopwatch: ${stopwatch.textContent.slice(11, stopwatch.textContent.length - 2)}${Number(stopwatch.textContent.slice(stopwatch.textContent.length - 2, stopwatch.textContent.length - 1)) + 1}0`
            tens = false, ones = true
        }
        else if (mins) {stopwatch.textContent = `Stopwatch: ${Number(stopwatch.textContent.slice(11, 12)) + 1}:00`
            mins = false, ones = true
        }
    }, 1000)
}
document.addEventListener("click", () => {
    if (distance < cheese.width / 4 && xDifference != "" && start.style.display == "none") {
        cheese.style.display = "unset"
        cheese.style.animation = "cheeseAnimation 0.7s ease-out forwards"
        clearInterval(stopwatchInterval)
        detectMousePos = false, cNote.loop = false
        if (fastesttime.textContent == "Fastest Time: 0:00") {
            localStorage.setItem("Fastest Time", stopwatch.textContent.slice(11, stopwatch.textContent.length))
            fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
        }
        if (globalfastesttime.textContent == `Global Fastest Time: 0:00`) {
            globalfastesttime.textContent = `Global Fastest Time: ${stopwatch.textContent.slice(11, stopwatch.textContent.length)}`
        }
        else if (stopwatch.textContent.slice(11, 12) < fastesttime.textContent.slice(14, 15) || stopwatch.textContent.slice(13, 14) < fastesttime.textContent.slice(16, 17) && stopwatch.textContent.slice(11, 12) == fastesttime.textContent.slice(14, 15) ||
            stopwatch.textContent.slice(11, 12) == fastesttime.textContent.slice(14, 15) && stopwatch.textContent.slice(13, 14) == fastesttime.textContent.slice(16, 17) && stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length) <
            fastesttime.textContent.slice(fastesttime.textContent.length - 1, fastesttime.textContent.length)) {
            localStorage.setItem("Fastest Time", stopwatch.textContent.slice(11, stopwatch.textContent.length))
            fastesttime.textContent = `Fastest Time: ${localStorage.getItem("Fastest Time")}`
            if (stopwatch.textContent.slice(11, 12) < globalfastesttime.textContent.slice(21, 22) || stopwatch.textContent.slice(13, 14) < globalfastesttime.textContent.slice(23, 24) && stopwatch.textContent.slice(11, 12) == globalfastesttime.textContent.slice(21, 22) ||
            stopwatch.textContent.slice(11, 12) == globalfastesttime.textContent.slice(21, 22) && stopwatch.textContent.slice(13, 14) == globalfastesttime.textContent.slice(23, 24) && stopwatch.textContent.slice(stopwatch.textContent.length - 1, stopwatch.textContent.length) <
            globalfastesttime.textContent.slice(globalfastesttime.textContent.length - 1, globalfastesttime.textContent.length)) {
                globalfastesttime.textContent = `Global Fastest Time: ${stopwatch.textContent.slice(11, stopwatch.textContent.length)}`
            }
        }
        stopwatch.textContent = "Stopwatch: 0:00"
        cheesesfound.textContent = `Cheeses Found: ${Number(cheesesfound.textContent.slice(cheesesfound.textContent.indexOf(":") + 2, cheesesfound.textContent.length)) + 1}`
        socket.emit(`Global`, {cheeseText: Number(globalcheesesfound.textContent.slice(globalcheesesfound.textContent.indexOf(":") + 2, globalcheesesfound.textContent.length)) + 1, timeText: globalfastesttime.textContent.slice(21, globalfastesttime.textContent.length)})
        socket.on(`Global`, (data) => {globalcheesesfound.textContent = `Global Cheeses Found: ${data.cheeseText}`, localStorage.setItem(`Global Cheeses Found`, data.cheeseText), globalfastesttime.textContent = `Global Fastest Time: ${data.timeText}`, localStorage.setItem(`Global Fastest Time`, data.timeText), socket.emit(`Global`, {cheeseText: data.cheeseText, timeText: data.timeText})})
        localStorage.setItem("Cheeses Found", Number(cheesesfound.textContent.slice(cheesesfound.textContent.indexOf(":") + 2, cheesesfound.textContent.length)))
        setTimeout(() => {yum.play()}, 500)
        setTimeout(() => {
            start.style.display = "unset"
            cheese.style.display = "none"
            cheese.style.animation = ""
        }, 1500)
    }
})