const pool = require("../config/database").pool;

exports.findAll = async () => {
        let sqlQuery = "SELECT * FROM article";
        return await pool
                .then(connection => connection.query(sqlQuery))
                .catch(err => {
                        console.log(err);
                        throw new Error();
                })
}

exports.findById = async (id) => {
        let sqlQuery = "SELECT * FROM article WHERE id = ?";
        return await pool
                .then(connection => connection.query(sqlQuery, [id]))
                .catch(err => {
                        console.log(err);
                        throw new Error();
                })
}

exports.create = async (article) => {
        const { author, content } = article;
        let sqlQuery =  `INSERT INTO article(author, content) VALUES (?, ?)`;
        return await pool 
                .then(connection => connection.query(sqlQuery, [author, content]))
                .catch(err => {
                        console.log(err);
                        throw new Error();
                })
}

exports.update = async (article) => {
        const { author, content, id } = article;
        let sqlQuery =  `UPDATE article SET author = ?, content = ? WHERE id = ?`;
        return await pool 
                .then(connection => connection.query(sqlQuery, [author, content, id]))
                        .then(async updated => {
                             const updatedArticle = await this.findById(id)[0];   
                             return updatedArticle[0];
                        })
                .catch(err => {
                        console.log(err);
                        throw new Error();
                })
}

exports.delete = async (id) => {
        let sqlQuery =  `DELETE FROM article WHERE id = ?`;
        return await pool 
                .then(connection => connection.query(sqlQuery, [id]))
                .catch(err => {
                        console.log(err);
                        throw new Error();
                })
    }