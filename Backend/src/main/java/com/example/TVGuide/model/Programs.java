package com.example.TVGuide.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Programs {
    private String name;
    private String description;
    private String colorCode;
    private String type;
    private int id;

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

    @Basic
    @Column(name = "color_code", nullable = true, length = -1)
    public String getColorCode() {
        return colorCode;
    }

    public void setColorCode(String colorCode) {
        this.colorCode = colorCode;
    }

    @Basic
    @Column(name = "type", nullable = true, length = -1)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        Programs programs = (Programs) o;
        return id == programs.id &&
                Objects.equals(name, programs.name) &&
                Objects.equals(description, programs.description) &&
                Objects.equals(colorCode, programs.colorCode) &&
                Objects.equals(type, programs.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, description, colorCode, type, id);
    }
}
