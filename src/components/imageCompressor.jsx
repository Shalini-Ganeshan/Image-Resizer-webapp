import React, { useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import imageCompression from "browser-image-compression";
import '../App.css';

const ImageCompressor = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [originalLink, setOriginalLink] = useState("");
    const [compressedLink, setCompressedLink] = useState("");
    const [uploadImage, setUploadImage] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [outputFileName, setOutputFileName] = useState("");
    const [compressing, setCompressing] = useState(false);

    // Handling the image that is uploaded
    const handle = (e) => {
        const imageFile = e.target.files[0];
        setOriginalLink(URL.createObjectURL(imageFile));
        setOriginalImage(imageFile);
        setUploadImage(true);
        alert("Filename: " + imageFile.name + ", Size: " + (imageFile.size / 1024).toFixed(2) + " KB");
    };

    // Method for compressing the image
    const handleClick = (e) => {
        e.preventDefault();
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };
        if (options.maxSizeMB >= originalImage.size / 1024) {
            alert("Image is too small, cannot be compressed");
            return;
        }
        setCompressing(true);
        imageCompression(originalImage, options)
            .then((x) => {
                const downloadLink = URL.createObjectURL(x);
                setCompressedLink(downloadLink);
                setClicked(true);
                setOutputFileName(originalImage.name);
            })
            .catch((error) => {
                console.error("Compression failed:", error);
            })
            .finally(() => {
                setCompressing(false);
            });
    };

    return (
        <div className='full-screen-div' style={{ 
            backgroundImage: `url("https://i.pinimg.com/originals/79/88/48/7988482cd680fe0b6c0740475d39a95f.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            
            minHeight: '100vh', 
        }}>
                <div className='title-font p-2 mb-0 text-center'>
                    <h1>rEaseSize.com</h1>
                </div>
                
              
            <div className='my-custom-font'>
                <div >
                 <h3 className='text-center  mb-3' style={{ textDecoration: 'underline' }}>Three simple steps:</h3>
                 <p className='text-center mb-2'>1. Upload your image</p>
                 <p className='text-center mb-2'>2. Click on Compress</p>
                 <p className='text-center mb-5'>3. Download the image!</p></div>
                 <div className='d-flex flex-column  align-items-center'>
                    <div className='mb-3'>
                        <Card className="shadow" style={{ maxWidth: '350px' , backgroundColor: 'transparent' }}>
                      <Card.Img
                        
                               
                                variant="top"
                                src={originalLink || "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"}
                            ></Card.Img>
                        </Card>
                        <Card.Body>
                            <input
                                type="file"
                                accept="image/*"
                                className='btn btn-primary mt-5'
                                onChange={e => handle(e)}
                            />
                            {uploadImage && compressing && (
                                <div className="d-flex justify-content-center mt-2">
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            )}
                        </Card.Body>
                    </div>
                    <Button variant="warning" className='mb-3' onClick={handleClick} disabled={!uploadImage}>
                        Compress
                    </Button>
                    <div className='mb-3'>
                        <Card className="shadow" style={{ maxWidth: '200px',backgroundColor: 'transparent'  }}>
                            <Card.Img variant="top" src={compressedLink}></Card.Img>
                            </Card>
                            {clicked && (
                                <Card.Body>
                                    <div className='d-flex justify-content-center'>
                                        <a
                                            href={compressedLink}
                                            download={outputFileName}
                                            className="btn btn-success mt-2"
                                        >
                                            Download
                                        </a>
                                    </div>
                                </Card.Body>
                            )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageCompressor;

