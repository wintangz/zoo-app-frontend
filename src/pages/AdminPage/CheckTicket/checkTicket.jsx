import { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';

// Define your styles using regular CSS or a CSS-in-JS solution
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        height: '100vh',
        padding: '8px', // Add any padding you need
    },
    button: {
        backgroundColor: '#4caf50', // Replace with your preferred color
        color: '#fff', // Replace with your preferred text color
        marginBottom: '8px', // Adjust the margin as needed
        padding: '8px 16px', // Adjust the padding as needed
        cursor: 'pointer', // Add a cursor on hover
        border: 'none', // Remove default button border
        borderRadius: '4px', // Add border-radius if needed
    },
    scanner: {
        width: '100%',
        maxWidth: '45vw',
        margin: 'auto',
    },
};

function TicketScanner() {
    const [error, setError] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const [continueScanning, setContinueScanning] = useState(true);

    const handleError = (err) => {
        setError('Error scanning QR code. Please make sure it is valid.');
        console.error(err);
    };

    const handleScan = (data) => {
        if (data != null) {
            console.log(data);
            setContinueScanning(false);

            // setScannedData(data);
        }
    };

    const handleOpenCamera = () => {
        setCameraOpen(true);
        setContinueScanning(true);
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
            {/* {scannedData !== null && (
                <p>Scanned Data: {scannedData}</p>
            )} */}
        </div>
    );
}

export default TicketScanner;

