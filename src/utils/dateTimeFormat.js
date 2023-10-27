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

export default DateTimeFormatComponent;