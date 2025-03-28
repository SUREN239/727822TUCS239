package com.test.socialmediaanalytics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentDto {
    private String id;
    private String postId;
    private String userId;
    private String body;
    private Instant createdAt;
}