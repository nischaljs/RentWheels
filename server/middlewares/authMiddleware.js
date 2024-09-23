const jwt = require('jsonwebtoken');

const authMiddleware = (role) =>{
    return async (req, res, next) => {
        const authHeader = req.header('Authorization');
    
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access Denied: No token provided or wrong format',
            });
        }
    
    
        const token = authHeader.split(' ')[1];
    
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
           
            req.user = decoded;

            if(role && req.user.role !== role){
                return res.status(403).json({
                    success: false,
                    message: 'Access Denied: Invalid role',
                });
            }
            
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Access Denied: Invalid token',
            });
        }
    };
}

module.exports = authMiddleware;
