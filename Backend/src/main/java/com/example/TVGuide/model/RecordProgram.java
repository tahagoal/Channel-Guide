package com.example.TVGuide.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "record_program", schema = "public", catalog = "channel-guide")
public class RecordProgram {
    private int id;
    private Programs programsByProgramId;

    @Id
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
        RecordProgram that = (RecordProgram) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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
