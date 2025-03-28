package com.test.socialmediaanalytics.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private int postCount;

    // Constructor for parsing users from the specific response format
    public static List<UserDTO> parseUsers(Map<String, Map<String, String>> usersResponse) {
        return usersResponse.get("users").entrySet().stream()
                .map(entry -> {
                    UserDTO user = new UserDTO();
                    user.setId(Long.parseLong(entry.getKey()));
                    user.setName(entry.getValue());
                    user.setPostCount(0);
                    return user;
                })
                .collect(Collectors.toList());
    }
}
