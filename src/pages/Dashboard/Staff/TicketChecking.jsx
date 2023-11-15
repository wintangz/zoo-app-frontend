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
        width: '100%',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
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
    cardWrap: {
        width: '27em',
        margin: '3em auto',
        color: '#fff',
        fontFamily: 'sans-serif',
    },
    card: {
        background: 'linear-gradient(to bottom, #e84c3d 0%, #e84c3d 26%, #ecedef 26%, #ecedef 100%)',
        height: '11em',
        float: 'left',
        position: 'relative',
        padding: '1em',
        marginTop: '100px',
    },
    cardLeft: {
        borderTopLeftRadius: '8px',
        borderBottomLeftRadius: '8px',
        width: '16em',
    },
    cardRight: {
        width: '6.5em',
        borderLeft: '0.18em dashed #fff',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            width: '0.9em',
            height: '0.9em',
            background: '#fff',
            borderRadius: '50%',
            left: '-0.5em',
        },
        '&:before': {
            top: '-0.4em',
        },
        '&:after': {
            bottom: '-0.4em',
        },
    },
    h1: {
        fontSize: '1.1em',
        marginTop: '0',
        span: {
            fontWeight: 'normal',
        },
    },
    title: {
        textTransform: 'uppercase',
        fontWeight: 'normal',
        h2: {
            fontSize: '0.9em',
            color: '#525252',
            margin: '0',
        },
        span: {
            fontSize: '0.7em',
            color: '#a2aeae',
        },
    },
    name: {
        margin: '0.7em 0 0 0',
    },
    time: {
        margin: '0.7em 0 0 1em',
    },
    seat: {
        margin: '0.7em 0 0 0',
    },
    eye: {
        position: 'relative',
        width: '2em',
        height: '1.5em',
        background: '#fff',
        margin: '0 auto',
        borderRadius: '1em/0.6em',
        zIndex: '1',
        '&:before, &:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            borderRadius: '50%',
        },
        '&:before': {
            width: '1em',
            height: '1em',
            background: '#e84c3d',
            zIndex: '2',
            left: '8px',
            top: '4px',
        },
        '&:after': {
            width: '0.5em',
            height: '0.5em',
            background: '#fff',
            zIndex: '3',
            left: '12px',
            top: '8px',
        },
    },
    number: {
        textAlign: 'center',
        textTransform: 'uppercase',
        h3: {
            color: '#e84c3d',
            margin: '0.9em 0 0 0',
            fontSize: '2.5em',
        },
        span: {
            display: 'block',
            color: '#a2aeae',
        },
    },
    barcode: {
        height: '2em',
        width: '0',
        margin: '1.2em 0 0 0.8em',
        boxShadow: '1px 0 0 1px #343434, 5px 0 0 1px #343434, 10px 0 0 1px #343434, 11px 0 0 1px #343434, 15px 0 0 1px #343434, 18px 0 0 1px #343434, 22px 0 0 1px #343434, 23px 0 0 1px #343434, 26px 0 0 1px #343434, 30px 0 0 1px #343434, 35px 0 0 1px #343434, 37px 0 0 1px #343434, 41px 0 0 1px #343434, 44px 0 0 1px #343434, 47px 0 0 1px #343434, 51px 0 0 1px #343434, 56px 0 0 1px #343434, 59px 0 0 1px #343434, 64px 0 0 1px #343434, 68px 0 0 1px #343434, 72px 0 0 1px #343434, 74px 0 0 1px #343434, 77px 0 0 1px #343434, 81px 0 0 1px #343434;',
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
        <div style={styles.container} className='p-5 flex justify-center items-center'>
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
                    {/* <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                    </table> */}
                    <div style={styles.cardWrap}>
                        <div style={{ ...styles.card, ...styles.cardLeft }}>
                            <h1>SaiGonZoo <span>Ticket</span></h1>
                            <div style={styles.title}>
                                <h2>{response.data.ticket.name}</h2>
                                <span>{response.data.ticket.description}</span>
                            </div>
                            <div style={styles.name}>
                                <h2>{response.data.order.customer.lastname} {response.data.order.customer.firstname}</h2>
                                <span>name</span>
                            </div>
                            <div style={styles.time}>
                                <h2>{response.data.order.createdDate}</h2>
                                <span>time</span>
                            </div>

                        </div>
                        <div style={{ ...styles.card, ...styles.cardRight }}>
                            <div style={styles.eye}></div>
                            <div style={styles.number}>
                                <h3>{response.data.ticket.price}</h3>
                                <span>price</span>
                            </div>
                            {/* <div class="barcode"></div> */}
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
    );
}

export default TicketChecking;