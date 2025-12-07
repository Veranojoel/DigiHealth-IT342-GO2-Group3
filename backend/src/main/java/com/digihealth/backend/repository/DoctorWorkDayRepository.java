package com.digihealth.backend.repository;

import com.digihealth.backend.entity.Doctor;
import com.digihealth.backend.entity.DoctorWorkDay;
import com.digihealth.backend.entity.DayOfWeek;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorWorkDayRepository extends JpaRepository<DoctorWorkDay, UUID> {
    List<DoctorWorkDay> findByDoctor(Doctor doctor);
    List<DoctorWorkDay> findByDoctorAndWorkDay(Doctor doctor, DayOfWeek workDay);
    void deleteByDoctor(Doctor doctor);
}
