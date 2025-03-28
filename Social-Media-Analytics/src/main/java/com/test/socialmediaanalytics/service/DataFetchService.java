package com.test.socialmediaanalytics.service;


import com.test.socialmediaanalytics.dto.CommentDto;
import com.test.socialmediaanalytics.dto.PostDto;
import com.test.socialmediaanalytics.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataFetchService {
    private final WebClient webClient;

    @Value("${external.api.base-url}")
    private String baseUrl;

    @Value("${external.api.users-endpoint}")
    private String usersEndpoint;

    @Value("${external.api.posts-endpoint}")
    private String postsEndpoint;

    @Value("${external.api.comments-endpoint}")
    private String commentsEndpoint;

    @Cacheable("users")
    public Flux<UserDto> fetchUsers() {
        return webClient.get()
                .uri(baseUrl + usersEndpoint)
                .retrieve()
                .bodyToFlux(UserDto.class)
                .cache();
    }

    @Cacheable("posts")
    public Flux<PostDto> fetchPosts() {
        return webClient.get()
                .uri(baseUrl + postsEndpoint)
                .retrieve()
                .bodyToFlux(PostDto.class)
                .cache();
    }

    @Cacheable("comments")
    public Flux<CommentDto> fetchComments() {
        return webClient.get()
                .uri(baseUrl + commentsEndpoint)
                .retrieve()
                .bodyToFlux(CommentDto.class)
                .cache();
    }
}
