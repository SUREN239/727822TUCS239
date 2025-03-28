package com.test.socialmediaanalytics.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class PostDTO {
    private Long id;

    @JsonProperty("userid")
    private Long userId;

    private String content;
    private int commentCount;

    // Method to parse posts from the specific response format
    public static List<PostDTO> parsePosts(Map<String, List<PostDTO>> postsResponse) {
        return postsResponse.get("posts");
    }
}