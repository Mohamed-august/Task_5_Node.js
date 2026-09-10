import {DataTypes} from 'sequelize';

import {sequelize} from '../db.connection.js';

import { Post } from './posts.model.js';

import { Comment } from './comments.model.js';

export const User = sequelize.define('users', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
    , name:{
        type:DataTypes.STRING,
        allowNull:false,
    }
    , email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            checkPasswordLength(value){
                if(value.length <= 6){
                    throw new Error("Password must be at greater than 6 characters long");
                }
            }
    }}
    ,
    role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:'user'
        },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
},
{
    sequelize,
    tableName:'users',
    hooks: {
        beforeCreate: (user, options) => {
        checkNameLength(user);
        },
    },
    freezeTableName: true,
    indexes: [
        {
            fields: ["email"],
            unique: true,
            name:"email"
        }]
}
)
function checkNameLength(user) {
    if (!user.name || user.name.trim().length <= 2) {
    throw new Error('Name must be greater than 2 characters.');
    }
}
User.hasMany(Post, { foreignKey: 'userID' });
Post.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(Comment, { foreignKey: 'userID' });
Comment.belongsTo(User, { foreignKey: 'userID' });
