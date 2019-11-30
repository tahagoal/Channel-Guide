package com.example.TVGuide.controller;
import com.example.TVGuide.dto.ChannelDto;
import com.example.TVGuide.dto.ProgramDto;
import com.example.TVGuide.model.Programs;
import com.example.TVGuide.repository.ChannelRepository;
import com.example.TVGuide.repository.ProgramRepository;
import com.example.TVGuide.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
public class ChannelsController {
    
    @Autowired
    private ChannelRepository channelRepository;
    
    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping("/channels")
    public Page<com.example.TVGuide.model.Channels> getChannels(Pageable pageable) {
        return channelRepository.findAll(pageable);
    }

    @GetMapping("/channel-minutes/{minutes}")
    public List<ChannelDto> getChannelsMinutes(@PathVariable Integer minutes){
        return channelRepository.fetchChannelwithMinutes(minutes);
    }

    @GetMapping("/programs/search/{name}")
    public List<ProgramDto> searchProgramByName(@PathVariable String name){
        return programRepository.searchProgramByName(name);
    }

    @GetMapping("/program/{id}")
    public ProgramDto getProgramById(@PathVariable Integer id){
        return programRepository.getProgrambyId(id);
    }

    @GetMapping("/program/details/{id}")
    public List<ProgramDto> getProgramDetailsSevenDays(@PathVariable Integer id){
        return programRepository.getProgramDetailsSevenDays(id);
    }

    @GetMapping("/programs")
    public Page<com.example.TVGuide.model.Programs> getPrograms(Pageable pageable) {
        return programRepository.findAll(pageable);
    }

    @GetMapping("/schedules")
    public Page<com.example.TVGuide.model.Schedule> getSchedules(Pageable pageable) {
        return scheduleRepository.findAll(pageable);
    }
}