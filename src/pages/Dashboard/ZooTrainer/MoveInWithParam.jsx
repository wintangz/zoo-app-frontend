import moment from 'moment/moment';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getAnimalsById, moveInEnclosure } from '~/api/animalsService';
import { get } from '../AxiosClient';
function MoveInAnimalsWithParams() {
    const [selectedCage, setSelectedCage] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate()
    const [animals, setAnimals] = useState(null);
    const labels = {
        title: 'Animal Management',
        subtitle: 'Move In Animal To Cage',
        apiPath: '/enclosures'
    }

    const { id } = useParams()
    useEffect(() => {
        const res = getAnimalsById(id);
        console.log(res)
        res.then(result => {
            setAnimals(result.data)
        })
    }, [])
    const [dialogVisible, setDialogVisible] = useState(false);
    const { data, mutate, isLoading } = useSWR(labels.apiPath, get)
    data && console.log(data.data)
    console.log(selectedCage)
    const handleSubmit = () => {
        console.log(selectedCage);
        const res = moveInEnclosure(id, selectedCage.id)
        res.then(result => {
            console.log(result)
            if (result.status === 200) {
                setDialogVisible(true);
            } else {
                toast.current.show({ severity: 'error', summary: 'Error', detail: result.data.serverError, life: 3000 })
            }
        })
    }
    const handleClose = () => {
        setDialogVisible(false);
        navigate('/dashboard/animals')
    }
    return (
        <>
            <div className="p-5 w-[80vw]">
                <Dialog
                    header="Move in successfully"
                    visible={dialogVisible}
                    style={{ width: '400px' }}
                    onHide={handleClose}
                >
                    <p>Move in animal to cage success</p>
                    <Button
                        className='mt-6 float-right'
                        label='Close'
                        icon='pi pi-times'
                        onClick={handleClose}
                    />
                </Dialog>
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
                                value={animals?.name}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Date of birth</label>
                            <InputText
                                disabled
                                value={moment(animals?.dateOfBirth).format("YYYY/MM/DD hh:mm:ss")}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Species</label>
                            <InputText
                                disabled
                                value={animals?.species.name}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Origin</label>
                            <InputText
                                disabled
                                value={animals?.origin}
                            />
                        </div>
                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Animal Image</label>
                            <Image className='inline w-[30%]' src={animals?.imgUrl} alt="Image" width="400" preview />
                        </div>
                    </div>


                    <div className='w-[100%]'>
                        <div className='p-field w-[70%] mt-4 flex flex-col'>
                            <label className='font-bold block mb-2' >Enclosure Name</label>
                            <Dropdown
                                value={selectedCage}
                                options={data?.data.filter(cage => cage.status === true)}
                                optionLabel='name'
                                placeholder='Select Cage'
                                filter
                                onChange={(e) => {
                                    setSelectedCage(e.value)
                                }}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Enclosure Info</label>
                            <InputText
                                value={selectedCage && selectedCage.info}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Capacity</label>
                            <InputText
                                value={selectedCage && selectedCage.maxCapacity}
                            />
                        </div>

                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Habitat</label>
                            <InputText
                                value={selectedCage && selectedCage.habitat.name}
                            />
                        </div>



                        <div className='p-field w-[70%] mt-2 flex flex-col'>
                            <label className='font-bold block mb-2' >Enclosure Image</label>
                            <Image className='inline w-[30%]' src={selectedCage && selectedCage.imgUrl} alt="Image" height='300' width="400" preview />
                        </div>
                    </div>
                </div>
                <Button severity='success' className='mt-4' label='Add To Cage' type='button' onClick={handleSubmit} />
            </div>
        </>
    );
}

export default MoveInAnimalsWithParams;