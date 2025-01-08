package managers;

import com.google.gson.Gson;
import data.Dot;
import jakarta.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public class RequestReader {

    public Dot readRequest(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        try (BufferedReader reader = request.getReader()) {
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }

        Gson gson = new Gson();
        return gson.fromJson(sb.toString(), Dot.class);
    }
}