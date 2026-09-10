import {DataTypes,Model} from 'sequelize';

import {sequelize} from '../db.connection.js';

import { Comment } from './comments.model.js';

export class Post extends Model {}

Post.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    , title:{
        type:DataTypes.STRING,
        allowNull:false
    }
    , content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    userID:{
        type:DataTypes.INTEGER,
    }
    ,
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},{
    sequelize,
    tableName:'posts',
    paranoid:true
    
})
Post.hasMany(Comment, { foreignKey: 'postID' });
Comment.belongsTo(Post, { foreignKey: 'postID' });
