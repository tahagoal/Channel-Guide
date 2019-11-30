package com.example.TVGuide.model;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;
import java.util.Objects;

@Entity
public class Schedule {
    private Date startTime;
    private Date endTime;
    private Integer shiftMinutes;
    private String information;
    private int id;
    private Channels channelsByChannelId;
    private Programs programsByProgramId;

    @Basic
    @Column(name = "start_time", nullable = true)
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    @Basic
    @Column(name = "end_time", nullable = true)
    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    @Basic
    @Column(name = "shift_minutes", nullable = true)
    public Integer getShiftMinutes() {
        return shiftMinutes;
    }

    public void setShiftMinutes(Integer shiftMinutes) {
        this.shiftMinutes = shiftMinutes;
    }

    @Basic
    @Column(name = "information", nullable = true)
    public String getInformation() {
        return information;
    }

    public void setInformation(String information) {
        this.information = information;
    }

    @Id
    @Column(name = "id", nullable = false)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Schedule schedule = (Schedule) o;
        return id == schedule.id &&
                Objects.equals(startTime, schedule.startTime) &&
                Objects.equals(endTime, schedule.endTime) &&
                Objects.equals(shiftMinutes, schedule.shiftMinutes) &&
                Objects.equals(information, schedule.information);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startTime, endTime, shiftMinutes, information, id);
    }

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id", nullable = false)
    public Channels getChannelsByChannelId() {
        return channelsByChannelId;
    }

    public void setChannelsByChannelId(Channels channelsByChannelId) {
        this.channelsByChannelId = channelsByChannelId;
    }

    @ManyToOne
    @JoinColumn(name = "program_id", referencedColumnName = "id", nullable = false)
    public Programs getProgramsByProgramId() {
        return programsByProgramId;
    }

    public void setProgramsByProgramId(Programs programsByProgramId) {
        this.programsByProgramId = programsByProgramId;
    }
}
