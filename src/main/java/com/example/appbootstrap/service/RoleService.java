package com.example.appbootstrap.service;

import com.example.appbootstrap.model.Role;
import com.example.appbootstrap.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    public Optional<Role> findById(Long id) {return roleRepository.findById(id);}

    public int count() {
        return (int) roleRepository.count();
    }

    public void save(Role adminRole) {
        roleRepository.save(adminRole);
    }
}
