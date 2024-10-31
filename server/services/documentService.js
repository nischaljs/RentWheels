const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getDocumentById = async (id) => {
    console.log('Getting document with id:', id);
    return await prisma.document.findMany({
        where: { vehicleId: parseInt(id) },
    });
};

const createDocument = async (imagePath, vehicleId, documentType) => {
    console.log('Creating document with imagePath  :', imagePath, vehicleId, documentType);
    return await prisma.document.create({
        data: {
            fileUrl:imagePath,
            type: documentType,
            vehicle: {
                connect: { id: parseInt(vehicleId, 10) } // Connects the document to an existing vehicle by its ID
              }
        }
    });
};

module.exports = {
    getDocumentById,
    createDocument,
};