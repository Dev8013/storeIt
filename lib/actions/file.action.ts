'use server'

import { createAdminClient } from "../appwrite"
import { InputFile } from 'node-appwrite/file'
import { appwriteConfig } from "../appwrite/config"
import { ID } from "node-appwrite"
import { constructFileUrl, getFileType } from ".."

interface UploadFileProps {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}

const handleError = (error: unknown, message: string) => {
    console.log(error, message);
    throw error;
}

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
    const { databases, storage } = await createAdminClient();

    try {
        const inputFile = InputFile.fromBuffer(file, file.name);
        const bucketFile = await storage.createFile(appwriteConfig.bucketId, ID.unique(), inputFile);
        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            ownerId: ownerId,
            accountId: accountId,
            users: [],
            bucketFileId: bucketFile.$id
        };
        const newFile = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.filesCollectionId,
            ID.unique(),
            fileDocument
        );
        return newFile;
    } catch (error) {
        handleError(error, "Failed to upload file");
    }
};