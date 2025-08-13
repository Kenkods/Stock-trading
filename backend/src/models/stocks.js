import pool from "../config/db.js";

class Stock {

    constructor(symbol, name, currentPrice, available_quantity, shares_outstanding) {
        this.symbol = symbol;
        this.name = name;
        this.currentPrice = currentPrice;
        this.available_quantity = available_quantity;
        this.shares_outstanding = shares_outstanding;
    }

    async createStock() {
        const query = `INSERT INTO stocks (symbol, name, current_price, available_quantity, shares_outstanding)
         VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

        const values = [this.symbol, this.name, this.currentPrice, this.available_quantity, this.shares_outstanding];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async showAllStocks() {
        const query = `SELECT  symbol, name, current_price, high_price, low_price, market_cap, volume  FROM stocks;`;
        const result = await pool.query(query);
        return result.rows;
    }
}
export default Stock;
 