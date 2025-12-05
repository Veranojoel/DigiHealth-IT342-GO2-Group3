package com.digihealth.backend.service;

import com.digihealth.backend.dto.UserProfileResponse;
import com.digihealth.backend.dto.UserProfileUpdateRequest;
import com.digihealth.backend.entity.Address;
import com.digihealth.backend.entity.Patient;
import com.digihealth.backend.entity.Role;
import com.digihealth.backend.entity.User;
import com.digihealth.backend.repository.DoctorRepository;
import com.digihealth.backend.repository.PatientRepository;
import com.digihealth.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceDualIdTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PatientRepository patientRepository;

    @Mock
    private DoctorRepository doctorRepository;

    private UserProfileService service;

    @BeforeEach
    void setup() {
        service = new UserProfileService();
        try {
            java.lang.reflect.Field f1 = UserProfileService.class.getDeclaredField("userRepository");
            f1.setAccessible(true);
            f1.set(service, userRepository);
            java.lang.reflect.Field f2 = UserProfileService.class.getDeclaredField("patientRepository");
            f2.setAccessible(true);
            f2.set(service, patientRepository);
            java.lang.reflect.Field f3 = UserProfileService.class.getDeclaredField("doctorRepository");
            f3.setAccessible(true);
            f3.set(service, doctorRepository);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    @DisplayName("updateUserProfile resolves patientId and updates patient data")
    void updateUserProfile_withPatientId_updatesPatientAndUser() {
        UUID patientId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();

        User user = new User();
        user.setId(userId);
        user.setEmail("patient@example.com");
        user.setFullName("John Doe");
        user.setRole(Role.PATIENT);

        Patient patient = new Patient();
        patient.setUser(user);
        try {
            java.lang.reflect.Field pidField = Patient.class.getDeclaredField("patientId");
            pidField.setAccessible(true);
            pidField.set(patient, patientId);
        } catch (Exception ignored) {}

        when(userRepository.findById(patientId)).thenReturn(Optional.empty());
        when(patientRepository.findById(patientId)).thenReturn(Optional.of(patient));
        when(patientRepository.findByUser(user)).thenReturn(Optional.of(patient));

        UserProfileUpdateRequest req = new UserProfileUpdateRequest();
        req.setPhoneNumber("123456789");
        req.setAge(30);
        req.setBloodType("O-");

        UserProfileResponse res = service.updateUserProfile(patientId, req);

        verify(userRepository, times(2)).findById(patientId);
        verify(patientRepository, times(2)).findById(patientId);
        verify(patientRepository, times(2)).findByUser(user);

        verify(userRepository).save(user);
        ArgumentCaptor<Patient> patientCaptor = ArgumentCaptor.forClass(Patient.class);
        verify(patientRepository).save(patientCaptor.capture());
        Patient saved = patientCaptor.getValue();
        assertEquals(Integer.valueOf(30), saved.getAge());
        assertEquals("O-", saved.getBloodType());

        assertNotNull(res);
        assertEquals(userId, res.getUserId());
        assertEquals("patient@example.com", res.getEmail());
        assertEquals("O-", res.getBloodType());
    }

    @Test
    @DisplayName("getUserProfile resolves userId directly")
    void getUserProfile_withUserId_returnsProfile() {
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setEmail("u@example.com");
        user.setFullName("U User");
        user.setRole(Role.PATIENT);

        Patient patient = new Patient();
        patient.setUser(user);
        Address addr = new Address();
        addr.setCity("City");
        patient.setAddress(addr);
        try {
            java.lang.reflect.Field bloodField = Patient.class.getDeclaredField("bloodType");
            bloodField.setAccessible(true);
            bloodField.set(patient, "A+");
        } catch (Exception ignored) {}

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(patientRepository.findByUser(user)).thenReturn(Optional.of(patient));

        UserProfileResponse res = service.getUserProfile(userId);
        assertNotNull(res);
        assertEquals(userId, res.getUserId());
        assertEquals("A+", res.getBloodType());
        assertEquals("City", res.getCity());
    }
}
