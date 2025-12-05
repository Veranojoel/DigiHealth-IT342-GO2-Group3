package com.digihealth.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "BINARY(16)")
    private UUID doctorId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true)
    private User user;

    @Column(unique = true, length = 50)
    private String licenseNumber;

    @Column(length = 100)
    private String specialization;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus approvalStatus = ApprovalStatus.PENDING;

    @Column(precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DoctorWorkDay> workDays;

    private Integer experienceYears;

    @Column(length = 200)
    private String hospitalAffiliation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "addressId")
    private Address address;

    // Explicit getters for Lombok compatibility
    public UUID getDoctorId() {
        return doctorId;
    }

    public User getUser() {
        return user;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getBio() {
        return bio;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public String getHospitalAffiliation() {
        return hospitalAffiliation;
    }

    public Address getAddress() {
        return address;
    }

    // Explicit setters for Lombok compatibility
    public void setUser(User user) {
        this.user = user;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public void setHospitalAffiliation(String hospitalAffiliation) {
        this.hospitalAffiliation = hospitalAffiliation;
    }
}
