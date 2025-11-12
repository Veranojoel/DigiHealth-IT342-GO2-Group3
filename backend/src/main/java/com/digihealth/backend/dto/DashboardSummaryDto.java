package com.digihealth.backend.dto;

import lombok.Data;

@Data
public class DashboardSummaryDto {
    private long totalPatients;
    private long todayConfirmed;
    private long todayPending;
    private long todayCompleted;

    // Explicit setters for tests
    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public void setTodayConfirmed(long todayConfirmed) {
        this.todayConfirmed = todayConfirmed;
    }

    public void setTodayPending(long todayPending) {
        this.todayPending = todayPending;
    }

    public void setTodayCompleted(long todayCompleted) {
        this.todayCompleted = todayCompleted;
    }
}