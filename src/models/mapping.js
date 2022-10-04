import sequelize from '../../sequelize.js';
import database from 'sequelize';

const { DataTypes } = database;

// model user

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: { type: DataTypes.STRING, unique: true},
    password: { type: DataTypes.STRING}
});


// model category
const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, unique: true, allowNull: false}
});


// model posts

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, unique: true, allowNull: false},
    title: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.TEXT, allowNull: false},
    image: { type: DataTypes.STRING, allowNull: false}
});





Category.hasMany(Post, {onDelete: 'RESTRICT'});
Post.belongsTo(Category);

User.hasMany(Post, {onDelete: 'CASCADE'})
Post.belongsTo(User);


export {
    User,
    Category,
    Post
}