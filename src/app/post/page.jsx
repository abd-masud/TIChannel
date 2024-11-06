"use client";
import { useState } from 'react';

export default function FileUpload() {
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    for (const [file, value] of formData.entries()) {
      console.log(`${file}: ${value}`);
    }

   

    try {
      const response = await fetch('/api/genres', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      // Set the success/failure message
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
        <input type="text" name="description" placeholder="Enter file name" required />
        <input type="text" name="status" placeholder="Enter file name" required />
        <input type="text" name="featured" placeholder="Enter file name" required />
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
