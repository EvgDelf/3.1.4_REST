package com.example.appbootstrap.controller;

import com.example.appbootstrap.model.Role;
import com.example.appbootstrap.model.User;
import com.example.appbootstrap.service.RoleService;
import com.example.appbootstrap.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class RestApiController {

    private final UserService userService;
    private final RoleService roleService;


    public RestApiController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/add")
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }


    @PostMapping("/edit")
    public User editUser(@RequestBody User user) {
        userService.edit(user);
        return user;
    }
    @PostMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);
    }

}
