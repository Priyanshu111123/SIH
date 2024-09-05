import express from "express";

const app = express();

app.get("/api", (req, res) => {
    res.send("Server is ready to accept api");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})