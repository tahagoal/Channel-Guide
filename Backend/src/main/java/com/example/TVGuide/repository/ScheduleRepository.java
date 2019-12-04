package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ProgramDto;
import com.example.TVGuide.dto.ScheduleDto;
import com.example.TVGuide.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<com.example.TVGuide.model.Schedule, Long> {
    @Transactional
    @Modifying
    @Query(value = "UPDATE schedule " +
            "SET shift_minutes = shift_minutes + ?2 " +
            "WHERE channel_id = (SELECT channel_id FROM schedule where schedule.id = ?1) " +
            "AND end_time > (SELECT end_time FROM schedule where schedule.id = ?1)",
            nativeQuery = true)
    void shiftingTime(int schedule_id, int minutes);


    /*
    *
    *
    * Recording functions
    *
    *
    * */

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO record_schedule(schedule_id) SELECT ?1 WHERE NOT EXISTS (SELECT * FROM record_schedule WHERE schedule_id = ?1)",
            nativeQuery = true)
    void recordSchedule(int schedule_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO record_program(program_id) select ?1 where not exists " +
            "(SELECT * FROM record_program where program_id = ?1)",
            nativeQuery = true)
    void recordProgram(int program_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO recording(status, schedule_id) VALUES('recording', ?1)",
            nativeQuery = true)
    void startRecording(int schedule_id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE recording SET status = 'finished' where schedule_id =?1 ",
            nativeQuery = true)
    void finishRecording(int schedule_id);


    @Query(value = "SELECT s.id " +
            "FROM schedule s RIGHT JOIN record_schedule rs on s.id = rs.schedule_id " +
            "LEFT JOIN recording r on s.id = r.schedule_id "+
            "WHERE (s.end_time + (s.shift_minutes * interval '1 minute')) >= current_timestamp " +
            "AND (s.start_time + (s.shift_minutes * interval '1 minute')) < current_timestamp + INTERVAL '7 day' " +
            "AND r.status IS NULL",
            nativeQuery = true)
    List<ScheduleDto> getSchedulesToBeRecorded();

    @Query(value = "SELECT s.id " +
            "FROM schedule s RIGHT JOIN record_schedule rs on s.id = rs.schedule_id " +
            "LEFT JOIN recording r on s.id = r.schedule_id "+
            "WHERE (s.end_time + (s.shift_minutes * interval '1 minute')) < current_timestamp " +
            "AND r.status = 'recording' ",
            nativeQuery = true)
    List<ScheduleDto> getSchedulesToBeFinished();


    @Query(value = "SELECT s.id " +
            "FROM schedule s LEFT JOIN programs p on s.program_id = p.id " +
            "RIGHT JOIN record_program rp on p.id = rp.program_id",
            nativeQuery = true)
    List<ScheduleDto> getSchedulestoRelatedProgram();
}