package com.my.admissioncommittee.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "statement")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Statement {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "statement_sequence")
    @SequenceGenerator(name = "statement_sequence", sequenceName = "statement_sequence", allocationSize = 1)
    private long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "user_id")
    //@Column(nullable = false)
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false, name = "faculty_id")
    //@Column(nullable = false)
    private Faculty faculty;
    @Column(nullable = false)
    private int mark1;
    @Column(nullable = false)
    private int mark2;
    @Column(nullable = false)
    private int mark3;
    @Column(nullable = false)
    private double avgCerMark;
    private boolean passed;
    {
        passed = false;
    }
}
