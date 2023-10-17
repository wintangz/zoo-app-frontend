const { BlobServiceClient } = require('@azure/storage-blob');


function generateUniqueImageName(file) {
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
        '?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-11-10T16:33:21Z&st=2023-10-14T08:33:21Z&spr=https&sig=cRXhTN1EcU6SeXjogZZFeFCPGIddykH%2BGDlvvb2afiU%3D';
    const blobService = new BlobServiceClient(`https://${storageAccount}.blob.core.windows.net/?${sasToken}`);
    const containerClient = blobService.getContainerClient(container);
    await containerClient.createIfNotExists({
        access: 'container',
    });
    const uniqueName = generateUniqueImageName(values.imgUrl);
    const blobClient = containerClient.getBlockBlobClient(uniqueName);
    const options = { blobHTTPHeaders: { blobContentType: values.imgUrl.type } };
    await blobClient.uploadBrowserData(values.imgUrl, options);
    const imgUrl = `https://${storageAccount}.blob.core.windows.net/${container}/${uniqueName}`;
    return imgUrl;
}
