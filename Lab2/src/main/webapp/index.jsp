<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Caveat:wght@400..700&family=Doto:wght@100..900&family=Rubik+Bubbles&family=Russo+One&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Caveat', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #220737;
        }

        header p {
            color: blue;
        }

        header:hover {
            color: green;
        }

        #header-id {
            color: red;
        }

        header {
            background-color: #3399ff;
            padding: 15px;
            text-align: center;
        }

        #x-coord-options button {
            padding: 5px 8px;
            font-size: 0.9em;
            width: 40px;
            height: 30px;
            text-align: center;
            background-color: #473a95;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        #x-coord-options button:hover {
            background-color: #5b4bb7;
        }

        #x-coord-options button.selected {
            background-color: #2a1e65;
            color: white;
        }

        #coordinates-form {
            background-color: yellow;
            font-size: 1.5em;
        }

        .container:hover {
            cursor: pointer;
        }

        .container:before {
            content: "";
        }

        .container {
            display: flex;
            justify-content: center;
            padding: 20px;
        }

        .form-container {
            border: 1px solid #ccc;
            padding: 30px;
            width: 500px;
            background-color: #ffffff;
        }

        .form-container input[type="number"],
        .form-container input[type="text"],
        .form-container select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            font-family: inherit;
        }

        .form-field:last-child {
            margin-bottom: 0;
        }

        .form-field {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 7px;
        }

        input.error, select.error {
            border-bottom: 1px solid red;
        }

        .result-table {
            width: 500px;
            table-layout: fixed;
        }

        .result-table th, .result-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
            vertical-align: middle;
        }

        .result-table th:nth-child(-n+4), .result-table td:nth-child(-n+4) {
            width: 50px;
        }

        .result-table th {
            background-color: #473a95;
            color: white;
        }

        .content-wrapper {
            display: flex;
            gap: 20px;
            background-color: #330e65;
            padding: 20px;
            border-radius: 8px;
        }

        canvas {
            background-color: white;
            border: 1px solid #ccc;
        }

        button {
            font-size: 1em;
            color: white;
            background-color: #473a95;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #5b4bb7;
        }
    </style>
    <title>Лаба Веб-программирование 2</title>
</head>
<body>
<header id="header-id">
    <p>Студент: Кондилеев Егор Юрьевич | Группа: P3210 | Вариант: 488786</p>
</header>
<div class="container">
    <div class="content-wrapper">
        <div class="form-container">
            <div id="coordinates-form">
                <div class="form-field">
                    <label>Выберите значение R:</label>
                    <div id="r-coord-options" style="display: flex; gap: 10px;">
                        <label><input type="checkbox" class="r-checkbox" value="1"> 1</label>
                        <label><input type="checkbox" class="r-checkbox" value="2"> 2</label>
                        <label><input type="checkbox" class="r-checkbox" value="3"> 3</label>
                        <label><input type="checkbox" class="r-checkbox" value="4"> 4</label>
                        <label><input type="checkbox" class="r-checkbox" value="5"> 5</label>
                    </div>
                </div>
                <div class="form-field">
                    <label>Выберите значение X:</label>
                    <div id="x-coord-options" style="display: flex; gap: 10px;">
                        <button type="button" class="x-button" data-value="-5">-5</button>
                        <button type="button" class="x-button" data-value="-4">-4</button>
                        <button type="button" class="x-button" data-value="-3">-3</button>
                        <button type="button" class="x-button" data-value="-2">-2</button>
                        <button type="button" class="x-button" data-value="-1">-1</button>
                        <button type="button" class="x-button" data-value="0">0</button>
                        <button type="button" class="x-button" data-value="1">1</button>
                        <button type="button" class="x-button" data-value="2">2</button>
                        <button type="button" class="x-button" data-value="3">3</button>
                    </div>
                </div>
                <div class="form-field">
                    <label for="y-coord">Введите Y координату (-5 ... 5):</label>
                    <input type="text" id="y-coord" name="y-coord" min="-5" max="5" step="0.1" required>
                </div>
                <button id="submit-button">Отправить</button>
            </div>
            <table class="result-table" id="results">
                <thead>
                    <tr>
                        <th>R</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Ответ</th>
                        <th>Текущее время</th>
                        <th>Время работы скрипта</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <div class="canvas-container">
            <canvas id="coordinate-plane" width="400" height="400"></canvas>
        </div>
    </div>
</div>

<script src="script.js" defer></script>

<div style="text-align: center; margin-top: 20px;">
    <a href="results.jsp" style="font-size: 18px; color: #4CAF50;">Посмотреть результаты</a>
</div>
</body>
</html>