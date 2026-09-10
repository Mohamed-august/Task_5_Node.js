import { Router } from "express";
import {getAllPosts} from "./posts.services.js";
import { Post } from "../../DB/models/posts.model.js";
import {User} from "../../DB/models/users.model.js";
import {Comment} from "../../DB/models/comments.model.js";
const postRouter = Router();

postRouter.post("/", async (req, res) => {
    const {title, content, userID} = req.body;
    try {
        const post = await Post.create({
            title,
            content,
            userID
        });
        res.status(201).json({"post created successfully": post});
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error", err });
    }
}
)

postRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }
        await post.destroy();
        res.status(200).json({ msg: "Post deleted" });
    } catch (err) {
        if(User.role !== 'admin'){
        res.status(403).json({ msg: "You are not authorized to delete this post", err });
    }}
});

postRouter.get("/", (req, res) => {
    getAllPosts()
        .then((posts) => res.status(200).json({ posts }))
        .catch((err) => res.status(500).json({ msg: "Internal server error", err }));
})

postRouter.get("/comment-count", async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title', [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentCount']],
            include: [
                {
                    model: Comment,
                    attributes: [],
                    as: 'comments'
                }
            ],
            group: ['Post.id']
        });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ msg: "Internal server error", err });
    }
});

export default postRouter;
