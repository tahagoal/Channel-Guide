package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ChannelDto;
import com.example.TVGuide.dto.ChannelShowDto;
import com.example.TVGuide.dto.ProgramDto;
import com.example.TVGuide.dto.ScheduleDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ChannelRepository extends JpaRepository<com.example.TVGuide.model.Channels, Long> {
// Query all author names and their titles with the given price

    @Transactional(readOnly = true)
    @Query(value = "SELECT c.name AS name "
            + "FROM Channels c INNER JOIN Schedule s ON c.id = s.channelsByChannelId.id "
            + "WHERE s.shiftMinutes = ?1")
    List<ChannelDto> fetchChannelwithMinutes(int minutes);

    @Transactional(readOnly = true)
    @Query(value = "SELECT c.name as cName ,(s.start_time + (s.shift_minutes * interval '1 minute')) AS startTime, " +
            "(s.end_time + (s.shift_minutes * interval '1 minute')) as endTime, cast(s.information as text) as sInformation , " +
            "s.shift_minutes as shiftMinutes, c.id  as Id, p.type as pType, p.name as pName, p.color_code as colorCode FROM " +
            "schedule s inner join channels c on c.id = s.channel_id " +
            "inner join programs p on p.id = s.program_id " +
            "WHERE (s.start_time + (s.shift_minutes * interval '1 minute')) < current_timestamp AND " +
            "(s.end_time + (s.shift_minutes * interval '1 minute')) > current_timestamp ",
            nativeQuery = true)

    List<ChannelShowDto> getChannelWithLiveShow();


    @Query(value = "SELECT c.name AS name " +
            "FROM Channels as c " +
            "WHERE c.id =  ?1")
    ChannelDto getChannelbyId(Integer id);


    /**
     *
     *
     * Get Schedule for this channel for the next 7 days
     *
     *
     */

    @Query(value = "SELECT (s.start_time + (s.shift_minutes * interval '1 minute')) AS startTime, " +
            "(s.end_time + (s.shift_minutes * interval '1 minute')) as endTime,s.shift_minutes as shiftMinutes, " +
            "cast(s.information as text), DATE(s.start_time) as dayOrder ,s.id as Id , p.type as pType ," +
            "p.name as pName, p.id as pId "+
            "FROM channels c LEFT JOIN schedule s on c.id = s.channel_id " +
            "LEFT JOIN programs p on p.id = s.program_id "+
            "WHERE c.id = ?1 AND (s.start_time + (s.shift_minutes * interval '1 minute')) < current_timestamp + INTERVAL '7 day' " +
            "AND (s.end_time + (s.shift_minutes * interval '1 minute')) > current_timestamp ORDER By s.start_time asc",
            nativeQuery = true)
    List<ScheduleDto> getProgramDetailsSevenDays(Integer id);
}