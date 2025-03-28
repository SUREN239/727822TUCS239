package com.test.socialmediaanalytics.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class AuthConfig {
    @Value("${social.media.auth.company-name}")
    private String companyName;

    @Value("${social.media.auth.client-id}")
    private String clientId;

    @Value("${social.media.auth.client-secret}")
    private String clientSecret;

    @Value("${social.media.auth.owner-name}")
    private String ownerName;

    @Value("${social.media.auth.owner-email}")
    private String ownerEmail;

    @Value("${social.media.auth.roll-no}")
    private String rollNo;

    private String accessToken;

    public String getAccessToken(RestTemplate restTemplate) {
        if (accessToken != null) {
            return accessToken;
        }

        String authUrl = "http://20.244.56.144/test/auth";

        Map<String, String> authRequest = new HashMap<>();
        authRequest.put("companyName", companyName);
        authRequest.put("clientID", clientId);
        authRequest.put("clientSecret", clientSecret);
        authRequest.put("ownerName", ownerName);
        authRequest.put("ownerEmail", ownerEmail);
        authRequest.put("rollNo", rollNo);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                authUrl,
                authRequest,
                Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        this.accessToken = (String) responseBody.get("access_token");
        return accessToken;
    }

    public HttpHeaders createAuthorizationHeaders(RestTemplate restTemplate) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAccessToken(restTemplate));
        return headers;
    }
}