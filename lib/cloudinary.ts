import { SignApiOptions, v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

export const signatureParams = ({ paramsToSign }: { paramsToSign: SignApiOptions }) => {
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!secret) {
    throw new Error('CLOUDINARY_API_SECRET is not defined');
  }

  const signature = cloudinary.utils.api_sign_request(paramsToSign, secret);
  return signature;
};

// Upload an image
export const uploadFile = async ({
  file,
  folder,
}: {
  file: string;
  folder: string;
}): Promise<{ public_id: string; url: string } | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(file, {
        folder,
        resource_type: 'auto',
      })
      .then((result) => {
        console.log(result);
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

// Delete an image
export const deleteFIle = async (public_id: string) => {
  console.log(public_id);

  try {
    const data = await cloudinary.uploader.destroy(public_id);
    if (data.result === 'ok') {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);

    return false;
  }
};
