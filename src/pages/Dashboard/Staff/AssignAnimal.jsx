import moment from "moment/moment";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { assignZooTrainerToAnimal } from "~/api/animalsService";
import { get } from "~/utils/axiosClient";
import { decode } from "../AxiosClient";

function AssignAnimal() {
    const navigate = useNavigate();
    const [selectedTrainer, setSelectedTrainer] = useState(null);
    const toast = useRef(null);
    const location = useLocation()
    const labels = {
        title: 'Animal Management',
        subtitle: 'Assign Zoo trainer to animal',
        apiPath: '/users/zoo-trainers'
    }

    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)
    const { data1, mutate1, isLoading1 } = useSWR(`/animals/${location.state.id}`, get)
    console.log(data1);
    const filteredTrainers = data?.data.filter((trainer) => {
        return (
            !location.state.animalTrainerAssignors.some((existingTrainer) => existingTrainer.trainer.id === trainer.id) &&
            trainer.status === true
        );
    }).map(trainer => {
        trainer.fullname = `${trainer.lastname} ${trainer.firstname}`;
        return trainer
    });

    const handleSubmit = () => {
        try {
            const values = {
                animal_id: location.state.id,
                assigned_by: parseInt(decode(localStorage.getItem('token')).sub),
                trainer_id: selectedTrainer.id,
            }
            const path = `animals/${location.state.id}/zoo-trainers/${selectedTrainer.id}`;
            const res = assignZooTrainerToAnimal(values, path);
            res.then(result => {
                console.log(result)
                if (result.status === 200) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Assign successfully', life: 3000 })
                    setSelectedTrainer(null);
                    mutate({ ...data })
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: result.data.serverError, life: 3000 })
                }
            })
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error, life: 3000 })
        }
    }
    return (
        <div className="p-5 w-[80vw]">
            <Toast ref={toast} />
            <div >
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            <div className="p-m-5 w-[100%] flex justify-between">
                <div className='w-[100%]'>
                    <div className='p-field w-[70%] mt-4 flex flex-col'>
                        <label className='font-bold block mb-2' >Animal Name</label>
                        <InputText
                            disabled
                            value={location.state.name}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Date of birth</label>
                        <InputText
                            disabled
                            value={moment(location.state.dateOfBirth).format("YYYY/MM/DD hh:mm:ss")}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Species</label>
                        <InputText
                            disabled
                            value={location.state.species}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Origin</label>
                        <InputText
                            disabled
                            value={location.state.origin}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Assignor</label>
                        {/* <div className='p-field w-[100%] mt-2 flex flex-col border-2 rounded-lg h-[50px] flex justify-normal p-2'> */}
                        <div className="border-2 p-2 rounded-lg">
                            {location.state.animalTrainerAssignors.map(trainer => (
                                <Tag className="mr-2" key={trainer.trainer.id} value={trainer.trainer.firstname} />
                            ))}
                        </div  >
                        {/* </div> */}
                    </div>
                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Animal Image</label>
                        <Image className='inline w-[30%]' src={location.state.imgUrl} alt="Image" width="400" preview />
                    </div>

                </div>

                <div className="w-[100%]">
                    <div className="p-field w-[70%] mt-4 flex flex-col">
                        <label className='font-bold block  mb-2' >Zoo trainer Name</label>
                        <Dropdown
                            className="w-[100%]"
                            value={selectedTrainer ? selectedTrainer : data?.data.filter((trainer) => {
                                return (
                                    !location.state.animalTrainerAssignors.some((existingTrainer) => existingTrainer.trainer.id === trainer.id) &&
                                    trainer.status === true
                                );
                            })[0].id}
                            filter
                            options={filteredTrainers?.map(trainer => trainer)}
                            optionLabel='fullname'
                            placeholder='Select Trainer'
                            onChange={(e) => {
                                setSelectedTrainer(e.value)
                            }}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Sex</label>
                        <InputText
                            disabled
                            value={selectedTrainer?.sex ? "Male" : "Female"}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Date of birth</label>
                        <InputText
                            disabled
                            value={new Date(selectedTrainer?.dateOfBirth).toLocaleString()}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Nationality</label>
                        <InputText
                            disabled
                            value={selectedTrainer?.nationality}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Phone</label>
                        <InputText
                            disabled
                            value={selectedTrainer?.phone}
                        />
                    </div>

                    <div className='p-field w-[70%] mt-2 flex flex-col'>
                        <label className='font-bold block mb-2' >Zoo trainer Image</label>
                        <Image className='inline w-[30%] min-w-[30%]' src={selectedTrainer?.avatarUrl ? selectedTrainer?.avatarUrl : " "} alt="Image" width="400" preview />
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-12'>
                <Button
                    type="button"
                    label="Back"
                    severity="info"
                    icon="pi pi-eye"
                    raised
                    className='w-28 h-14'
                    onClick={() => navigate('/dashboard/animals')}
                />
                <Button
                    onClick={handleSubmit}
                    label="Assign"
                    icon="pi pi-check"
                    severity="success"
                    className='w-32 h-14'
                    raised
                />
            </div>
        </div>
    );
}

export default AssignAnimal;