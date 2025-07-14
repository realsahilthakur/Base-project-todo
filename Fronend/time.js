function updateTime() {
    var dt = new Date();
    document.getElementById("datetime").innerHTML = dt.toLocaleString();
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);