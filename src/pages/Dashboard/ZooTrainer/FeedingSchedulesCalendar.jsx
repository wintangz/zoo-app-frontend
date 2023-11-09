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
import moment from 'moment';
import { formatDateTime } from '~/utils/dateTimeFormat';
import { Button as PrimeButton } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

function Calendar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation()
    const [schedule, setSchedule] = useState([]);
    const [pureSchedules, setPureSchedules] = useState([]);
    const [allSchedule, setAllSchedule] = useState([]);
    const [currentSchedule, setCurrentSchedule] = useState([]); //set current schedule for on click on schedule 
    useEffect(() => {
        const res = getAllSchedule()
        const filterDate = [];

        res.then((schedules) => {
            console.log(schedules)
            setPureSchedules(schedules)
            if (location.state) {
                const filter = schedules.filter(schedule => {
                    return schedule.animalId.id === location.state.id;
                })
                filter.map((schedule) => {
                    const object = {
                        className: 'text-[0.85rem] font-bold',
                        id: schedule.id,
                        start: schedule.feedingTime,
                        title: schedule.animalId.name + " - " + schedule.animalId.id + "\n"
                            + schedule.zooTrainerId.firstname,
                        color: schedule.fed ? "green" : "red",
                    }
                    filterDate.push(object);
                    setSchedule(filterDate)
                })
                setAllSchedule(filter)
            } else {
                schedules.map((schedule) => {
                    const object = {
                        className: 'text-lg font-bold',
                        id: schedule.id,
                        startTime: schedule.feedingTime,
                        title: schedule.animalId.name + " - " + schedule.animalId.id + "\n"
                            + schedule.zooTrainerId.firstname,
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

    const handleEventClick = (selected) => {
        setOpen(true)
        const current = pureSchedules.find((s) => s.id.toString() === selected.event.id)
        setCurrentSchedule(current)
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

    const labels = {
        title: 'Feeding Schedule Management',
        subtitle: 'Calendar of Feeding Schedules',
        apiPath: '/feeding_schedules',
    }

    console.log(currentSchedule)
    return (
        <div className='w-[81.5vw]'>
            <div>
                {currentSchedule &&
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box className='absolute flex right-0 h-full w-[35%] border flex-column p-5 bg-white justify-between'>
                            <Box display="flex" sx={{ justifyContent: "center", fontWeight: 700, }}>
                                <h2 id="parent-modal-title" style={{ padding: "0.5rem", borderBottom: `1px solid ${colors.grey[100]}`, fontSize: "1.5rem" }}>Schedule Detail</h2>
                            </Box>
                            <Box display="flex" sx={{ height: "80%", fontSize: "1rem", flexDirection: 'column', lineHeight: 2 }}>
                                <div className='font-bold'>ID: {currentSchedule.id}</div>
                                <div><span className='font-bold'>Animal:</span> {`${currentSchedule.animalId?.name} - ${currentSchedule.animalId?.id}`}</div>
                                <div><span className='font-bold'>Zoo Trainers:</span> {currentSchedule.animalId?.trainers.map((trainer) =>
                                    <Tag severity='primary' className='mr-2' value={`${trainer.lastname} ${trainer.firstname} - ${trainer.id}`} />
                                )}</div>
                                <div><span className='font-bold'>Time:</span> {formatDateTime(new Date(currentSchedule.feedingTime))}</div>
                                <div><span className='font-bold'>Created by:</span> {`${currentSchedule.zooTrainerId?.lastname} ${currentSchedule.zooTrainerId?.firstname} - ${currentSchedule.zooTrainerId?.id}`}</div>
                                <div><span className='font-bold'>Completed:</span> <span className={`${currentSchedule.fed ? 'bg-green-500' : 'bg-red-500'} py-1 px-3 rounded text-white`}>{currentSchedule.fed ? "Yes" : "Not yet"}</span></div>
                                <div><span className='font-bold'>Completed by:</span> {currentSchedule.feederId ? `${currentSchedule?.feederId?.lastname} ${currentSchedule?.feederId?.firstname} - ${currentSchedule?.feederId?.id}` : ''}</div>
                                <div className=''>
                                    <div className='pb-2 text-center font-bold text-xl'>Foods</div>
                                    <DataTable scrollable scrollHeight='25vh' value={currentSchedule.details} showGridlines className='text-sm border'>
                                        <Column header='Food' field='food.name' />
                                        <Column header='Type' field='food.type' />
                                        <Column header='Exp. Qty (kg)' field='expectedQuantity' />
                                        <Column header='Act. Qty (kg)' field='actualQuantity' />
                                        <Column header='Img' field='imgUrl' />
                                    </DataTable>
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
                    </Modal>}
            </div>
            <div className='p-5'>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            <Box className='bg-[#f8f9fa] p-2 border mx-5 mb-5'>
                <Box className='flex mb-3 space-x-3'>
                    <Link to="/dashboard/animals/feeding" state={location.state}><PrimeButton label='View by Table' severity='info' /></Link>
                    <Link to="/dashboard/animals/feeding/create"><PrimeButton label='Create' severity='success' /></Link>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{
                    maxHeight: "100%",
                    height: '75vh',
                    overflow: 'hidden'
                }}>
                    {/* CALENDAR SIDEBAR */}
                    <Box flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                        <Typography variant="h5" className='text-lg font-bold text-center'>Upcoming</Typography>
                        <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
                            {console.log(schedule)}
                            {pureSchedules.filter((s) => !s.fed).map((s) => (
                                <Panel header={`${s.id} - ${s.animalId.name}`}
                                    className='text-sm my-1'
                                    onClick={
                                        () => {
                                            setCurrentSchedule(s);
                                            setOpen(true);
                                        }
                                    }>
                                    <p>{s.feedingTime.replace("T", " ")}</p>
                                    <p>{`Creator: ${s.zooTrainerId.firstname}`}</p>
                                </Panel>
                            ))}
                        </List>
                    </Box>
                    {schedule.length !== 0 && <Box flex="1 1 100%" ml="15px">
                        <FullCalendar
                            // eventTextColor='red'
                            // eventColor={schedule.map(curSche => curSche.isFed ? "red" : "green")}
                            height="75vh"
                            plugins={[dayGridPlugin, timeGridPlugin]}
                            headerToolbar={{
                                left: 'prev next today',
                                center: 'title',
                                right: 'timeGridDay timeGridWeek dayGridMonth',
                            }}
                            initialView="timeGridWeek"
                            selectable={true}
                            dayMaxEvents={true}
                            eventClick={handleEventClick}
                            eventsSet={(event) => {
                                setCurrentEvents(event);
                            }}
                            initialEvents={schedule}
                            eventMinHeight={100}
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
        </div >
    );
}

export default Calendar;
