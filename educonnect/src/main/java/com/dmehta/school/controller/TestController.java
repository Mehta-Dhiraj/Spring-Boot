package com.dmehta.school.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    
    @GetMapping("/test")
    public String testJsp() {
        return "test";
    }
}
