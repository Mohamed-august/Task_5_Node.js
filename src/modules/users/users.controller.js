import { Router } from "express";
import { User } from "../../DB/models/users.model.js";
const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.status(200).json({msg:"user module"})
})

userRouter.get("/by-email", (req, res) => {
    const { email } = req.query;

    User.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'role'] })
        .then((user) => {
            if (user) {
                res.status(200).json({ user });
            } else {
                res.status(404).json({ msg: "User not found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ msg: "Internal server error", err });
        });
});

userRouter.post("/signup", (req, res) => {
    const {name, email, password, role} = req.body;
    User.create({name, email, password, role})
    .then((user) => {
        res.status(201).json({msg:"User created successfully", user})
    })
    .catch((err) => {
        if (err.name === "SequelizeUniqueConstraintError") {
                return res.status(409).json({ msg: "Email already exists" });
            }
            res.status(500).json({ msg: "Internal server error", err });
    })
})


userRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, age, role } = req.body;

    User.upsert(
        { id, name, email, age, role },
        { validate: false }
    )
        .then(([user, created]) => {
            res.status(200).json({ msg: "User created or updated successfully" });
        })
        .catch((err) => {
            res.status(500).json({ msg: "Internal server error", err });
        });
});

export default userRouter;
