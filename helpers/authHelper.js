import bcrypt from 'bcrypt'


const hashPassword = async (password) =>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

const comparePassword = async (hashedPassword, pass) =>{
    return await bcrypt.compare(pass, hashedPassword);
}


export {hashPassword, comparePassword}