let selectedX = null;
let selectedR = null;

document.querySelectorAll('.x-button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.x-button').forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });

        this.style.backgroundColor = '#473a95';
        this.style.color = 'white';

        selectedX = parseFloat(this.getAttribute('data-value'));
    });
});

document.querySelectorAll('.r-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        document.querySelectorAll('.r-checkbox').forEach(cb => {
            if (cb !== this) cb.checked = false;
        });

        selectedR = this.checked ? parseFloat(this.value) : null;
    });
});

document.getElementById('submit-button').addEventListener('click', function (event) {
    event.preventDefault();
    const y = parseFloat(document.getElementById('y-coord').value);
    if (isNaN(y) || y < -5 || y > 5) {
        alert('Введите корректное значение Y (-5 до 5)!');
        return;
    }

    if (selectedX === null) {
        alert('Выберите значение X!');
        return;
    }

    if (selectedR === null) {
       alert('Выберите значение R!');
       return;
    }

    const isInArea = (selectedX <= selectedR && y <= selectedR);
    const currentTime = new Date().toLocaleString();
    const execTime = Math.floor(Math.random() * 100);

    addTableRow(selectedR, selectedX, y, isInArea, currentTime, execTime);
    plotPointOnCanvas(selectedX, y, selectedR);
    sendPointToServer(selectedX, y, selectedR);
});

document.getElementById('coordinate-plane').addEventListener('click', function(event) {

    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const canvasSize = 400;
    const halfCanvasSize = canvasSize / 2;
    const pixelRatio = canvasSize / 6;

    const r = selectedR;

    if (r === null) {
       alert('Выберите значение R!');
       return;
    }

    const graphX = ((x - halfCanvasSize) / pixelRatio) * (r / 2);
    const graphY = ((halfCanvasSize - y) / pixelRatio) * (r / 2);

    const roundedX = parseFloat(graphX).toFixed(2);
    const roundedY = parseFloat(graphY).toFixed(2);

    sendPointToServer(roundedX, roundedY, r);
});

function addTableRow(r, x, y, isInArea, currentTime, execTime) {
    const tbody = document.querySelector('#results tbody');
    if (!tbody) {
        console.error('Элемент <tbody> не найден в таблице!');
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${r}</td>
        <td>${x}</td>
        <td>${y}</td>
        <td>${isInArea ? 'Да' : 'Нет'}</td>
        <td>${currentTime}</td>
        <td>${execTime} ms</td>
    `;
    tbody.appendChild(newRow);
}

function plotPointOnCanvas(x, y, r) {
    const canvas = document.getElementById('coordinate-plane');
    const ctx = canvas.getContext('2d');

    const canvasSize = 400;
    const halfCanvasSize = canvasSize / 2;
    const pixelRatio = canvasSize / 6;

    const scaledX = (x / r) * 2;
    const scaledY = (y / r) * 2;
    const canvasX = halfCanvasSize + scaledX * pixelRatio;
    const canvasY = halfCanvasSize - scaledY * pixelRatio;

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

const LOCAL_STORAGE_KEY = 'tableResults';

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".xButtons").forEach(element => {
        element.addEventListener("click", function (e) {
            xHTML = e.target.value;
        });
    });

    window.onload = function () {
        drawAxes();
        drawStaticAreas();
    };
});

function drawStaticAreas() {
    const canvas = document.getElementById('coordinate-plane');
    const ctx = canvas.getContext('2d');
    const canvasSize = 400;
    const halfCanvasSize = canvasSize / 2;
    const pixelRatio = canvasSize / 6;

    // Квадрат
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
    ctx.fillRect(halfCanvasSize, halfCanvasSize - 2 * pixelRatio, 2 * pixelRatio, 2 * pixelRatio);

    // Четверть окружности
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(halfCanvasSize,halfCanvasSize,pixelRatio,0.5 * Math.PI,Math.PI,false);
        ctx.lineTo(halfCanvasSize, halfCanvasSize);
        ctx.closePath();
        ctx.fill();

    // Треугольник
    ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.beginPath();
        ctx.moveTo(halfCanvasSize, halfCanvasSize);
        ctx.lineTo(halfCanvasSize + 2*pixelRatio, halfCanvasSize);
        ctx.lineTo(halfCanvasSize, halfCanvasSize + 2* pixelRatio);
        ctx.closePath();
        ctx.fill();
}

function drawAxes() {
    const canvas = document.getElementById('coordinate-plane');
    const ctx = canvas.getContext('2d');
    const canvasSize = 400;
    const halfCanvasSize = canvasSize / 2;
    const pixelRatio = canvasSize / 6;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, halfCanvasSize);
    ctx.lineTo(canvasSize, halfCanvasSize);  // X
    ctx.moveTo(halfCanvasSize, 0);
    ctx.lineTo(halfCanvasSize, canvasSize);  // Y
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('x', canvasSize - 10, halfCanvasSize + 15);
    ctx.fillText('y', halfCanvasSize - 10, 10);

    const labels = ['-R', '-R/2', 'R/2', 'R'];
    const positions = [-2, -1, 1, 2];

    positions.forEach((pos, i) => {
        ctx.fillText(labels[i], halfCanvasSize + pos * pixelRatio - 10, halfCanvasSize + 15);
        ctx.moveTo(halfCanvasSize + pos * pixelRatio, halfCanvasSize - 5);
        ctx.lineTo(halfCanvasSize + pos * pixelRatio, halfCanvasSize + 5);
    });

    positions.forEach((pos, i) => {
        ctx.fillText(labels[i], halfCanvasSize - 25, halfCanvasSize - pos * pixelRatio + 5);
        ctx.moveTo(halfCanvasSize - 5, halfCanvasSize - pos * pixelRatio);
        ctx.lineTo(halfCanvasSize + 5, halfCanvasSize - pos * pixelRatio);
    });

    ctx.stroke();
}

function plotPoint(x, y, r) {
    const canvas = document.getElementById('coordinate-plane');
    const ctx = canvas.getContext('2d');

    const canvasSize = 400;
    const halfCanvasSize = canvasSize / 2;
    const pixelRatio = canvasSize / 6;

    const scaledX = (x / r) * 2;
    const scaledY = (y / r) * 2;
    const canvasX = halfCanvasSize + scaledX * pixelRatio;
    const canvasY = halfCanvasSize - scaledY * pixelRatio;

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function badMessage(message) {
    let RequestStatus = document.querySelector("status");

    RequestStatus.innerHTML = '';

    if (!RequestStatus.querySelector("h2")) {
        let statusText = document.createElement("h2");
        statusText.textContent = message
        RequestStatus.style.color = "red";
        RequestStatus.classList.add('visible');
        RequestStatus.appendChild(statusText);
    }
}

function sendPointToServer(x, y, r) {
    fetch('/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: "no-cache",
        body: JSON.stringify({ x: x, y: y, r: r })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        addTableRow(r, x, y, data.status, data.currentTime, data.execTime);
        plotPointOnCanvas(x, y, r);
    })
    .catch(error => {
        console.error('Error:', error);
        badMessage("Ошибка на сервере!");
    });
}