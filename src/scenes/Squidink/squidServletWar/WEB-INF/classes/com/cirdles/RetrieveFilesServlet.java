package classes.com.cirdles;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.nio.file.Files;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 * Servlet implementation class RetrieveFilesServlet
 */

@WebServlet(name = "RetrieveFilesServlet", urlPatterns = { "/retrievefiles" })
@MultipartConfig(
        fileSizeThreshold = 1024 * 1024 *1, // MB
        maxFileSize = 1024 * 1024 * 10, // 10 MB
        maxRequestSize = 1024 * 1024 * 100 // 100 MB
)

public class RetrieveFilesServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();
        for (Part part : request.getParts()) {
            part.write("/usr/local/tomcat/work/" + fileName);
        }
        response.getWriter().print("Files Stored Successfully");

    }

}
