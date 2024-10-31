const express = require('express');
const documentController = require('../controllers/documentController');
const upload = require('../middlewares/multer');
const setUplodType = require('../middlewares/setUploadType');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/vehicle/:vehicleId', documentController.getDocumentByVehicleId);
router.post('/upload',authMiddleware("OWNER"),setUplodType('DOCUMENT'),upload.single('document'), documentController.uploadDocument);

module.exports = router;