package com.digihealth.backend.service;

import com.digihealth.backend.entity.Appointment;
import com.digihealth.backend.entity.Patient;
import com.digihealth.backend.entity.AdminSettings;
import com.digihealth.backend.entity.AppointmentStatus;
import com.digihealth.backend.repository.AdminSettingsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

  @Autowired(required = false)
  private JavaMailSender mailSender;

  @Autowired
  private AdminSettingsRepository adminSettingsRepository;

  public void sendStatusUpdateEmail(Appointment appointment) {
    try {
      if (mailSender == null) {
        log.warn("JavaMailSender not configured; skipping email for appointment {}", appointment.getAppointmentId());
        return;
      }
      AdminSettings settings = adminSettingsRepository.findAll().stream().findFirst().orElse(null);
      boolean emailEnabled = settings == null || Boolean.TRUE.equals(settings.getNotifEmail());
      if (!emailEnabled) {
        log.info("Email notifications disabled in admin settings; skipping status email");
        return;
      }

      // Send to patient
      try {
        Patient patient = appointment.getPatient();
        String patientEmail = patient.getUser().getEmail();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(patientEmail);
        message.setSubject("Appointment Status Update - DigiHealth");
        message.setText(String.format(
          "Dear %s,\n\nYour appointment (ID: %s) status has been updated to %s.\n\n" +
          "Date: %s\nTime: %s\nDoctor: %s\n\n" +
          "Thank you,\nDigiHealth Team",
          patient.getUser().getFullName(),
          appointment.getAppointmentId(),
          appointment.getStatus(),
          appointment.getAppointmentDate(),
          appointment.getAppointmentTime(),
          appointment.getDoctor().getUser().getFullName()
        ));
        mailSender.send(message);
        log.info("Status update email sent to {}", patientEmail);
      } catch (Exception e) {
        log.error("Failed to send patient status email: {}", e.getMessage());
      }

      // Send to doctor on relevant status changes
      try {
        boolean notifyDoctorOnCancel = settings == null || Boolean.TRUE.equals(settings.getNotifOnCancellation());
        boolean notifyDoctorOnConfirm = settings != null && Boolean.TRUE.equals(settings.getNotifDoctorOnNew());
        AppointmentStatus status = appointment.getStatus();
        if ((status == AppointmentStatus.CANCELLED && notifyDoctorOnCancel) ||
            (status == AppointmentStatus.CONFIRMED && notifyDoctorOnConfirm)) {
          String doctorEmail = appointment.getDoctor().getUser().getEmail();
          SimpleMailMessage dmsg = new SimpleMailMessage();
          dmsg.setTo(doctorEmail);
          dmsg.setSubject("Appointment Update - DigiHealth");
          dmsg.setText(String.format(
            "Dear Dr. %s,\n\nAppointment (ID: %s) with patient %s is now %s.\n\n" +
            "Date: %s\nTime: %s\n\n" +
            "Regards,\nDigiHealth Team",
            appointment.getDoctor().getUser().getFullName(),
            appointment.getAppointmentId(),
            appointment.getPatient().getUser().getFullName(),
            appointment.getStatus(),
            appointment.getAppointmentDate(),
            appointment.getAppointmentTime()
          ));
          mailSender.send(dmsg);
          log.info("Doctor status update email sent to {}", doctorEmail);
        }
      } catch (Exception e) {
        log.error("Failed to send doctor status email: {}", e.getMessage());
      }
    } catch (Exception e) {
      log.error("Failed to send email for appointment {}: {}", appointment.getAppointmentId(), e.getMessage());
    }
  }

  public void sendNewAppointmentEmails(Appointment appointment) {
    try {
      if (mailSender == null) {
        log.warn("JavaMailSender not configured; skipping new appointment emails for {}", appointment.getAppointmentId());
        return;
      }
      AdminSettings settings = adminSettingsRepository.findAll().stream().findFirst().orElse(null);
      boolean emailEnabled = settings == null || Boolean.TRUE.equals(settings.getNotifEmail());
      if (!emailEnabled) {
        log.info("Email notifications disabled in admin settings; skipping new appointment emails");
        return;
      }

      // Patient confirmation email
      boolean notifyPatientOnConfirm = settings == null || Boolean.TRUE.equals(settings.getNotifPatientOnConfirm());
      if (notifyPatientOnConfirm) {
        try {
          String patientEmail = appointment.getPatient().getUser().getEmail();
          SimpleMailMessage pmsg = new SimpleMailMessage();
          pmsg.setTo(patientEmail);
          pmsg.setSubject("Appointment Booked - DigiHealth");
          pmsg.setText(String.format(
            "Dear %s,\n\nYour appointment (ID: %s) has been booked.\n\n" +
            "Date: %s\nTime: %s\nDoctor: %s\n\n" +
            "Thank you,\nDigiHealth Team",
            appointment.getPatient().getUser().getFullName(),
            appointment.getAppointmentId(),
            appointment.getAppointmentDate(),
            appointment.getAppointmentTime(),
            appointment.getDoctor().getUser().getFullName()
          ));
          mailSender.send(pmsg);
          log.info("New appointment email sent to patient {}", patientEmail);
        } catch (Exception e) {
          log.error("Failed to send patient new appointment email: {}", e.getMessage());
        }
      }

      // Doctor new appointment email
      boolean notifyDoctorOnNew = settings == null || Boolean.TRUE.equals(settings.getNotifDoctorOnNew());
      if (notifyDoctorOnNew) {
        try {
          String doctorEmail = appointment.getDoctor().getUser().getEmail();
          SimpleMailMessage dmsg = new SimpleMailMessage();
          dmsg.setTo(doctorEmail);
          dmsg.setSubject("New Appointment - DigiHealth");
          dmsg.setText(String.format(
            "Dear Dr. %s,\n\nYou have a new appointment (ID: %s).\n\n" +
            "Patient: %s\nDate: %s\nTime: %s\n\n" +
            "Regards,\nDigiHealth Team",
            appointment.getDoctor().getUser().getFullName(),
            appointment.getAppointmentId(),
            appointment.getPatient().getUser().getFullName(),
            appointment.getAppointmentDate(),
            appointment.getAppointmentTime()
          ));
          mailSender.send(dmsg);
          log.info("New appointment email sent to doctor {}", doctorEmail);
        } catch (Exception e) {
          log.error("Failed to send doctor new appointment email: {}", e.getMessage());
        }
      }
    } catch (Exception e) {
      log.error("Failed to send new appointment emails for {}: {}", appointment.getAppointmentId(), e.getMessage());
    }
  }

  public void sendRescheduleEmails(Appointment appointment, java.time.LocalDate oldDate, java.time.LocalTime oldTime) {
    try {
      if (mailSender == null) {
        log.warn("JavaMailSender not configured; skipping reschedule emails for {}", appointment.getAppointmentId());
        return;
      }
      AdminSettings settings = adminSettingsRepository.findAll().stream().findFirst().orElse(null);
      boolean emailEnabled = settings == null || Boolean.TRUE.equals(settings.getNotifEmail());
      if (!emailEnabled) {
        log.info("Email notifications disabled in admin settings; skipping reschedule emails");
        return;
      }

      // Patient reschedule confirmation
      try {
        String patientEmail = appointment.getPatient().getUser().getEmail();
        SimpleMailMessage pmsg = new SimpleMailMessage();
        pmsg.setTo(patientEmail);
        pmsg.setSubject("Appointment Rescheduled - DigiHealth");
        pmsg.setText(String.format(
          "Dear %s,\n\nYour appointment (ID: %s) has been rescheduled.\n\n" +
          "Old: %s at %s\nNew: %s at %s\nDoctor: %s\n\n" +
          "Thank you,\nDigiHealth Team",
          appointment.getPatient().getUser().getFullName(),
          appointment.getAppointmentId(),
          oldDate,
          oldTime,
          appointment.getAppointmentDate(),
          appointment.getAppointmentTime(),
          appointment.getDoctor().getUser().getFullName()
        ));
        mailSender.send(pmsg);
        log.info("Reschedule email sent to patient {}", patientEmail);
      } catch (Exception e) {
        log.error("Failed to send patient reschedule email: {}", e.getMessage());
      }

      // Doctor notification of reschedule
      boolean notifyDoctorOnNew = settings == null || Boolean.TRUE.equals(settings.getNotifDoctorOnNew());
      if (notifyDoctorOnNew) {
        try {
          String doctorEmail = appointment.getDoctor().getUser().getEmail();
          SimpleMailMessage dmsg = new SimpleMailMessage();
          dmsg.setTo(doctorEmail);
          dmsg.setSubject("Appointment Rescheduled - DigiHealth");
          dmsg.setText(String.format(
            "Dear Dr. %s,\n\nAppointment (ID: %s) with patient %s was rescheduled.\n\n" +
            "Old: %s at %s\nNew: %s at %s\n\n" +
            "Regards,\nDigiHealth Team",
            appointment.getDoctor().getUser().getFullName(),
            appointment.getAppointmentId(),
            appointment.getPatient().getUser().getFullName(),
            oldDate,
            oldTime,
            appointment.getAppointmentDate(),
            appointment.getAppointmentTime()
          ));
          mailSender.send(dmsg);
          log.info("Reschedule email sent to doctor {}", doctorEmail);
        } catch (Exception e) {
          log.error("Failed to send doctor reschedule email: {}", e.getMessage());
        }
      }
    } catch (Exception e) {
      log.error("Failed to send reschedule emails for {}: {}", appointment.getAppointmentId(), e.getMessage());
    }
  }
}
