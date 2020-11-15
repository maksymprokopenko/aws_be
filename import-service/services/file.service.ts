export const fileService = {
    validateFileName: (fileName: string, validExtension: string): boolean => {
        // validate file format
        const splitName = fileName.split('.');
        const fileExtension = splitName[splitName.length - 1];

        return fileExtension === validExtension;
    },
};
