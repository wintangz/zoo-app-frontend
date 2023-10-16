// ParentComponent.js

import { useState } from 'react';
import ViewEachNews from './viewNews';

const ParentComponent = () => {
    const [news, setNews] = useState();

    // const updateNews = (id, updatedData) => {
    //     setNews((prevNews) => {
    //         const updatedNews = prevNews.map((item) =>
    //             item.id === id ? { ...item, ...updatedData } : item
    //         );
    //         return updatedNews;
    //     });
    // };

    return (
        <div>
            <ViewEachNews news={news} />
        </div>
    );
};

export default ParentComponent;
