package com.digihealth.backend.repository;

import com.digihealth.backend.entity.Doctor;
import com.digihealth.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

import com.digihealth.backend.entity.ApprovalStatus;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    Optional<Doctor> findByUser(User user);

    List<Doctor> findAllByApprovalStatus(ApprovalStatus approvalStatus);

    @Query("SELECT d FROM Doctor d WHERE d.user.id = :userId")
    Optional<Doctor> findByUserId(@Param("userId") UUID userId);
}