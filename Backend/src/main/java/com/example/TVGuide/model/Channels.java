package com.example.TVGuide.model;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Channels {
    private String name;
    private String description;
    private int id;
//    private List<Schedule> schedules;

    @Basic
    @Column(name = "name", nullable = true, length = -1)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
        Channels channels = (Channels) o;
        return id == channels.id &&
                Objects.equals(name, channels.name) &&
                Objects.equals(description, channels.description);
    }

//    public void setSchedules(List<Schedule> schedules) {
//        this.schedules = schedules;
//    }
//
//    @OneToMany
//    @JoinColumn(name = "channel_id")
//    public List<Schedule> getSchedules() {
//        return schedules;
//    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description, id);
    }
}
