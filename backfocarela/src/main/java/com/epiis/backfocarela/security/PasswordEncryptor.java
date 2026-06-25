package com.epiis.backfocarela.security;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncryptor {
    private final PasswordEncoder passwordEncoder;

    public PasswordEncryptor() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public String encrypt(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean matches(String password, String passwordEncrypted) {
        return passwordEncoder.matches(password, passwordEncrypted);
    }
}
