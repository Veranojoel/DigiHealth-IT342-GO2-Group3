package com.digihealth.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Custom authentication entry point to handle unauthorized access attempts.
 * Returns structured JSON responses instead of default Spring Security error pages.
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {

        logger.error("Unauthorized error: {}", e.getMessage());
        logger.error("Request URI: {}", httpServletRequest.getRequestURI());
        logger.error("Request Method: {}", httpServletRequest.getMethod());

        httpServletResponse.setContentType("application/json;charset=UTF-8");
        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, Object> errorDetails = new HashMap<>();
        errorDetails.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        errorDetails.put("error", "Unauthorized");
        errorDetails.put("message", "Authentication required. Please log in.");
        errorDetails.put("path", httpServletRequest.getRequestURI());

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(httpServletResponse.getWriter(), errorDetails);
    }
}
