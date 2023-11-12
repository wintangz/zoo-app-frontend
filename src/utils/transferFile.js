const { BlobServiceClient } = require('@azure/storage-blob');


function generateUniqueImageName(file) {
    console.log(file);
    const timestamp = Date.now(); // Get the current timestamp
    const randomChars = Math.random().toString(36).substring(2, 8); // Generate random characters

    const fileExtension = file.name.split('.').pop(); // Get the file extension

    const uniqueName = `${timestamp}-${randomChars}.${fileExtension}`; // Combine timestamp, random chars, and file extension

    return uniqueName;
}

// ---------------------------------- Handle submit and Upload img to azure account --------------------------------   /
export default async function uploadFile(values, container) {
    let storageAccount = 'zoowebstorage';
    let sasToken =
        '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-12-31T17:05:54Z&st=2023-11-11T09:05:54Z&spr=https&sig=27%2Bkw51hd8PPiOeHkhHovxQtITInqNC7ymo2IZeY1X4%3D';
    const blobService = new BlobServiceClient(`https://${storageAccount}.blob.core.windows.net/?${sasToken}`);
    const containerClient = blobService.getContainerClient(container);
    await containerClient.createIfNotExists({
        access: 'container',
    });
    const uniqueName = generateUniqueImageName(values);
    const blobClient = containerClient.getBlockBlobClient(uniqueName);
    const options = { blobHTTPHeaders: { blobContentType: values.type } };
    await blobClient.uploadBrowserData(values, options);
    const imgUrl = `https://${storageAccount}.blob.core.windows.net/${container}/${uniqueName}`;
    return imgUrl;
}


async function imageUrlToFile(imageUrl, fileName = 'image.jpg') {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });

    return file;
}
export async function urlToFile(imageUrl, fileName) {
    imageUrlToFile(imageUrl, fileName)
        .then((file) => {
            console.log('File created:', file.name);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

