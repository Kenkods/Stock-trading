import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {     

    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer")){
        return res.status(401).json({ error: " access Denied!" });
    }

    const authHeader=token.split(" ")[1];
    
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ error: "Invalid token" });
    }

}