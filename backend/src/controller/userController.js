import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginUserController = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    try{
        const user = new User(username);
        const foundUser = await user.loginUser();
        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            return res.status(401).json({success:false, error: "Incorrect Password, Please try again! "});
        }
        const token = jwt.sign(
            { id: foundUser.id, username: foundUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ success: true, message: "Login Successful", token });        
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "User can't login!" });
    }

}

