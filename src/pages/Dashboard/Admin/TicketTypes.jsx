import React, { useState } from 'react'
import useSWR from 'swr'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { get } from '../AxiosClient'
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const TicketTypes = () => {

    const [deleteModal, openDeleteModal] = useState(false);

    const labels = {
        title: 'Ticket Type Management',
        subtitle: 'Table of Ticket Type',
        apiPath: '/tickets'
    }

    const imgBody = (item) => {
        return <img className='w-32 h-16 object-contain shadow-2 rounded-md' src={item.imgUrl} alt={item.id} />
    }

    const statusBody = (item) => {
        return <Tag value={item.status ?
            'True' :
            'False'}
            className={`${item.status ? 'bg-green-400' : 'bg-red-500'} p-2 text-[0.9rem]`} />
    }

    const actionBody = (item) => {
        return <div className='space-x-2'>
            <Button icon='pi pi-pencil' className='border-amber-500 text-amber-500' rounded outlined />
            <Button icon='pi pi-trash' className='border-red-500 text-red-500' rounded outlined onClick={() => handleDeleteClick(item)} />
        </div>
    }

    const columns = [
        { field: 'id', header: 'ID' },
        { header: 'Image', body: imgBody },
        { field: 'name', header: 'Name' },
        { field: 'price', header: 'Price' },
        { field: 'type', header: 'Type' },
        { field: 'description', header: 'Description' },
        { header: 'Status', body: statusBody },
        { header: 'Action', body: actionBody }
    ]

    const { data, error, isLoading } = useSWR(labels.apiPath, get)

    console.log(data);

    const handleDeleteClick = (rowData) => {
        openDeleteModal(true)
    }

    return (
        <div className='p-5'>

            <Dialog visible={deleteModal} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" onHide={() => openDeleteModal(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        Are you sure you want to delete this?
                    </span>
                </div>
            </Dialog>

            <div className=''>
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            {data &&
                <div className='mt-5'>
                    <DataTable value={data.data} loading={isLoading} showGridlines>
                        {columns.map((col) => (
                            <Column key={col.field} field={col.field} header={col.header} body={col.body} style={(col.header === 'Description' && { minWidth: '20rem' }) || (col.header === 'Name' && { minWidth: '15rem' })} />
                        ))}
                    </DataTable>
                </div>
            }
        </div>
    )
}

export default TicketTypes