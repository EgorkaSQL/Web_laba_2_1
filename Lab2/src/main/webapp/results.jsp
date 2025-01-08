<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="org.json.JSONObject" %>
<%
    ServletContext context = getServletContext();
    List<String> results = (List<String>) context.getAttribute("results");
    if (results == null) {
        results = new ArrayList<>();
        context.setAttribute("results", results);
    }
%>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Результаты вычислений</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f7f6;
            margin: 0;
            padding: 0;
            color: #333;
        }

        h1 {
            text-align: center;
            margin-top: 20px;
            color: #2c3e50;
        }

        table {
            width: 80%;
            margin: 30px auto;
            border-collapse: collapse;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
        }

        th, td {
            padding: 12px 15px;
            text-align: center;
        }

        thead {
            background-color: #3498db;
            color: #ffffff;
        }

        tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tbody tr:nth-child(odd) {
            background-color: #ecf0f1;
        }

        tbody tr:hover {
            background-color: #d5f5e3;
        }

        th {
            font-size: 16px;
            text-transform: uppercase;
        }

        td {
            font-size: 14px;
            color: #2c3e50;
        }

        .no-data {
            text-align: center;
            font-size: 18px;
            color: #e74c3c;
            padding: 20px;
        }
    </style>
</head>
<body>
<h1>Результаты вычислений</h1>
<table>
    <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Ответ</th>
            <th>Текущее время</th>
            <th>Время выполнения</th>
        </tr>
    </thead>
    <tbody>
        <% if (results != null && !results.isEmpty()) {
            for (String result : results) {
                JSONObject json = new JSONObject(result);
        %>
                <tr>
                    <td><%= json.get("x") %></td>
                    <td><%= json.get("y") %></td>
                    <td><%= json.get("r") %></td>
                    <td><%= json.get("status") %></td>
                    <td><%= json.get("currentTime") %></td>
                    <td><%= json.get("execTime") %></td>
                </tr>
        <%  }
        } else { %>
            <tr>
                <td class="no-data" colspan="6">Нет данных для отображения</td>
            </tr>
        <% } %>
    </tbody>
</table>
</body>
</html>
