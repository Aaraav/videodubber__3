"use client";

import React, { useState, useContext } from 'react';
import { FileButton, Button, Group, Text, Loader } from '@mantine/core';
import { FileContext } from '../../context/fileContext'; // Adjust the import path
import { useRouter } from 'next/navigation';

function File() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading
  const { setFileURL,fileURL } = useContext(FileContext);
  const router = useRouter();

  const handleFileChange = async (newFile) => {
    if (newFile) {
      setFile(newFile);
      setLoading(true); // Set loading to true when a file is selected

      const formData = new FormData();
      formData.append('file', newFile);
      formData.append('upload_preset', 'videodubber_3'); // Unsigned preset name from Cloudinary

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Error:', data);
          alert(`Upload failed: ${data.error.message}`);
        } else {
          setFileURL(data.secure_url); // Store the Cloudinary URL in context
          router.push('/cutter'); // Redirect to the next page
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setLoading(false); // Reset loading state after the request completes
      }
    }
  };

  return (
    <>
      <Group justify="center">
        <FileButton
          onChange={handleFileChange}
          accept="audio/mpeg,audio/wav,audio/mp3,audio/ogg,audio/mp4"
          variant="outline"
          color="#665DC3"
          size="compact-xl"
          radius="xl"
        >
          {(props) => <Button {...props}>Upload audio</Button>}
        </FileButton>
      </Group>

      {loading && ( // Show loader while loading
        <Group position="center" mt="md">
          <Loader />
        </Group>
      )}

      {file && !loading && ( // Display file info only when not loading
        <>
          <Text size="sm" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
          <Text>{fileURL}</Text>
        </>
      )}
    </>
  );
}

export default File;
