package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ProgramDto;
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
}