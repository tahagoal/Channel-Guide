package com.example.TVGuide.dto;

import java.util.Date;

public interface ChannelShowDto {
    String getcName();
    String getsInformation();
    Date getstartTime();
    Date getendTime();
    Integer getId();
    String getpType();
    Integer getshiftMinutes();
}
