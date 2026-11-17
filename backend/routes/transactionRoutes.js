import express from "express";
import db from "../config/db.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM transactions ORDER BY id DESC"
        );

        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new transaction
router.post("/", async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            transaction_date
        } = req.body;

        if (!title || !amount || !type || !transaction_date) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        if (!["income", "expense"].includes(type) || Number(amount) <= 0) {
            return res.status(400).json({
                message: "Invalid transaction type or amount"
            });
        }

        const [result] = await db.query(
            `INSERT INTO transactions
            (title, amount, type, category, transaction_date)
            VALUES (?, ?, ?, ?, ?)`,
            [title, amount, type, category, transaction_date]
        );

        res.status(201).json({
            message: "Transaction added successfully",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE transaction by ID

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM transactions WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully"
    });

  } catch (error) {
    console.error("Delete error:", error);

    res.status(500).json({
      message: "Failed to delete transaction"
    });
  }
});
export default router;