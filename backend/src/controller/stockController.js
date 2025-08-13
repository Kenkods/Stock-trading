import Stock from "../models/stocks.js";

export const createStockController = async (req, res) => {

    const {symbol, name ,current_price, available_quantity, shares_outstanding} = req.body;
    const requiredFields = {symbol, name, current_price, available_quantity, shares_outstanding};



    const validations = [
    {
        valid: typeof symbol === "string" && symbol.trim().length > 0,
        message: "symbol is required and must be a non-empty string"
    },
    {
        valid: typeof name === "string" && name.trim().length > 0,
        message: "name is required and must be a non-empty string"
    },
    {
        valid: typeof current_price === "number" && current_price > 0,
        message: "current_price is required and must be a positive number"
    },
    {
        valid: Number.isInteger(available_quantity) && available_quantity >= 0,
        message: "available_quantity is required and must be a non-negative integer"
    },
    {
        valid: Number.isInteger(shares_outstanding) && shares_outstanding > 0,
        message: "shares_outstanding is required and must be a positive integer"
    }
];

for (const { valid, message } of validations) {
    if (!valid) {
        return res.status(400).json({ error: message });
    }
}


    try {
        const stock = new Stock(symbol, name, current_price, available_quantity, shares_outstanding);
        const newStock = await stock.createStock();
        return res.status(201).json({ success: true, message: "Stock created successfully", stock: newStock });
    } catch (error) {
        console.error("Error creating stock:", error);
        return res.status(500).json({ error: "Error creating stock" });
    }
}

