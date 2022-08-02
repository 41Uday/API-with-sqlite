const express = require("express");
const app = express();

const { open } = require("sqlite");

const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");

const sqlite3 = require("sqlite3");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/books/", async (reqest, response) => {
  const getBookQuery = `
        SELECT * FROM book ORDER BY book_id;
    `;
  const booksQuery = await db.all(getBookQuery);
  response.send(booksQuery);
});
