import {DataTypes,Model} from 'sequelize';

import {sequelize} from '../db.connection.js';


export class Comment extends Model {}

Comment.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    , content:{
        type:DataTypes.STRING
    },
    userID:{
        type:DataTypes.INTEGER,
    },
    postID:{
        type:DataTypes.INTEGER,
    },
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
    tableName:'comments',
    
})
