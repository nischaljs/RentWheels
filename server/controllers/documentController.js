const documentService = require('../services/documentService');


const getDocumentByVehicleId = async (req, res) => {
    try {
        const document = await documentService.getDocumentById(req.params.vehicleId);
        if (!document) {
            return res.status(404).json({ success:false, message: 'Document not found' });
        }
        res.status(200).json({ success:true, data: document });
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};

const uploadDocument = async (req, res) => {
    console.log('Incoming file:', req.file);
    try {
        const imagePath = req.file ? req.file.path.replace(/^public/, '') : null;
        const {vehicleId, documentType} = req.body;
        const newDocument = await documentService.createDocument(imagePath, vehicleId, documentType);
        res.status(201).json({success:true, data: newDocument});    
    } catch (error) {
        res.status(500).json({ success:false, message: error.message });
    }
};

module.exports = {
    getDocumentByVehicleId,
    uploadDocument
};