import {Comment} from "../../DB/models/comments.model.js";
import {User} from "../../DB/models/users.model.js";
import {Post} from "../../DB/models/posts.model.js";
export const getCommentbyID = async (id) => {

return await Comment.findByPk(id,
    {
        attributes: ['id', 'content'],
        include: [
            { model: User, attributes: ['id', 'name','email'] },
            { model: Post, attributes: ['id', 'title','content'] }
        ]
    }
);
}
