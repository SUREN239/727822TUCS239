package com.test.socialmediaanalytics.service;

import com.test.socialmediaanalytics.config.AuthConfig;
import com.test.socialmediaanalytics.dto.CommentDTO;
import com.test.socialmediaanalytics.dto.PostDTO;
import com.test.socialmediaanalytics.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SocialMediaService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AuthConfig authConfig;

    private static final String BASE_URL = "http://20.244.56.144/test";

    public List<UserDTO> getTopUsers() {
        // Fetch users
        ResponseEntity<Map<String, Map<String, String>>> usersResponse = restTemplate.exchange(
                BASE_URL + "/users",
                HttpMethod.GET,
                new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                new ParameterizedTypeReference<Map<String, Map<String, String>>>() {}
        );

        // Parse users
        List<UserDTO> users = UserDTO.parseUsers(usersResponse.getBody());

        // Enrich users with post count
        return users.stream().map(user -> {
                    try {
                        // Fetch posts for each user
                        ResponseEntity<Map<String, List<PostDTO>>> postsResponse = restTemplate.exchange(
                                BASE_URL + "/users/" + user.getId() + "/posts",
                                HttpMethod.GET,
                                new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                                new ParameterizedTypeReference<Map<String, List<PostDTO>>>() {}
                        );

                        // Set post count
                        List<PostDTO> userPosts = PostDTO.parsePosts(postsResponse.getBody());
                        user.setPostCount(userPosts.size());
                        return user;
                    } catch (Exception e) {
                        // Log error if needed
                        user.setPostCount(0);
                        return user;
                    }
                })
                .sorted(Comparator.comparing(UserDTO::getPostCount).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }

    public List<PostDTO> getPosts(String type) {
        // Fetch posts
        ResponseEntity<Map<String, List<PostDTO>>> postsResponse = restTemplate.exchange(
                BASE_URL + "/posts",
                HttpMethod.GET,
                new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                new ParameterizedTypeReference<Map<String, List<PostDTO>>>() {}
        );

        // Parse posts
        List<PostDTO> posts = PostDTO.parsePosts(postsResponse.getBody());

        // Enrich posts with comment count
        List<PostDTO> enrichedPosts = posts.stream().map(post -> {
            try {
                // Fetch comments for each post
                ResponseEntity<Map<String, List<CommentDTO>>> commentsResponse = restTemplate.exchange(
                        BASE_URL + "/posts/" + post.getId() + "/comments",
                        HttpMethod.GET,
                        new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                        new ParameterizedTypeReference<Map<String, List<CommentDTO>>>() {}
                );

                // Set comment count
                List<CommentDTO> postComments = CommentDTO.parseComments(commentsResponse.getBody());
                post.setCommentCount(postComments.size());
                return post;
            } catch (Exception e) {
                // Log error if needed
                post.setCommentCount(0);
                return post;
            }
        }).collect(Collectors.toList());

        // Process based on type
        if ("popular".equals(type)) {
            // Find max comment count
            int maxComments = enrichedPosts.stream()
                    .mapToInt(PostDTO::getCommentCount)
                    .max()
                    .orElse(0);

            return enrichedPosts.stream()
                    .filter(p -> p.getCommentCount() == maxComments)
                    .collect(Collectors.toList());
        } else if ("latest".equals(type)) {
            // Since we don't have timestamp, return first 5 posts
            return enrichedPosts.stream()
                    .limit(5)
                    .collect(Collectors.toList());
        }

        return Collections.emptyList();
    }

    public List<PostDTO> getPopularPosts() {
        // Fetch posts
        ResponseEntity<Map<String, List<PostDTO>>> postsResponse = restTemplate.exchange(
                BASE_URL + "/posts",
                HttpMethod.GET,
                new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                new ParameterizedTypeReference<Map<String, List<PostDTO>>>() {}
        );

        // Parse posts
        List<PostDTO> posts = PostDTO.parsePosts(postsResponse.getBody());

        // Enrich posts with comment count and find the most commented post(s)
        Map<Long, Integer> postCommentCounts = new HashMap<>();

        // Calculate comment count for each post
        for (PostDTO post : posts) {
            try {
                ResponseEntity<Map<String, List<CommentDTO>>> commentsResponse = restTemplate.exchange(
                        BASE_URL + "/posts/" + post.getId() + "/comments",
                        HttpMethod.GET,
                        new HttpEntity<>(authConfig.createAuthorizationHeaders(restTemplate)),
                        new ParameterizedTypeReference<Map<String, List<CommentDTO>>>() {}
                );

                // Parse comments and count
                List<CommentDTO> postComments = CommentDTO.parseComments(commentsResponse.getBody());
                int commentCount = postComments.size();

                // Store comment count
                postCommentCounts.put(post.getId(), commentCount);
                post.setCommentCount(commentCount);
            } catch (Exception e) {
                // If comment fetching fails, set comment count to 0
                postCommentCounts.put(post.getId(), 0);
                post.setCommentCount(0);
            }
        }

        // Find the maximum comment count
        int maxCommentCount = postCommentCounts.isEmpty() ? 0 :
                Collections.max(postCommentCounts.values());

        // Filter posts with the maximum comment count
        return posts.stream()
                .filter(post -> post.getCommentCount() == maxCommentCount)
                .collect(Collectors.toList());
    }


}