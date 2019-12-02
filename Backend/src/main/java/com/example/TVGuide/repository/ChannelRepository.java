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
    @Query(value = "SELECT c.name as cName, s.start_time as startTime, s.end_time as endTime, cast(s.information as text) as sInformation , " +
            "s.shift_minutes as shiftMinutes, s.id  as Id, p.type as pType, p.name as pName FROM " +
            "schedule s inner join channels c on c.id = s.channel_id " +
            "inner join programs p on p.id = s.program_id " +
            "WHERE s.start_time < current_timestamp AND s.end_time > current_timestamp ",
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

    @Query(value = "SELECT s.start_time AS startTime, s.end_time as endTime,s.shift_minutes as shiftMinutes, " +
            "cast(s.information as text), extract(dow from s.end_time) as dayOrder "+
            "FROM channels c LEFT JOIN schedule s on c.id = s.program_id "+
            "WHERE c.id = ?1 AND s.end_time >= current_timestamp " +
            "AND s.start_time < current_timestamp + INTERVAL '7 day'",
            nativeQuery = true)
    List<ScheduleDto> getProgramDetailsSevenDays(Integer id);
}