package com.example.TVGuide.controller;
import com.example.TVGuide.dto.*;
import com.example.TVGuide.model.Programs;
import com.example.TVGuide.model.Schedule;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/channels")
    public Page<com.example.TVGuide.model.Channels> getChannels(Pageable pageable) {
        return channelRepository.findAll(pageable);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/channel-minutes/{minutes}")
    public List<ChannelDto> getChannelsMinutes(@PathVariable Integer minutes){
        return channelRepository.fetchChannelwithMinutes(minutes);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/programs/search/{name}")
    public List<ProgramDto> searchProgramByName(@PathVariable String name){
        return programRepository.searchProgramByName(name, name.toLowerCase());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/program/{id}")
    public ProgramDto getProgramById(@PathVariable Integer id){
        return programRepository.getProgrambyId(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/program/details/{id}")
    public ProgramSchedulesDto getProgramDetailsSevenDays(@PathVariable Integer id){
        List<ScheduleDto> schedules = programRepository.getProgramDetailsSevenDays(id);
        ProgramDto program = programRepository.getProgrambyId(id);

        ProgramSchedulesDto data = new ProgramSchedulesDto();
        data.program = program.getName();
        data.schedules = schedules;
        return (data);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/programs")
    public Page<com.example.TVGuide.model.Programs> getPrograms(Pageable pageable) {
        return programRepository.findAll(pageable);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/schedules")
    public Page<com.example.TVGuide.model.Schedule> getSchedules(Pageable pageable) {
        return scheduleRepository.findAll(pageable);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/schedule/{schedule_id}/shiftMinutes/{minutes}")
    public void shiftingTime(@PathVariable int schedule_id, @PathVariable int minutes){
        scheduleRepository.shiftingTime(schedule_id, minutes);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getChannelWithLiveShow")
    public List<ChannelShowDto> getChannelWithLiveShow(){ return channelRepository.getChannelWithLiveShow(); }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/channel/details/{id}")
    public ChannelSchedulesDto getChannelDetailsSevenDays(@PathVariable Integer id){
        List<ScheduleDto> schedules = channelRepository.getProgramDetailsSevenDays(id);
        ChannelDto channel = channelRepository.getChannelbyId(id);

        ChannelSchedulesDto data = new ChannelSchedulesDto();
        data.channel = channel.getName();
        data.schedules = schedules;
        return (data);
    }



    /*
    *
    *
    * For Recording code and APIs
    *
    *
    * */

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/record/schedule/{schedule_id}")
    public void recordSchedule(@PathVariable int schedule_id){
        scheduleRepository.recordSchedule(schedule_id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/record/program/{program_id}")
    public void recordProgram(@PathVariable int program_id){
        scheduleRepository.recordProgram(program_id);
    }

    public void checkSchedulesToBeRecorded(){
        List<ScheduleDto> scheulesRelatedtoPrograms = scheduleRepository.getSchedulestoRelatedProgram();
        for (int i=0; i<scheulesRelatedtoPrograms.size(); i++) {
            scheduleRepository.recordSchedule(scheulesRelatedtoPrograms.get(i).getid());
        }

        List<ScheduleDto> toBeRecordedSchedules = scheduleRepository.getSchedulesToBeRecorded();
        for (int i=0; i<toBeRecordedSchedules.size(); i++) {
            scheduleRepository.startRecording(toBeRecordedSchedules.get(i).getid());
        }
        List<ScheduleDto> toBeFinishedSchedules = scheduleRepository.getSchedulesToBeFinished();
        for (int i=0; i<toBeFinishedSchedules.size(); i++) {
            scheduleRepository.finishRecording(toBeFinishedSchedules.get(i).getid());
        }
    }



    //Testing functions

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/schedule/test")
    public void startRecording(){
        scheduleRepository.recordSchedule(1);
    }

}