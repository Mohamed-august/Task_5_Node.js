import { Router } from "express";
import {getCommentbyID} from "./comments.services.js";
import { Comment } from "../../DB/models/comments.model.js";
import {User} from "../../DB/models/users.model.js";
const commentRouter = Router();

commentRouter.post("/", async (req, res) => {
    try {
        const commentsData = Array.isArray(req.body) ? req.body : [req.body];
        const comments = await Comment.bulkCreate(commentsData);
        res.status(201).json({"comment created successfully": comments});
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error", err });
    }
});

commentRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const {content} = req.body;
    try {
        const comment = await Comment.findByPk(id);
        if(!comment){
            return res.status(404).json({msg:"Comment not found"});
        }
        else if(User.role!=='admin')
        {
            return res.status(403).json({msg:"Unauthorized"});
        }
        await comment.update({content});
        res.status(200).json({"comment updated successfully": comment});
    }
    catch (err) {
        res.status(500).json({ msg: "Internal server error", err });
    }
});

commentRouter.post("/find-or-create", (req, res) => {
    const {content, postID, userID} = req.body;
    Comment.findOrCreate({
        where: { content, postID, userID },
        defaults: { content, postID, userID }
    })
    .then(([comment, created]) => {
        if(created){
            res.status(201).json({"comment created successfully": comment});
        }else{
            res.status(200).json({"comment already exists": comment});
        }
    })
    .catch((err) => {
        res.status(500).json({msg:"Internal server error", err})
    })
})

commentRouter.get("/search", (req, res) => {
    const {content}=req.query;
    Comment.findAll({
        where: {
            content: content
        }
    })
    .then((comments) => {
        res.status(200).json({comments})
    })
    .catch((err) => {
        res.status(500).json({msg:"Internal server error", err})
    })
})

commentRouter.get("/newest/:postid", async (req, res) => {
    const {postid} = req.params;
    try {
        const comments = await Comment.findAll({
            where: {
                postID: postid
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });
        res.status(200).json({comments});
    } catch (err) {
        res.status(500).json({msg:"Internal server error", err});
    }
});

commentRouter.get("/details/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const comment = await getCommentbyID(id);
        if(!comment){
            return res.status(404).json({msg:"Comment not found"});
        }
        res.status(200).json({comment});
    } catch (err) {
        res.status(500).json({msg:"Internal server error", err});
    }
});

export default commentRouter;

