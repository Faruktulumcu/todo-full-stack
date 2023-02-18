package com.example.taskcrud.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class DateUtils {

    public static final String DATE_PATTERN = "dd.MM.yyyy HH:mm:ss";

    public static String formatLocalDate(LocalDateTime date) {
        return date != null ? date.format(DateTimeFormatter.ofPattern(DATE_PATTERN)) : "";
    }
}
