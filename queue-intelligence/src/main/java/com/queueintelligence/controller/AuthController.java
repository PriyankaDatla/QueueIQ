package com.queueintelligence.controller;

import com.queueintelligence.dto.AuthResponse;
import com.queueintelligence.dto.LoginRequest;
import com.queueintelligence.dto.RegisterRequest;
import com.queueintelligence.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request){

        System.out.println("========== REGISTER API HIT ==========");

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request){

        System.out.println("========== LOGIN API HIT ==========");

        return authService.login(request);
    }
}