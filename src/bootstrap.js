import express from "express";
import chalk from "chalk";
import { testDBConnection, testSync } from "./DB/db.connection.js";
import { User } from "./DB/models/users.model.js";
import userRouter from "./modules/users/users.controller.js";
import postRouter from "./modules/posts/posts.controller.js";
import commentRouter from "./modules/comments/comments.controller.js";
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

const bootstrap = async () => {

await testDBConnection();
await testSync();

const createUsers = async () => {

    const user= User.build({
        name: "John Doe",
        email: "John.Doe@example.com",
        password: "password123",
        role: "user"
    });
    await user.save();
}
createUsers();

app.listen(3000, () => {
    console.log(chalk.green("Server is running on port 3000"));
})

}

export default bootstrap;
