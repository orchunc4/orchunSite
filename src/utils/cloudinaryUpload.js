// Cloudinary client-side upload utility
// Upload files directly to Cloudinary without going through the backend

const CLOUD_NAME = 'djgztdy48';
const UPLOAD_PRESET = 'myUpps';

/**
 * Upload a file directly to Cloudinary from the browser
 * @param {File} file - The file to upload
 * @param {string} resourceType - 'image' or 'raw' (for 3D models)
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadToCloudinary = async (file, resourceType = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'portfolio_uploads');

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
        {
            method: 'POST',
            body: formData
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return {
        url: data.secure_url,
        publicId: data.public_id
    };
};

export default uploadToCloudinary;
