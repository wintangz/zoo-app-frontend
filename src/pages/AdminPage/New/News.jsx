import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as newsService from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';

export default function NewsDataTable() {
    const [news, setNews] = useState(null);

    const navigate = useNavigate();

    const fetchNews = async () => {
        const result = await newsService.getNews();
        setNews(result);
    };
    useEffect(() => {
        fetchNews();
    }, []);
    const handleRowDoubleClick = (params) => {
        const selectedNews = params.data;
        const homeNewsId = selectedNews.id;
        navigate(`/home/news/${homeNewsId}`);
    };

    const imgUrl = (rowData) => {
        return <img src={rowData.imgUrl} alt={rowData.title} width="100" />;
    };
    const thumbnailUrl = (rowData) => {
        return <div><img src={rowData.thumbnailUrl} alt={rowData.title} width="100" /></div>;
    };
    const createdDate = (rowData) => {
        return <span>{new Date(rowData.createdDate).toLocaleString()}</span>;
    };

    const status = (rowData) => {
        return <Tag value={rowData.status ? 'True' : 'False'} />;
    };

    const columns = [
        { field: 'id', header: 'ID' },
        { field: 'title', header: 'Title' },
        { field: 'shortDescription', header: 'Short Description' },
        { field: 'content', header: 'Content' },
        { header: 'ImgUrl', body: imgUrl },
        { header: 'ThumbnailUrl', body: thumbnailUrl },
        { field: 'type', header: 'Type' },
        { field: 'createdDate', header: 'Created Date', body: createdDate },
        { field: 'status', header: 'Status', body: status },
    ];
    return (
        <div m="20px">
            <AdminHeader m="20px" title="View News" subtitle="Table of News" />
            {news && (
                <DataTable value={news} paginator rows={10} dataKey="id" emptyMessage="No news found." onRowDoubleClick={handleRowDoubleClick}>
                    {columns.map((col, index) => (
                        <Column
                            key={index}
                            field={col.field}
                            header={col.header}
                            body={col.body}
                        />
                    ))}
                </DataTable>
            )}
        </div>
    );
}
