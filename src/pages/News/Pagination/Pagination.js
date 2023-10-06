import { useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import NewsPost from '../News/newsPost';
import styles from './Pagination.module.scss';

const itemsPerPage = 5;

const Pagination = ({ newsResult }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const data = newsResult ? newsResult.slice().reverse() : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalItems = data ? data.length : 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderPageNumbers = () => {
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, index) => (
                <div className={styles.number_wrap} key={index}>
                    <div className={styles.btnNumber} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </div>
                </div>
            ));
        }

        const visiblePages = [];

        if (currentPage <= maxVisiblePages - 2) {
            // Display first 3 pages
            for (let i = 1; i <= maxVisiblePages - 1; i++) {
                visiblePages.push(
                    <div className={styles.number_wrap} key={i}>
                        <div className={styles.btnNumber} onClick={() => handlePageChange(i)}>
                            {i}
                        </div>
                    </div>
                );
            }
            // Display "..." at the end
            visiblePages.push(<div className={styles.number_wrap} key="ellipsis">...</div>);
        } else {
            // Display current page and next 3 pages
            for (let i = currentPage - 2; i <= currentPage + 2 && i <= totalPages; i++) {
                visiblePages.push(
                    <div className={styles.number_wrap} key={i}>
                        <div className={styles.btnNumber} onClick={() => handlePageChange(i)}>
                            {i}
                        </div>
                    </div>
                );
            }
            // Display "..." at the end
            if (currentPage + 2 < totalPages) {
                visiblePages.push(<div className={styles.number_wrap} key="ellipsis">...</div>);
            }
        }

        return visiblePages;
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.news_wrapper}>
                    {currentItems.map((news) => (
                        <NewsPost post={news} />
                    ))
                    }
                </div>
                <div className={styles.btnwrap}>
                    <div className={styles.btn} onClick={() => handlePageChange(currentPage - 1)}>
                        {currentPage > 1 && <BiLeftArrow />}
                    </div>
                    {renderPageNumbers()}

                    <div className={styles.btn} onClick={() => handlePageChange(currentPage + 1)}>
                        {currentPage == totalPages || <BiRightArrow />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;

