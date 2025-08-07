import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export  const  CreateUserController = async (req, res) => {

    const { username, email, fname, lastname, bdate, password, confirmPassword } = req.body;
    const requiredFields = {username, email, fname, lastname, bdate, password, confirmPassword};

    for (const [key, value] of Object.entries(requiredFields)) {
        if (!value) {
            return res.status(400).json({ error: `${key} is required` });
        }
    };
    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    };
    

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user= new User(username, email, fname, lastname, bdate, hashedPassword);
        const newUser= await user.createUser();

        const { password: _, ...userData } = newUser;
        return res.status(201).json({ success:true, message: "User created Successfully",user: userData });
    }
    catch (error) {
        return res.status(500).json({ error: "Error creating user" });
    }
    
}

