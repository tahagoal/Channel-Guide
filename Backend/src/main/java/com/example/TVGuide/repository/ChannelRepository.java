package com.example.TVGuide.repository;

import com.example.TVGuide.dto.ChannelDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ChannelRepository extends JpaRepository<com.example.TVGuide.model.Channels, Long> {
// Query all author names and their titles with the given price

    @Transactional(readOnly = true)
    @Query(value = "SELECT c.name AS name "
            + "FROM Channels c INNER JOIN Schedule s ON c.id = s.channelsByChannelId.id "
            + "WHERE s.shiftMinutes = ?1")
    List<ChannelDto> fetchChannelwithMinutes(int minutes);
}