package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ProgramDto;
import com.example.TVGuide.dto.ScheduleDto;
import com.example.TVGuide.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<com.example.TVGuide.model.Programs, Long> {
    @Transactional(readOnly = true)
    @Query(value = "SELECT p.name AS name, p.color_code AS colorCode, p.id AS id, p.description AS description "
            + "FROM programs p "
            + "WHERE LOWER(p.name) like %?1% OR LOWER(p.name) like %?2% LIMIT 10",
    nativeQuery = true)
    List<ProgramDto> searchProgramByName(String name, String lowerName);

    @Query(value = "SELECT p.name AS name, " +
            "p.colorCode AS colorCode, " +
            "p.id AS id, " +
            "p.description AS description, " +
            "p.type AS type "
            + "FROM Programs p "
            + "WHERE id =  ?1")
    ProgramDto getProgrambyId(Integer id);


    /*
    *
    *
    * Retrieve Schedule Details for the next Seven Days
    *
    * */

    @Query(value = "SELECT s.start_time AS startTime, s.end_time as endTime," +
            "s.shift_minutes as shiftMinutes, cast(s.information as text), s.id as Id, p.type as pType, " +
            "DATE(s.start_time) as dayOrder "+
            "FROM programs p LEFT JOIN schedule s on p.id = s.program_id "+
            "WHERE p.id = ?1 AND (s.start_time + (s.shift_minutes * interval '1 minute')) < current_timestamp + INTERVAL '7 day' " +
            "AND (s.end_time + (s.shift_minutes * interval '1 minute')) > current_timestamp ORDER By s.start_time asc",
            nativeQuery = true)
    List<ScheduleDto> getProgramDetailsSevenDays(Integer id);
}