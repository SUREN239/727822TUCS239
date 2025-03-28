package com.test.socialmediaanalytics.controller;


import com.test.socialmediaanalytics.dto.PostDTO;
import com.test.socialmediaanalytics.dto.UserDTO;
import com.test.socialmediaanalytics.service.SocialMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SocialMediaController {
    @Autowired
    private SocialMediaService socialMediaService;

    @GetMapping("/users")
    public List<UserDTO> getTopUsers() {
        return socialMediaService.getTopUsers();
    }

    @GetMapping("/posts")
    public List<PostDTO> getPosts(@RequestParam(defaultValue = "latest") String type) {

            return socialMediaService.getPopularPosts();


    }
}