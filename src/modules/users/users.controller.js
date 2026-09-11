import { Router } from "express";
import { User } from "../../DB/models/users.model.js";
import { getUserbyID } from "./users.services.js";
const userRouter = Router();


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

userRouter.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const isUserExist = await User.findOne({ where: { email } });
        if (isUserExist) {
            return res.status(409).json({ msg: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({ msg: "User created successfully", user });
    } 
    catch (err) {
        return res.status(500).json({ msg: "Internal server error", err });
    }
});

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

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserbyID(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({ msg: "User found", user });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", err });
    }
});

export default userRouter;
