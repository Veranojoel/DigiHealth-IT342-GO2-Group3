package com.digihealth.backend.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class WorkingHoursDto {
    private List<String> workDays;
    private Map<String, TimeRange> workHours;

    /**
     * Time range for working hours
     */
    @Data
    public static class TimeRange {
        private String startTime;
        private String endTime;
    }

    /**
     * Helper method to get time range for a specific day
     */
    public TimeRange getTimeRangeForDay(String day) {
        return workHours != null ? workHours.get(day) : null;
    }

    /**
     * Helper method to check if a day is available
     */
    public boolean isDayAvailable(String day) {
        return workDays != null && workDays.contains(day);
    }
}
