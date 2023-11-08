import { formatDate } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Button, List, ListItem, ListItemText, Modal, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllSchedule } from '~/api/animalsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';
import { tokens } from '~/theme';
import './index.css'
import moment from 'moment';
import { formatDateTime } from '~/utils/dateTimeFormat';
import { Button as PrimeButton } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom';

function Calendar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation()
    const [schedule, setSchedule] = useState([]);
    const [allSchedule, setAllSchedule] = useState([]);
    const [currentSchedule, setCurrentSchedule] = useState([]); //set current schedule for on click on schedule 
    useEffect(() => {
        const res = getAllSchedule()
        const filterDate = [];

        res.then((schedules) => {
            console.log(schedules)
            if (location.state) {
                const filter = schedules.filter(schedule => {
                    return schedule.animalId.id === location.state.id;
                })
                filter.map((schedule) => {
                    const object = {
                        id: schedule.id,
                        title: "Feeding: " + schedule.animalId.name + " Animal Id: " + schedule.animalId.id,
                        start: schedule.feedingTime,
                        color: schedule.fed ? "green" : "red",
                    }
                    filterDate.push(object);
                    setSchedule(filterDate)
                })
                setAllSchedule(filter)
            } else {
                schedules.map((schedule) => {
                    const object = {
                        id: schedule.id,
                        title: "Feeding: " + schedule.animalId.name + " Animal Id: " + schedule.animalId.id,
                        start: schedule.feedingTime,
                        color: schedule.fed ? "green" : "red",
                    }
                    filterDate.push(object);
                    setSchedule(filterDate)
                })
                setAllSchedule(schedules)
            }
        })
    }, [])
    const [currentEvents, setCurrentEvents] = useState([]);

    const [open, setOpen] = useState(null);
    const style = {
        position: 'absolute',
        display: "flex",
        right: '0',
        width: 400,
        height: '100%',
        bgcolor: colors.grey[500],
        border: '2px solid white',
        color: colors.grey[100],
        justifyContent: 'space-between',
        flexDirection: 'column',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };
    const handleEventClick = (selected) => {
        setOpen(true)
        const filter = allSchedule.filter(event => {
            return event.id === Number.parseInt(selected.event.id)
        })
        setCurrentSchedule(filter)
    };
    const handleClose = () => {
        setOpen(false);
    }
    const elements = document.getElementsByClassName('fc-event-time');
    for (let i = 0; i < elements.length; i++) {
        const time = elements[i].textContent;
        elements[i].style.paddingLeft = "0.5rem"
        elements[i].style.paddingTop = "0.5rem"
        elements[i].innerHTML = `Time: `;
    }
    const elementContent = document.getElementsByClassName("fc-event-title-container");
    for (let i = 0; i < elementContent.length; i++) {
        elementContent[i].style.paddingLeft = "0.5rem"
    }
    console.log(location.state)
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <Box display="flex" sx={{ justifyContent: "center", fontWeight: 700, }}>
                            <h2 id="parent-modal-title" style={{ padding: "0.5rem", borderBottom: `1px solid ${colors.grey[100]}`, fontSize: "1.5rem" }}>Schedule Detail</h2>
                        </Box>
                        <Box display="flex" sx={{ height: "80%", fontSize: "1rem", flexDirection: 'column', lineHeight: 2 }}>
                            <div>Animal: {currentSchedule.map(curSchedule => `${curSchedule.animalId.name} - ${curSchedule.animalId.id}`)}</div>
                            <div>Schedule Id: {currentSchedule.map(curSchedule => curSchedule.id)}</div>
                            <div>Feeding Time: {currentSchedule.map(curSchedule => formatDateTime(new Date(curSchedule.feedingTime)))}</div>
                            <div>Zootrainer: {currentSchedule.map(curSchedule => `${curSchedule.zooTrainerId.lastname} ${curSchedule.zooTrainerId.firstname} - ${curSchedule.zooTrainerId.id}`)}</div>
                            <div>Is Fed: <span style={{ background: currentSchedule.map(curSchedule => curSchedule.fed ? "green" : "red"), padding: "0.2rem", borderRadius: '5px', color: "white" }}>{currentSchedule.map(curSchedule => curSchedule.fed ? "Done" : "Not yet")}</span></div>
                            <div className='schedule-detail-food'>
                                <div style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "600" }}>Table of Food Detail</div>
                                <table>
                                    <tr>
                                        <th>Food</th>
                                        <th>Expected Quantity</th>
                                        <th>Actual Quantity</th>
                                    </tr>
                                    {currentSchedule.map(curSchedule => {
                                        return curSchedule.details.map(detail => {
                                            return (
                                                <tr>
                                                    <td>{`${detail.food.name} - ${detail.food.type}`}</td>
                                                    <td>{detail.expectedQuantity}</td>
                                                    <td>{detail.actualQuantity}</td>
                                                </tr>
                                            )
                                        })
                                    })}
                                </table>
                            </div>

                        </Box>
                        <Box display="flex" sx={{ justifyContent: "center" }}>
                            <Button
                                color='secondary'
                                sx={{
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    alignItems: 'flex-end',
                                    background: "#f8bf02",
                                    color: "white",
                                    transition: "background 0.3s ease", // Add a transition for the background color
                                    '&:hover': {
                                        background: "black", // Change background color on hover
                                    }
                                }}
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
            <Box m="20px">
                <AdminHeader title="CALENDAR" subtitle="Full Calendar Interative Page" />
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link to="/dashboard/animals/feeding" state={location.state}><PrimeButton label='View by Table' severity='success' /></Link>

                </Box>
                <Box display="flex" justifyContent="space-between" sx={{
                    maxHeight: "100%",
                    height: '75vh',
                    overflow: 'hidden'
                }}>
                    {/* CALENDAR SIDEBAR */}
                    <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                        <Typography variant="h5">Events</Typography>
                        <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
                            {currentEvents.map((event) => (
                                <ListItem
                                    key={event.id}
                                    sx={{ backgroundColor: colors.greenAccent[600], margin: '10px 0', borderRadius: '2px' }}
                                >
                                    <ListItemText
                                        primary={event.title}
                                        secondary={
                                            <Typography>
                                                {formatDate(event.start, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    {schedule.length !== 0 && <Box flex="1 1 100%" ml="15px">
                        <FullCalendar
                            // eventTextColor='red'
                            // eventColor={schedule.map(curSche => curSche.isFed ? "red" : "green")}
                            height="75vh"
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            headerToolbar={{
                                left: 'prev, next, today',
                                center: 'title',
                                right: 'timeGridWeek',
                            }}
                            initialView="timeGridWeek"
                            selectable={true}
                            dayMaxEvents={true}
                            eventClick={handleEventClick}
                            eventsSet={(event) => {
                                setCurrentEvents(event);
                            }}
                            initialEvents={schedule}
                        />
                    </Box>}
                </Box>
                <style type="text/css">
                    {`
              .fc-scrollgrid-sync-inner a {
                color: ${colors.grey[100]};
                text-decoration: none;
              }
            `}
                </style>
            </Box>
        </>
    );
}

export default Calendar;
