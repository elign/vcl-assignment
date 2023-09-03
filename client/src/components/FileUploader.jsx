import { useState } from 'react';
import axios from "axios";

function FileUploader({ link, setLink }) {
    const [error, setError] = useState('');

    const handleUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append('filename', file);
        axios
            .post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                // Assuming the server responds with a link
                console.log(response);
                setLink(response.data.resumeLink);
            })
            .catch((error) => {
                setError(error);
                console.error('File upload error:', error);
            });
    };

    return (
        <div>
            <h2>Upload Updated Resume</h2>
            <div className='flex gap-10 items-center justify-between'>
                <input name="filename" type="file" accept=".pdf" onChange={handleUpload} />
            </div>
            {error && <p style={{ color: 'red' }}>Error Occurred while uploading file!</p>}
        </div>
    );
}

export default FileUploader;
