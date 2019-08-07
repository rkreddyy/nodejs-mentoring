export const findUser = (db, username, password) => {
    return db.User.findOne({
        where: {
            [db.Sequelize.Op.and]: [
                { username: username },
                { password: password }]
        }
    });
}

export const response = (code, message, data, token) => ({
    code, message, data, token
});