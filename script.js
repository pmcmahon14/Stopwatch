let offset = 0,
    paused = true;

render();

function startStopwatch(evt) {
    if (paused) {
        paused = false;
        offset -= Date.now();
        render();
    }
}

function stopStopwatch(evt) {
    if (!paused) {
        paused = true;
        offset += Date.now();
    }
}

function resetStopwatch(evt) {
    if (paused) {
        offset = 0;
        render();
    } else {
        offset = -Date.now();
    }
}

function format(value, scale, modulo, padding) {
    value = Math.floor(value / scale) % modulo;
    return value.toString().padStart(padding, 0);
}

function render() {
    var value = paused ? offset : Date.now() + offset;

    document.querySelector('#s_ms').textContent = format(value, 1, 1000, 3);
    document.querySelector('#s_seconds').textContent = format(value, 1000, 60, 2);
    document.querySelector('#s_minutes').textContent = format(value, 60000, 60, 2);

    if(!paused) {
        requestAnimationFrame(render);
    }
}