package com.test.socialmediaanalytics.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class CommentDTO {
    private Long id;

    @JsonProperty("postid")
    private Long postId;

    private String content;

    // Method to parse comments from the specific response format
    public static List<CommentDTO> parseComments(Map<String, List<CommentDTO>> commentsResponse) {
        return commentsResponse.get("comments");
    }
}
