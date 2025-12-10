package com.digihealth.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRescheduleRequest {
  private LocalDate appointmentDate;
  private LocalTime appointmentTime;
  private String reason;
}
