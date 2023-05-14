package com.my.admissioncommittee;

import com.my.admissioncommittee.controllers.StatementController;
import com.my.admissioncommittee.entities.Faculty;
import com.my.admissioncommittee.entities.Statement;
import com.my.admissioncommittee.entities.User;
import com.my.admissioncommittee.entities.enums.Role;
import com.my.admissioncommittee.repositories.FacultyRepository;
import com.my.admissioncommittee.repositories.StatementRepository;
import com.my.admissioncommittee.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
class Initializer implements CommandLineRunner {

    private final FacultyRepository facultyRepository;
    private final UserRepository userRepository;
    private final StatementRepository statementRepository;

    @Autowired
    public Initializer(FacultyRepository facultyRepository, UserRepository userRepository, StatementRepository statementRepository) {
        this.facultyRepository = facultyRepository;
        this.userRepository = userRepository;
        this.statementRepository = statementRepository;
    }

    @Override
    public void run(String... args) {
        if(facultyRepository.findAll().size() == 0) {
            facultyRepository.save(new Faculty(0, "faculty1", 10, 100));
            facultyRepository.save(new Faculty(0, "faculty2", 20, 200));
            facultyRepository.save(new Faculty(0, "faculty3", 30, 300));
        }

        Faculty f1 = facultyRepository.findByName("faculty1");
        Faculty f2 = facultyRepository.findByName("faculty2");
        Faculty f3 = facultyRepository.findByName("faculty3");

        if(userRepository.findAll().size() == 0) {
            userRepository.save(new User(0, "login1", "password1", Role.USER, "user1",
                    "email1@gmail.com", "city1", "region1", "institution1", false));
            userRepository.save(new User(0, "login2", "password2", Role.USER, "user2",
                    "email2@gmail.com", "city2", "region2", "institution2", false));
            userRepository.save(new User(0, "login3", "password3", Role.USER, "user3",
                    "email3@gmail.com", "city3", "region3", "institution3", false));
        }

        User u1 = userRepository.findByLogin("login1");
        User u2 = userRepository.findByLogin("login2");
        User u3 = userRepository.findByLogin("login3");

        if(statementRepository.findAll().size() == 0) {
            statementRepository.save(new Statement(0, u1, f1, 200, 200, 200, 10.75, false));
            statementRepository.save(new Statement(0, u2, f2, 150, 150, 150, 8.9, false));
            statementRepository.save(new Statement(0, u3, f3, 175, 150, 200, 11.8, false));
        }
    }
}