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
public class PostDto {
    private String id;
    private String userId;
    private String title;
    private String body;
    private Instant createdAt;
    private long commentCount = 0;
}