import React, { useState } from 'react';
import Webcam from 'react-webcam';

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export default function WebcamCapture({ setWebcam }) {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
    }, [webcamRef]);

    let videoConstraints = {
        facingMode: facingMode,
        width: 270,
        height: 270,
    };

    const handleClick = React.useCallback(() => {
        setFacingMode((prevState) => (prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER));
    }, []);

    const handleCaptureClick = () => {
        // Call the capture function to take a photo
        capture();
    };

    const handleSaveImage = () => {
        if (image) {
            // Convert the base64 image data to a Blob
            const byteCharacters = atob(image.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // Create a File object from the Blob (optional)
            const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });

            // Set the captured image in state
            setCapturedImage(file);
            const fileObject = {
                imgUrl: file
            }
            setWebcam(fileObject);
        }
    };

    const handleRetakePhoto = () => {
        // Clear the captured image
        setImage(null);
        setCapturedImage(null);
    };

    return (
        <>
            <div className="webcam-container" style={{
                left: '40%',
                position: 'absolute',
                top: '20%'
            }}  >
                <div className="webcam-img">
                    {image ? (
                        <img src={image} alt="Captured" />
                    ) : (
                        <Webcam
                            className="webcam"
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            screenshotQuality={1}
                        />
                    )}
                </div>
                <button onClick={handleClick}>Switch camera</button>
                <button onClick={handleCaptureClick} disabled={image !== null}>
                    Capture Photo
                </button>
                <button onClick={handleSaveImage} >
                    Save Image
                </button>
                {image && (
                    <button onClick={handleRetakePhoto}>Retake Photo</button>
                )}
                {capturedImage && (
                    <>
                        <div style={{ position: "absolute", top: "0", left: "115%" }}>
                            <img src={URL.createObjectURL(capturedImage)} alt="Captured" />
                        </div>
                    </>
                )}
            </div>

        </>
    );
}
