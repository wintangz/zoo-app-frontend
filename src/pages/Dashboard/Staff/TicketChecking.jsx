import { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import { checkTicketByQr } from '~/api/ticketService';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        padding: '8px',
        width: '80%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        margin: '2vh'
    },
    scanner: {
        width: '100%',
        maxWidth: '55vw',
        margin: 'auto',
    },
};


const TicketChecking = () => {
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const handleError = (err) => {
        setError('Error scanning QR code. Please make sure it is valid.');
        console.error(err);
    };

    const handleScan = async (data) => {
        if (data != null) {
            console.log(data);
            setCameraOpen(false);
            // setScannedData(data);

            try {
                const response = await checkTicketByQr(data.text);
                console.log(response);
                setResponse(response)

                if (response.status) {
                    // console.log(response.status);
                    setScannedData('success');
                } else {
                    // console.log(response.serverError);
                    console.log('Invalid status in response');
                    setScannedData(response.serverError);

                }
            } catch (error) {
                console.error('Error checking ticket data:', error);
            }
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleString('en-US', options);
    };
    const labels = {
        title: 'Check Ticket',
        subtitle: 'Check Ticket',
    }

    const handleOpenCamera = () => {
        setCameraOpen(true);
        setScannedData(null);
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' && !isCameraOpen) {
                handleOpenCamera();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, [isCameraOpen]);

    return (
        <div className='w-[80vw]'>
            <div className="p-5">
                <p className='text-3xl font-bold'>{labels.title}</p>
                <p className='text-lg text-yellow-500 font-bold'>{labels.subtitle}</p>
            </div>
            <div style={styles.container} className='flex justify-center items-center '>
                {scannedData === 'success' && (
                    <>
                        <p style={{ color: 'green', fontWeight: 'bold', margin: '2vh' }}>Ticket Checked Successfully!</p>
                        <div className='flex'>
                            <div className='bg-amber-100 rounded-l-lg p-2' >
                                <h1 className='text-lg font-bold'>Ticket</h1>
                                <div className=''>
                                    <h2 className=''>{response.data.ticket.type}</h2>
                                    <span>{response.data.ticket.description}</span>
                                </div>
                                <div style={styles.name}>
                                    <h2>{response.data.order.customer.lastname} {response.data.order.customer.firstname}</h2>
                                </div>
                                <div style={styles.time}>
                                    <h2 className='text-sm'>{formatDate(response.data.order.createdDate)}</h2>
                                </div>
                            </div>
                            <div className='bg-amber-200 p-2 rounded-r-lg'>
                                <div className=''>
                                    <h3 className='font-bold'>Price</h3>
                                    <h3>{response.data.ticket.price} VND</h3>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {scannedData && scannedData !== 'success' && (
                    <p style={{ color: 'red' }}>Error checking ticket. {scannedData && `${scannedData}`}. Please try again. </p>

                )}
                {!isCameraOpen && (
                    <button style={styles.button} onClick={handleOpenCamera}>
                        Let Check
                    </button>
                )}
                {isCameraOpen && (
                    <>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <QrReader
                            id="qr-scanner"
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            style={styles.scanner}
                        />
                    </>
                )}
            </div>
        </div>

    );
}

export default TicketChecking;