import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

const DateTimeFormatComponent = ({ apiDateTime }) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        // Check if the API datetime string is not null or undefined
        if (apiDateTime) {
            // Assuming apiDateTime is a string from your API in the format 'yyyy-dd-mm:Thh:mm:ss.nano'
            // Convert it to a JavaScript Date object using parseISO from date-fns
            const parsedDate = parseISO(apiDateTime);

            // Format the date using date-fns to 'dd/MM/yy'
            const formatted = format(parsedDate, 'MMMM do, yyyy');

            // Set the formatted date to the state
            setFormattedDate(formatted);
        }
    }, [apiDateTime]);

    return (
        <p>{formattedDate}</p>
    );
};

export function formatDate(originalDate) {
    const date = new Date(originalDate);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Note that months are zero-based
    const year = date.getFullYear();

    // Use template literals to format the date
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export const formatDateTimeSubmit = (values) => {
    const inputDate = new Date(values);

    const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
    // Get the time zone offset and convert it to the "hh:mm" format
    const timeZoneOffsetHours = inputDate.getTimezoneOffset() / 60;
    const timeZoneOffsetMinutes = Math.abs(inputDate.getTimezoneOffset() % 60);
    const formattedTimeZoneOffset = `${Math.abs(timeZoneOffsetHours)
        .toString()
        .padStart(2, '0')}:${timeZoneOffsetMinutes.toString().padStart(2, '0')}:00`;

    // Combine the date and time zone offset to get the final formatted string
    const formattedDateTime = `${formattedDate}T${formattedTimeZoneOffset}`;
    return formattedDateTime;
};

export default DateTimeFormatComponent;