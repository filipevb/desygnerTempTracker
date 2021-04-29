const tempTracker = new TempTracker();
const feedInterval = 1000;
let timeout = null;
let feeding = false;

document.getElementById('btn-start').addEventListener('click', function (ev) {
    feeding = true;
    scheduleFeed();
    ev.target.classList.add('disabled');
    document.getElementById('btn-stop').classList.remove('disabled');
});

document.getElementById('btn-stop').addEventListener('click', function (ev) {
    feeding = false;
    ev.target.classList.add('disabled');
    document.getElementById('btn-start').classList.remove('disabled');
});


function getRandomTemperature () {
    const min = -20;
    const max = 40;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scheduleFeed () {
    if (!feeding) {
        clearTimeout(timeout);
        timeout = null;
        return;
    }

    const newTemp = getRandomTemperature();
    tempTracker.feed(newTemp);
    updateLastTemperature(newTemp);
    updateTempraturesDisplay();

    if (timeout != null) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
        scheduleFeed();
    }, feedInterval);
}

function updateLastTemperature (lastTemp) {
    document.getElementById('last-temperature').textContent = lastTemp.toFixed(2);
}

function updateTempraturesDisplay () {
    let minEl = document.getElementById('min-temp').getElementsByClassName('temperature-value')[0];
    const minOldVal = minEl.textContent;
    minEl.textContent = tempTracker.min.toFixed(2);
    // colorizeTemperature(minEl, minOldVal, tempTracker.min.toFixed(2));

    let maxEl = document.getElementById('max-temp').getElementsByClassName('temperature-value')[0];
    const maxOldVal = maxEl.textContent;
    maxEl.textContent = tempTracker.max.toFixed(2);
    // colorizeTemperature(maxEl, maxOldVal, tempTracker.max.toFixed(2));

    let avgEl = document.getElementById('avg-temp').getElementsByClassName('temperature-value')[0];
    const avgOldVal = avgEl.textContent;
    avgEl.textContent = tempTracker.avg.toFixed(2);
    colorizeTemperature(avgEl, avgOldVal, tempTracker.avg.toFixed(2));
}

function colorizeTemperature (element, oldValue, newValue) {
    const oldVal = parseFloat(oldValue);
    const newVal = parseFloat(newValue);
    if (!isNaN(oldVal) && !isNaN(newVal)) {
        if (oldVal > newVal) {
            element.classList.remove('up');
            element.classList.add('down');
        } else if (oldVal < newVal) {
            element.classList.remove('down');
            element.classList.add('up');
        }
    }
}