package com.example.TVGuide.dto;

import com.example.TVGuide.model.Schedule;

import java.util.List;

public interface ProgramDto {
    Integer getId();
    String getName();
    String getDescription();
    String getColorCode();
    String getType();
    List<Schedule> getSchedule();
}
