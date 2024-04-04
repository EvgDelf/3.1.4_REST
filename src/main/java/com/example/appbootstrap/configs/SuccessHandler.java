package com.example.appbootstrap.configs;

import com.example.appbootstrap.service.RoleService;
import com.example.appbootstrap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SuccessHandler implements AuthenticationSuccessHandler {


    private UserService userService;

    private RoleService roleService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(authentication);
        if (response.isCommitted()) {
            return;
        }
        response.sendRedirect(targetUrl);
    }

    protected String determineTargetUrl(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
        List<String> roles = new ArrayList<>();
        for (GrantedAuthority authority : authorities) {
            roles.add(authority.getAuthority());
        }
        if (roles.contains("ROLE_ADMIN") || roles.size() > 1) {
            return "/users/" + userService.findByUsername(userDetails.getUsername()).getId();
        } else if (roles.contains("ROLE_USER")){
            return "/user/" + userService.findByUsername(userDetails.getUsername()).getId();
        }
        return "Error";
    }

}
