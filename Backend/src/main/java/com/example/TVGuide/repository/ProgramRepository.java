package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ProgramDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProgramRepository extends JpaRepository<com.example.TVGuide.model.Programs, Long> {
    @Transactional(readOnly = true)
    @Query(value = "SELECT p.name AS name, p.colorCode AS colorCode, p.id AS id, p.description AS description "
            + "FROM Programs p "
            + "WHERE LOWER(p.name) like %?1%")
    List<ProgramDto> searchProgramByName(String name);

    @Query(value = "SELECT p.name AS name, " +
            "p.colorCode AS colorCode, " +
            "p.id AS id, " +
            "p.description AS description, " +
            "p.type AS type "
            + "FROM Programs p "
            + "WHERE id =  ?1")
    ProgramDto getProgrambyId(Integer id);

    @Query(value = "SELECT p.name, s.information, s.start_time, s.end_time "+
            "FROM programs as p left join schedule as s on p.id = s.program_id "+
            "where p.id = ?1 AND s.end_time >= current_timestamp "+
            "AND s.start_time < current_timestamp + INTERVAL '7 day'",
            nativeQuery = true)
    List<ProgramDto> getProgramDetailsSevenDays(Integer id);
}