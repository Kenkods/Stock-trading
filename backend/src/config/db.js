import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
    host:process.env.PGHOST,
    user:process.env.PGUSER,
    port: Number(process.env.PGPORT),
    password:process.env.PGPASSWORD,
    database:process.env.PGDATABASE,

});


export default pool;