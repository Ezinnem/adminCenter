require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//MIDDLEWARE

app.use(cors());
app.use(express.json());

//ROUTES

//get all resturants
app.get("/api/v1/resturants", async (req, res) => {
    try {
        const allResturants = await pool.query("SELECT * FROM resturants");
        res.status(200).json({
            status: "success",
            number: allResturants.rows.length,
            allResturants: allResturants.rows}
            )
        
    } catch (err) {
        console.error(err.message)
        
    }
});

//Get One resturant
app.get("/api/v1/resturants/:id", async(req, res) => {
    const { id } = req.params
    try {
        const oneResturant = await pool.query("SELECT * FROM resturants WHERE id =$1", [id]);
        res.status(200).json(oneResturant.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});
//Create a resturant
app.post("/api/v1/resturants", async(req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const newResturant = await pool.query("INSERT INTO resturants (name, location, price_range) VALUES($1, $2, $3) RETURNING *", [name, location, price_range]);
        res.status(201).json(newResturant.rows[0]); 
    } catch (err) {
         console.error(err.message)
    }
});

//update a resturant
app.put("/api/v1/resturants/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {name, location, price_range} = req.body;

        const updatedResturant = await pool.query("UPDATE resturants SET name = $1, location = $2, price_range = $3 WHERE id = $4", [name, location, price_range, id]);
        res.status(200).json("Resturant has been updated")
    } catch (err) {
        console.error(err.message)
    }
});

//Delete resturant
app.delete("/api/v1/resturants/:id", async(req, res) => {
    try {
        const {id} = req.params;

        const deleteResturant = await pool.query("DELETE FROM resturants WHERE id = $1", [id])
        res.status(204).json("Resturant has been deleted")
    } catch (err) {
        console.error(err.message)
    }
})

//PORT
const port = process.env.PORT || 1200;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});