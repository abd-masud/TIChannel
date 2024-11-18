"use client";
import { useState } from 'react';

export default function FileUpload() {
    const [message, setMessage] = useState('');

    const handleFileUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Log each entry in formData to see what's being sent
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                console.log(`${key}: File { name: "${value.name}", size: ${value.size}, type: "${value.type}" }`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        try {
            const response = await fetch('/api/genres', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                setMessage(`Success: ${result.message} - File uploaded as ${result.filename}`);
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage('An error occurred while uploading the file');
        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <input type="file" name="file" required />
                <input type="text" name="name" placeholder="Enter file name" required />
                <input type="text" name="description" placeholder="Enter description" required />
                <input type="text" name="status" placeholder="Enter status" required />
                <input type="text" name="featured" placeholder="Enter featured status" required />
                <button type="submit">Upload</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
