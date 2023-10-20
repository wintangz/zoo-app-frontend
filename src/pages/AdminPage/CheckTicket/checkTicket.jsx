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

function TicketScanner() {
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [isCameraOpen, setCameraOpen] = useState(false);

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
                // console.log(response);

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
                    <p style={{ color: 'green' }}>Ticket Checked Successfully!</p>
                    <br />{scannedData.data}
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

export default TicketScanner;
