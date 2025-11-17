import express from "express";
import "dotenv/config";
import tables from "./routes/tables.js";
import coffee from "./routes/coffee.js";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/tables", tables);
app.use("/coffee", coffee);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
