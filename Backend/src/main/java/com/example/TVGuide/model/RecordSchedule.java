package com.example.TVGuide.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "record_schedule", schema = "public", catalog = "channel-guide")
public class RecordSchedule {
    private int id;
    private Schedule scheduleByScheduleId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
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
        RecordSchedule that = (RecordSchedule) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id", nullable = false)
    public Schedule getScheduleByScheduleId() {
        return scheduleByScheduleId;
    }

    public void setScheduleByScheduleId(Schedule scheduleByScheduleId) {
        this.scheduleByScheduleId = scheduleByScheduleId;
    }
}
