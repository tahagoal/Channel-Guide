package com.example.TVGuide.dto;

import com.example.TVGuide.model.Schedule;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.Date;
import java.util.List;

public interface ScheduleDto {
    Date getStartTime();
    Date getEndTime();
    Integer getShiftMinutes();
    String getInformation();
    Integer getdayOrder();
    Integer getid();
}
