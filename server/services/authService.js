const prisma = require("../prismaClient");
const CustomError = require("../utils/customError");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');





const JWT_SECRET = process.env.JWT_SECRET;
function generateToken(userId,role) {
    console.log(JWT_SECRET);
    
    return jwt.sign({ userId,role }, JWT_SECRET, { expiresIn: '365d' });
}

function generatePasswordHash(password){
    return  bcrypt.hash(password, 10);
}


// Register a new user
exports.register = async (userData) => {
    const { email, password, fullName, phone, role } = userData;


    // Validate input
    if (!email || !password || !fullName || !phone || !role) {
        throw new CustomError('All fields are required');
    }


    const [existingUserByEmail, existingUserByPhone] = await Promise.all([
        prisma.user.findFirst({
            where: {
                email: email,
            },
        }),
        prisma.user.findFirst({
            where: {
                phone: phone,
            },
        }),
    ]);

    if (existingUserByEmail || existingUserByPhone) {
        throw new CustomError('User with this email or phone already exists');
    }

    const hashedPassword = await generatePasswordHash(password);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            fullName,
            phone,
            role,
        },
    });

    const token = generateToken(user.id, user.role);

    return token;
};



// Login a user
exports.login = async (loginData) => {
    const { email, password } = loginData;


    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new CustomError('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new CustomError('Invalid credentials');
    }


    const token = generateToken(user.id, user.role);

    return token;
};
