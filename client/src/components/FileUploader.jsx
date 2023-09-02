import { useState } from 'react';
import axios from "axios";

function FileUploader({ link, setLink }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                // Assuming the server responds with a link
                setLink(response.resumeLink);
                setError('');
            })
            .catch((error) => {
                setError(error);
                console.error('File upload error:', error);
            });
    };

    return (
        <div>
            <h2>File Upload</h2>
            <div className='flex gap-5 items-center'>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button className='primary' onClick={handleUpload}>Upload</button>
            </div>

            {link && <p>Uploaded File Link: {link}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default FileUploader;
