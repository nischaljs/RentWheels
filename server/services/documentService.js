const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getDocumentById = async (id) => {
    
    return await prisma.document.findMany({
        where: { vehicleId: parseInt(id) },
    });
};

const createDocument = async (imagePath, vehicleId, documentType) => {
    
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