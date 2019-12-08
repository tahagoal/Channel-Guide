package com.example.TVGuide;

import com.example.TVGuide.controller.ChannelsController;
import com.example.TVGuide.dto.ProgramDto;
import com.example.TVGuide.model.Channels;
import com.example.TVGuide.model.Programs;
import com.example.TVGuide.model.Schedule;
import com.example.TVGuide.repository.ChannelRepository;
import com.example.TVGuide.repository.ProgramRepository;
import com.example.TVGuide.repository.ScheduleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class ScheduledTasks {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ChannelRepository channelRepository;

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private ChannelsController channelsController;

    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);

    private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    //Schedule with a fixed rate 10 seconds by call
    @Scheduled(fixedRate = 10000)
    public void scheduleTaskWithFixedRate() {
        //logger.info("Fixed Rate Task :: Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()) );
        channelsController.checkSchedulesToBeRecorded();
    }


    @EventListener
    public void seed(ContextRefreshedEvent event) {
        MigrateTables();
        seedTables();
    }

    public void MigrateTables(){
        String sql1 = "CREATE TABLE IF NOT EXISTS public.channels( " +
                "name text COLLATE pg_catalog.default, " +
                "description text COLLATE pg_catalog.default, " +
                "id SERIAL, " +
                "CONSTRAINT id PRIMARY KEY (id) " +
                ")";
        jdbcTemplate.execute(sql1);
        String sql2 = "CREATE TABLE IF NOT EXISTS public.programs( " +
                "name text COLLATE pg_catalog.default, " +
                "description text COLLATE pg_catalog.default, " +
                "color_code text COLLATE pg_catalog.default, " +
                "type text COLLATE pg_catalog.default, " +
                "id SERIAL, " +
                "CONSTRAINT programs_pkey PRIMARY KEY (id) " +
                ")";
        jdbcTemplate.execute(sql2);

        String sql3 = "CREATE TABLE IF NOT EXISTS public.schedule( "+
                "shift_minutes integer, " +
                "information text COLLATE pg_catalog.default, " +
                "id SERIAL, " +
                "channel_id integer NOT NULL, " +
                "program_id integer NOT NULL, " +
                "start_time timestamp without time zone, " +
                "end_time timestamp without time zone, " +
                "CONSTRAINT schedule_pkey PRIMARY KEY (id), " +
                "CONSTRAINT channel_fk FOREIGN KEY (channel_id) " +
                "REFERENCES public.channels (id) MATCH SIMPLE " +
                "ON UPDATE NO ACTION " +
                "ON DELETE NO ACTION, " +
                "CONSTRAINT program_fk FOREIGN KEY (program_id) " +
                "REFERENCES public.programs (id) MATCH SIMPLE " +
                "ON UPDATE NO ACTION " +
                "ON DELETE NO ACTION " +
                ")";
        jdbcTemplate.execute(sql3);

        String sql4 = "CREATE TABLE IF NOT EXISTS public.record_program" +
                "(" +
                "program_id integer NOT NULL, " +
                "id SERIAL, " +
                "CONSTRAINT record_program_pkey PRIMARY KEY (id), " +
                "CONSTRAINT record_program_program_id_fkey FOREIGN KEY (program_id) " +
                "REFERENCES public.programs (id) MATCH SIMPLE " +
                "ON UPDATE NO ACTION " +
                "ON DELETE NO ACTION " +
                "NOT VALID " +
                ")";
        jdbcTemplate.execute(sql4);

        String sql5 = "CREATE TABLE IF NOT EXISTS public.record_schedule" +
                "(" +
                "schedule_id integer NOT NULL, " +
                "id SERIAL, " +
                "CONSTRAINT record_schedule_pkey PRIMARY KEY (id), " +
                "CONSTRAINT record_schedule_schedule_id_fkey FOREIGN KEY (schedule_id) " +
                "REFERENCES public.schedule (id) MATCH SIMPLE " +
                "ON UPDATE NO ACTION " +
                "ON DELETE NO ACTION " +
                "NOT VALID " +
                ")";
        jdbcTemplate.execute(sql5);

        String sql6 = "CREATE TABLE IF NOT EXISTS public.recording" +
                "(" +
                "status text COLLATE pg_catalog.default, " +
                "schedule_id integer NOT NULL, " +
                "id SERIAL, " +
                "CONSTRAINT recording_pkey PRIMARY KEY (id), " +
                "CONSTRAINT recording_id_fkey FOREIGN KEY (id) " +
                "REFERENCES public.schedule (id) MATCH SIMPLE " +
                "ON UPDATE NO ACTION " +
                "ON DELETE NO ACTION " +
                "NOT VALID " +
                ")";
        jdbcTemplate.execute(sql6);
    }

    public void seedTables(){


        /*Just checking if at least one channel is exist, so no seeds will created*/
        /*Else, All channels, programs and schedules will be created*/
        String sql = "SELECT name FROM channels ch WHERE ch.name = 'Channel 1' LIMIT 1";
        List<Channels> ch = jdbcTemplate.query(sql, (resultSet, rowNum) -> null);
        if(ch == null || ch.size() <= 0) {
            Channels channel = new Channels();
            channel.setName("Channel Sports Pro");
            channel.setDescription("Channel Sports Pro for all kinds of sports");
            channelRepository.save(channel);

            Channels channel1 = new Channels();
            channel1.setName("Channel 2");
            channel1.setDescription("Channel Number two");
            channelRepository.save(channel1);

            Channels channel2 = new Channels();
            channel2.setName("Channel Series Max");
            channel2.setDescription("Channel Series Max for English Series");
            channelRepository.save(channel2);

            Channels channel3 = new Channels();
            channel3.setName("Channel 1");
            channel3.setDescription("Channel Number one Description ");
            channelRepository.save(channel3);


            Channels channel4 = new Channels();
            channel4.setName("Channel Movies+");
            channel4.setDescription("English Movies Channel");
            channelRepository.save(channel4);

            Channels channel5 = new Channels();
            channel5.setName("Channel 4k");
            channel5.setDescription("4K Quality Channel for entertainment");
            channelRepository.save(channel5);

            logger.info("Channel Seeded");


            /* Start seeding programs*/

            Programs program = new Programs();
            program.setName("Tennis");
            program.setDescription("Tennis Match");
            program.setColorCode("#2da1db");
            program.setType("sports");
            programRepository.save(program);

            Programs program1 = new Programs();
            program1.setName("Breaking Bad");
            program1.setDescription("English Series with multiple seasons");
            program1.setColorCode("#f25022");
            program1.setType("series");
            programRepository.save(program1);

            Programs program2 = new Programs();
            program2.setName("Prison Break");
            program2.setDescription("English Series with multiple seasons");
            program2.setColorCode("#a0a000");
            program2.setType("series");
            programRepository.save(program2);

            Programs program3 = new Programs();
            program3.setName("Match");
            program3.setDescription("Football Match");
            program3.setColorCode("#373c44");
            program3.setType("sports");
            programRepository.save(program3);

            Programs program4 = new Programs();
            program4.setName("Batman");
            program4.setDescription("Movie Series");
            program4.setColorCode("#f25022");
            program4.setType("movies");
            programRepository.save(program4);

            logger.info("Programs Seeded");

            Schedule schedule = new Schedule();
            schedule.setStartTime(Timestamp.valueOf("2019-12-09 09:00:00"));
            schedule.setEndTime(Timestamp.valueOf("2019-12-09 17:00:00"));
            schedule.setInformation("{\"name\": \"Say My Name\",\"season\": \"Season 1\",\"Episode\": \"E2\"}");
            schedule.setShiftMinutes(0);
            schedule.setChannelsByChannelId(channel2);
            schedule.setProgramsByProgramId(program1);
            scheduleRepository.save(schedule);


            Schedule schedule1 = new Schedule();
            schedule1.setStartTime(Timestamp.valueOf("2019-12-10 10:00:00"));
            schedule1.setEndTime(Timestamp.valueOf("2019-12-10 20:00:00"));
            schedule1.setInformation("{\"player1\": \"R. Federer\",\"player2\": \"R. Nadal\",\"description\": \"Wimbledon Finals\"}");
            schedule1.setShiftMinutes(0);
            schedule1.setChannelsByChannelId(channel);
            schedule1.setProgramsByProgramId(program);
            scheduleRepository.save(schedule1);

            Schedule schedule2 = new Schedule();
            schedule2.setStartTime(Timestamp.valueOf("2019-12-09 09:00:00"));
            schedule2.setEndTime(Timestamp.valueOf("2019-12-09 22:00:00"));
            schedule2.setInformation("{\"player1\": \"Novak\",\"player2\": \"Del Potro\",\"description\": \"Wimbledon Finals\"}");
            schedule2.setShiftMinutes(0);
            schedule2.setChannelsByChannelId(channel);
            schedule2.setProgramsByProgramId(program);
            scheduleRepository.save(schedule2);

            Schedule schedule3 = new Schedule();
            schedule3.setStartTime(Timestamp.valueOf("2019-12-12 14:00:00"));
            schedule3.setEndTime(Timestamp.valueOf("2019-12-12 18:00:00"));
            schedule3.setInformation("{\"player1\": \"R. Federer\",\"player2\": \"R. Nadal\",\"description\": \"Wimbledon Finals\"}");
            schedule3.setShiftMinutes(0);
            schedule3.setChannelsByChannelId(channel);
            schedule3.setProgramsByProgramId(program);
            scheduleRepository.save(schedule3);

            Schedule schedule4 = new Schedule();
            schedule4.setStartTime(Timestamp.valueOf("2019-12-12 10:00:00"));
            schedule4.setEndTime(Timestamp.valueOf("2019-12-12 18:00:00"));
            schedule4.setInformation("{\"player1\": \"Player tennis 1\",\"player2\": \"Player tennis 2\",\"description\": \"Wimbledon Finals\"}");
            schedule4.setShiftMinutes(0);
            schedule4.setChannelsByChannelId(channel);
            schedule4.setProgramsByProgramId(program);
            scheduleRepository.save(schedule4);

            Schedule schedule5 = new Schedule();
            schedule5.setStartTime(Timestamp.valueOf("2019-12-09 22:00:00"));
            schedule5.setEndTime(Timestamp.valueOf("2019-12-09 23:00:00"));
            schedule5.setInformation("{\"player1\": \"Player ten\",\"player2\": \"Player tenn\",\"description\": \"Wimbledon Finals\"}");
            schedule5.setShiftMinutes(0);
            schedule5.setChannelsByChannelId(channel);
            schedule5.setProgramsByProgramId(program);
            scheduleRepository.save(schedule5);


            Schedule schedule6 = new Schedule();
            schedule6.setStartTime(Timestamp.valueOf("2019-12-09 18:00:00"));
            schedule6.setEndTime(Timestamp.valueOf("2019-12-09 20:00:00"));
            schedule6.setInformation("{\"player1\": \"Old Player\",\"player2\": \"New Player\",\"description\": \"Wimbledon Finals\"}");
            schedule6.setShiftMinutes(0);
            schedule6.setChannelsByChannelId(channel);
            schedule6.setProgramsByProgramId(program);
            scheduleRepository.save(schedule6);

            Schedule schedule7 = new Schedule();
            schedule7.setStartTime(Timestamp.valueOf("2019-12-11 22:00:00"));
            schedule7.setEndTime(Timestamp.valueOf("2019-12-11 23:30:00"));
            schedule7.setInformation("{\"name\": \"Dragon Hells\",\"season\": \"Season 2\",\"Episode\": \"E5\"}");
            schedule7.setShiftMinutes(0);
            schedule7.setChannelsByChannelId(channel2);
            schedule7.setProgramsByProgramId(program1);
            scheduleRepository.save(schedule7);

            Schedule schedule8 = new Schedule();
            schedule8.setStartTime(Timestamp.valueOf("2019-12-11 22:00:00"));
            schedule8.setEndTime(Timestamp.valueOf("2019-12-11 23:00:00"));
            schedule8.setInformation("{\"team1\": \"Man. City\",\"team2\": \"Chelsea\",\"description\": \"Permier Legue\"}");
            schedule8.setShiftMinutes(0);
            schedule8.setChannelsByChannelId(channel);
            schedule8.setProgramsByProgramId(program3);
            scheduleRepository.save(schedule8);

            Schedule schedule9 = new Schedule();
            schedule9.setStartTime(Timestamp.valueOf("2019-12-11 22:00:00"));
            schedule9.setEndTime(Timestamp.valueOf("2019-12-11 23:00:00"));
            schedule9.setInformation("{\"season\": \"S2\",\"season_name\": \"Dark Night Rises\"}");
            schedule9.setShiftMinutes(0);
            schedule9.setChannelsByChannelId(channel4);
            schedule9.setProgramsByProgramId(program4);
            scheduleRepository.save(schedule9);

            Schedule schedule10 = new Schedule();
            schedule10.setStartTime(Timestamp.valueOf("2019-12-10 22:00:00"));
            schedule10.setEndTime(Timestamp.valueOf("2019-12-10 23:00:00"));
            schedule10.setInformation("{\"name\": \"Prison Break E Twenty\",\"season\": \"Season 2\",\"Episode\": \"E20\"}");
            schedule10.setShiftMinutes(0);
            schedule10.setChannelsByChannelId(channel2);
            schedule10.setProgramsByProgramId(program2);
            scheduleRepository.save(schedule10);

            logger.info("Schedules Seeded");

        } else {
            logger.info("Channels Seeding Not Required");
        }


    }
}