const asyncHandler = require('express-async-handler');
const sql = require("mssql/msnodesqlv8");
const jwt = require('jsonwebtoken');
const { errorHandler } = require("../middleware/errorMiddleware.js");
const dotenv = require('dotenv').config();
const responses = require('../responses');

const {
    MSSQL_DATABASE_NAME,
    MSSQL_SERVER_NAME,
    MSSQL_DRIVER,
    TOKEN_KEY,
    SALT
} = process.env;

const config = {
    database: MSSQL_DATABASE_NAME,
    server: MSSQL_SERVER_NAME,
    driver: MSSQL_DRIVER,
    options: {
        trustedConnection: true
    }
};
const createPerson = asyncHandler(async (req, res) => {
    const token = req.headers['r-a-token'];
    let userId = null, isValid = false;
    console.log(token);
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token is invalid" });
            console.log(err);
            return;
        }
        if (Date.now() / 1000 > decoded.exp) {
            res.status(401).json({ message: "Token is expired" });
            return;
        }
        if (decoded.role != 'admin') {
            res.status(403).json({ message: "access denied" });
            return;
        }
        userId = decoded.userId;
        isValid = true;
    });
    if (!isValid) return;
    sql.connect(config, (error) => {
        if (error) {
            errorHandler(error, req, res, "");
            return;
        }
        const request = new sql.Request();
        const { name, surname, bank } = req.body;

        request.input('emri', sql.VarChar, name);
        request.input('mbiemri', sql.VarChar, surname);
        request.input('banka', sql.Int, bank);
        const QUERY = `INSERT INTO Personi(Emri57292, Mbiemri57292, BankaId57292) VALUES (@emri, @mbiemri, @banka);`;
        request.query(QUERY, (err, result) => {
            if (err) {
                res.status(500).json({ message: "An error occurred on our part." });
                console.log(err);
                return;
            }
            if (result.rowsAffected === 0) {
                res.status(500).json({ message: "Couldn't add the resource." });
            }
            res.status(201).json({ message: "Resource added successfully." });
        });
    })
});
const getPerson = asyncHandler(async (req, res) => {
    const token = req.headers['r-a-token'];
    let userId = null, isValid = false;
    console.log(token);
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token is invalid" });
            console.log(err);
            return;
        }
        if (Date.now() / 1000 > decoded.exp) {
            res.status(401).json({ message: "Token is expired" });
            return;
        }
        if (decoded.role != 'admin') {
            res.status(403).json({ message: "access denied" });
            return;
        }
        userId = decoded.userId;
        isValid = true;
    });
    if (!isValid) return;
    sql.connect(config, (error) => {
        if (error) {
            errorHandler(error, req, res, "");
            return;
        }
        const request = new sql.Request();
        const id = req.params.id;

        request.input('id', sql.Int, id);
        console.log("ID:::::::" + id);
        const QUERY = `SELECT p.*, b.Emri57292 AS EmriBankes
                       FROM Personi p
                         LEFT JOIN Banka b
                         ON b.ID57292 = p.BankaId57292
                       WHERE p.ID57292 = @id;`;
        request.query(QUERY, (err, result) => {
            if (err) {
                res.status(500).json({ message: "An error occurred on our part." });
                console.log(err);
                return;
            }
            if (result.rowsAffected === 0) {
                res.status(500).json({ message: "Couldn't add the resource." });
            }
            res.status(200).json({ message: "Resource updated successfully.", response: result.recordset });
        });
    })
});
const deletePerson = asyncHandler(async (req, res) => {
    const token = req.headers['r-a-token'];
    let userId = null, isValid = false;
    console.log(token);
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token is invalid" });
            console.log(err);
            return;
        }
        if (Date.now() / 1000 > decoded.exp) {
            res.status(401).json({ message: "Token is expired" });
            return;
        }
        if (decoded.role != 'admin') {
            res.status(403).json({ message: "access denied" });
            return;
        }
        userId = decoded.userId;
        isValid = true;
    });
    if (!isValid) return;
    sql.connect(config, (error) => {
        if (error) {
            errorHandler(error, req, res, "");
            return;
        }
        const request = new sql.Request();
        const id = req.params.id;

        request.input('id', sql.Int, id);
        const QUERY = `DELETE FROM Personi WHERE ID57292 = @id;`;
        request.query(QUERY, (err, result) => {
            if (err) {
                res.status(500).json({ message: "An error occurred on our part." });
                console.log(err);
                return;
            }
            if (result.rowsAffected === 0) {
                res.status(500).json({ message: "Couldn't add the resource." });
            }
            res.status(200).json({ message: "Resource updated successfully." });
        });
    })
});
const updatePerson = asyncHandler(async (req, res) => {
    console.log(req.body)
    const token = req.headers['r-a-token'];
    let userId = null, isValid = false;
    console.log("arlind")
    console.log(token);
    jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Token is invalid" });
            console.log(err);
            return;
        }
        if (Date.now() / 1000 > decoded.exp) {
            res.status(401).json({ message: "Token is expired" });
            return;
        }
        if (decoded.role != 'admin') {
            res.status(403).json({ message: "access denied" });
            return;
        }
        userId = decoded.userId;
        isValid = true;
    });
    if (!isValid) return;
    sql.connect(config, (error) => {
        if (error) {
            errorHandler(error, req, res, "");
            return;
        }
        const request = new sql.Request();
        const id = req.params.id;
        const { name, surname, bank } = req.body;

        request.input('emri', sql.VarChar, name);
        request.input('mbiemri', sql.VarChar, surname);
        request.input('banka', sql.Int, bank);
        request.input('id', sql.Int, id);
        const QUERY = `UPDATE Personi
                       SET Emri57292 = @emri, Mbiemri57292 = @mbiemri, BankaId57292 = @banka
                       WHERE ID57292 = @id;
                       
                       SELECT p.*, b.Emri57292 AS EmriBankes
                       FROM Personi p
                         LEFT JOIN Banka b
                         ON b.ID57292 = p.BankaId57292
                       WHERE p.ID57292 = @id;`;
        request.query(QUERY, (err, result) => {
            if (err) {
                res.status(500).json({ message: "An error occurred on our part." });
                console.log(err);
                return;
            }
            if (result.rowsAffected === 0) {
                res.status(500).json({ message: "Couldn't add the resource." });
            }
            res.status(200).json({ message: "Resource updated successfully.", response: result.recordset });
        });
    })
});
module.exports = {
    createPerson,
    updatePerson,
    deletePerson,
    getPerson
}