import React from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'

const Users = () => {

    const labels = {
        title: 'User Management',
        subtitle: 'Table of Users',
        apiPath: '/users'
    }

    const avatarBody = (item) => {
        return <img className='w-16 h-16 object-contain shadow-2 rounded-md' src={item.avatarUrl} alt={item.id} />
    }

    const sexBody = (item) => {
        return <Tag value={item.sex ?
            <div className='flex items-center'><BsGenderMale className='mr-1' />Male</div> :
            <div className='flex items-center'><BsGenderFemale className='mr-1' />Female</div>}
            className={`{${item.sex ? 'bg-blue-400' : 'bg-pink-300'}} p-2 text-[0.9rem]`} />
    }

    const statusBody = (item) => {
        return <Tag value={item.sex ?
            'True' :
            'False'}
            className={`${item.sex ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const dateOfBirthBody = (item) => {
        return <span>{new Date(item.dateOfBirth).toLocaleString()}</span>
    }

    const columns = [
        { field: 'id', header: 'ID' },
        { header: 'Avatar', body: avatarBody },
        { field: 'username', header: 'Username' },
        { field: 'firstname', header: 'First Name' },
        { field: 'lastname', header: 'Last Name' },
        { header: 'Sex', body: sexBody },
        { header: 'Date of Birth', body: dateOfBirthBody },
        { field: 'email', header: 'Email' },
        { field: 'phone', header: 'Phone' },
        { field: 'address', header: 'Address' },
        { field: 'nationality', header: 'Nationality' },
        { header: 'Status', body: statusBody },
    ]

    const { data, error, isLoading } = useSWR(labels.apiPath, get)

    console.log(data);

    return (
        <div className='p-5'>
            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable value={data.data} loading={isLoading} showGridlines>
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default Users