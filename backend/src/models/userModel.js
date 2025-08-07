import {pool} from "../config/db.js";

class User{
    constructor(username, email, fname, lastname, bdate, password){
        this.username = username;
        this.email = email;
        this.fname = fname;
        this.lastname = lastname;
        this.bdate = bdate;
        this.password = password;

    }

    async createUser(){
        const query=`INSERT INTO users (username, email, fname, lastname, bdate, password)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

         const values=[this.username, this.email, this.fname, this.lastname, this.bdate, this.password];
         const result= await pool.query(query, values);
         return result.rows[0];
    };
}
export default User;