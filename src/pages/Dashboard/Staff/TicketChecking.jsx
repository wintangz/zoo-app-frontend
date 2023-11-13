import { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import { checkTicketByQr } from '~/api/ticketService';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '8px',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        // marginBottom: '8px',
        padding: '8px 16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
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
        <div style={styles.container}>
            {scannedData === 'success' && (
                <>
                    {/* <p style={{ color: 'green' }}>Ticket Checked Successfully!</p>
                    {response.data.ticket.name}
                    {response.data.ticket.description}
                    {response.data.ticket.price}
                    {response.data.order.customer.lastname}
                    {response.data.order.customer.firstname}
                    {response.data.order.createdDate} */}

                    <p style={{ color: 'green' }}>Ticket Checked Successfully!</p>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Ticket Name</th>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Ticket Description</th>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Ticket Price</th>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Customer Last Name</th>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Customer First Name</th>
                                <th style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>Order Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.ticket.name}</td>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.ticket.description}</td>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.ticket.price}</td>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.order.customer.lastname}</td>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.order.customer.firstname}</td>
                                <td style={{ border: '1px solid black', padding: '15px', textAlign: 'left' }}>{response.data.order.createdDate}</td>
                            </tr>
                        </tbody>
                    </table>


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
    );
}

export default TicketChecking;
