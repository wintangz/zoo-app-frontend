import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsById } from '~/api/newsService';
import AdminHeader from '~/component/Layout/components/AdminHeader/AdminHeader';

function stripHtmlTags(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

function SingleNewsView() {
    const { homeNewsId } = useParams();
    const navigate = useNavigate();
    const [selectedNews, setSelectedNews] = useState(null);

    const fetchData = async () => {
        try {
            const data = await getNewsById(homeNewsId);
            setSelectedNews(data);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [homeNewsId]);

    if (!selectedNews) {
        return <div>Loading...</div>;
    }

    const originalDateStr = selectedNews.createdDate;
    const dateObj = new Date(originalDateStr);
    const formattedDateStr = dateObj.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const sentences = selectedNews.content.split('. ');
    const paragraphs = sentences.map((sentence, index) => (
        stripHtmlTags(sentence + (index < sentences.length - 1 ? '.' : ''))
    ));

    return (
        <Box m="20px">
            <AdminHeader title="News Details" subtitle="View of each news" />


            {/* <Box    >
                <img src={selectedNews.thumbnailUrl} alt="Thumbnail" />
                <Typography variant="h5">{selectedNews.shortDescription}</Typography>
                <img src={selectedNews.imgUrl} alt="Image" />
            </Box> */}

            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '5vh 0',
                }}
            >
                <img src={selectedNews.thumbnailUrl} style={{ height: 'auto', width: '80%' }} alt="Thumbnail" />
            </Box>

            <Box style={{ marginTop: '10vh' }}>
                <Typography variant="h4" style={{ marginBottom: '20px', fontSize: '2.5rem', lineHeight: '1.2', fontWeight: 'bold' }}>
                    {selectedNews.title}
                </Typography>
            </Box>

            <Box style={{ padding: '0 2vh', fontSize: '1.5rem', lineHeight: '1.33', color: '#595959', borderColor: 'rgb(250, 144, 0)', borderLeftWidth: '6px', borderLeftStyle: 'solid', borderRight: 'none', marginBottom: '5vh' }}>
                <Typography component="p">
                    <i>{selectedNews.shortDescription}</i>
                </Typography>
            </Box>
            <Box
                style={{
                    display: 'flex',
                    justifycontent: 'center',
                    marginbottom: '20px',
                }}
            >
                <img src={selectedNews.imgUrl} style={{ height: 'auto', width: '100%' }} alt="Img" />
            </Box>
            <Box
                style={{
                    margin: '5vh 8vh 0 8vh',
                    bordertop: '2px solid orange',
                    borderbottom: '2px solid orange',
                    padding: '5vh 0',
                }}>
                {paragraphs.map((paragraph, index) => (
                    <Typography key={index} variant="body1" style={{ fontSize: '1.3rem', lineHeight: '1.4', marginBottom: '1.3em' }}>
                        {paragraph}
                    </Typography>
                ))}
            </Box>
            <Box>
                <Typography variant="subtitle2" style={{ color: 'rgb(250, 144, 0)' }}>Date of Published: {formattedDateStr}</Typography>
                <Typography style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                    {selectedNews.authorLastname + " " + selectedNews.authorFirstname}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="30px">
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('/home/news')}
                >
                    VIEW NEWS
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate(`/home/news/update/${homeNewsId}`)}
                >
                    UPDATE NEWS
                </Button>
            </Box>
        </Box >

    );
}

export default SingleNewsView;
