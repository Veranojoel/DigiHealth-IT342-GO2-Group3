package com.digihealth.backend.controller;

import com.digihealth.backend.dto.*;
import com.digihealth.backend.service.DashboardService;
import com.digihealth.backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DoctorDashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/dashboard/summary")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        DashboardSummaryDto summary = dashboardService.getDashboardSummaryForCurrentDoctor();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/appointments/today")
    public ResponseEntity<List<TodayAppointmentDto>> getTodayAppointments() {
        List<TodayAppointmentDto> appointments = dashboardService.getTodayAppointmentsForCurrentDoctor();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/doctors/me/patients")
    public ResponseEntity<List<DoctorPatientDto>> getMyPatients() {
        List<DoctorPatientDto> patients = dashboardService.getPatientsForCurrentDoctor();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/doctors/me/appointments")
    public ResponseEntity<List<DoctorAppointmentDto>> getMyAppointments() {
        List<DoctorAppointmentDto> appointments = dashboardService.getAppointmentsForCurrentDoctor();
        return ResponseEntity.ok(appointments);
    }

    @PutMapping("/doctors/me/working-hours")
    public ResponseEntity<?> updateWorkingHours(@RequestBody WorkingHoursDto workingHoursDto) {
        doctorService.updateWorkingHours(workingHoursDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/doctors/me/working-hours")
    public ResponseEntity<WorkingHoursDto> getWorkingHours() {
        WorkingHoursDto workingHours = doctorService.getWorkingHours();
        return ResponseEntity.ok(workingHours);
    }
}
