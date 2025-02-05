package managers;

import data.Dot;
import jakarta.servlet.ServletContext;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    private final FunctionCalc functionCalc = new FunctionCalc();
    private final RequestReader requestReader = new RequestReader();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Dot dot;
        if (request.getContentType() != null && request.getContentType().contains("application/json")) {
            dot = requestReader.readRequest(request);
        } else {
            double xCoord = Double.parseDouble(request.getParameter("x"));
            double yCoord = Double.parseDouble(request.getParameter("y"));
            double rCoord = Double.parseDouble(request.getParameter("r"));
            dot = new Dot(xCoord, yCoord, rCoord);
        }

        long startTime = System.nanoTime();

        if (dot == null || dot.getX() < -5 || dot.getX() > 5 || dot.getY() < -5 || dot.getY() > 5 || dot.getR() <= 0) {
            long execTime = (System.nanoTime() - startTime) / 1000000;
            response.getWriter().write(String.format(
                    "{\"error\": \"Invalid parameters\", \"currentTime\": \"%s\", \"execTime\": %d}",
                    java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
                    execTime
            ));
            return;
        }

        boolean isInArea = functionCalc.isInTheSpot(dot);
        long execTime = (System.nanoTime() - startTime) / 1000000;

        String currentTime = java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        ServletContext context = getServletContext();
        List<String> results = (List<String>) context.getAttribute("results");
        if (results == null) {
            results = new ArrayList<>();
            context.setAttribute("results", results);
        }

        String resultEntry = String.format("{\"status\": %b, \"x\": %.2f, \"y\": %.2f, \"r\": %.2f, \"currentTime\": \"%s\", \"execTime\": %d}",
                isInArea, dot.getX(), dot.getY(), dot.getR(), currentTime, execTime);
        results.add(resultEntry);
        context.setAttribute("results", results);

        response.getWriter().write(resultEntry);
    }
}