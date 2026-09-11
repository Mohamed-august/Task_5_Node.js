import {Post} from "../../DB/models/posts.model.js";
import {User} from "../../DB/models/users.model.js";
import {Comment} from "../../DB/models/comments.model.js";
export const getPostbyID = async (id) => {
return await Post.findByPk(id);
}

export const getAllPosts = async () => {
    return Post.findAll({
        attributes: ['id', 'title'],
        include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Comment, attributes: ['id', 'content'] }
        ]
    });
};
