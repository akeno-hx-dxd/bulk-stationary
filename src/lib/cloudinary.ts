import { v2 as cloudinary } from 'cloudinary';
import "dotenv/config";

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper function to extract public ID from a Cloudinary URL (handles folders, transformations, versions)
 * @param {string} secureUrl - The secure URL of the image
 * @returns {string} - The public ID of the image
 */
const extractPublicId = (secureUrl: string): string => {
  // Regex to match Cloudinary URLs and extract the public ID (including folder paths)
  const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
  const match = secureUrl.match(regex);

  if (match && match[1]) {
    return match[1]; // The public ID including folder structure
  } else {
    console.error(`Unable to extract public ID from URL: ${secureUrl}`);
    return ''; // Return an empty string if unable to extract
  }
};

/**
 * Function to delete an image by its public ID
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<void>}
 */
const deleteImageByPublicId = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted image with public ID ${publicId}:`, result);
  } catch (error) {
    console.error(`Error deleting image with public ID ${publicId}:`, error);
  }
};

/**
 * Function to delete images from Cloudinary by secure URLs
 * @param {string[]} secureUrls - Array of secure URLs of images to delete
 * @returns {Promise<void>} - A promise that resolves when all images are deleted
 */
export const deleteImagesFromCloudinary = async (secureUrls: string[]): Promise<void> => {
  try {
    // Extract public IDs from the URLs
    const publicIds = secureUrls.map(extractPublicId).filter(id => id !== '');

    // Delete images for each public ID
    for (const publicId of publicIds) {
      await deleteImageByPublicId(publicId);
    }
  } catch (error) {
    console.error('Error deleting images:', error);
  }
};

/**
 * Function to compare two arrays of secure URLs and delete images that are not common between them
 * @param {string[]} oldArray - The old array of secure URLs
 * @param {string[]} newArray - The new array of secure URLs
 * @returns {Promise<void>} - A promise that resolves when the images are deleted
 */
export const compareAndDeleteImages = async (oldArray: string[], newArray: string[]): Promise<void> => {
    try {
      // Extract public IDs from both arrays
      const oldPublicIds = oldArray.map(extractPublicId).filter(id => id !== '');
      const newPublicIds = newArray.map(extractPublicId).filter(id => id !== '');
  
      // Find public IDs in oldArray that are not in newArray (to delete)
      const toDelete = oldPublicIds.filter(publicId => !newPublicIds.includes(publicId));
  
      // Delete images that are in oldArray but not in newArray
      for (const publicId of toDelete) {
        try {
          await deleteImageByPublicId(publicId);  // Delete image
          console.log(`Deleted image with public ID: ${publicId}`);
        } catch (error) {
          console.error(`Failed to delete image with public ID: ${publicId}`, error);
        }
      }
    } catch (error) {
      console.error('Error comparing and deleting images:', error);
    }
};
  
