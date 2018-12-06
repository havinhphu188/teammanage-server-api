module.exports = (sequelize, type) => {
    return sequelize.define('member', {
        member_name: type.STRING,
        member_email: type.STRING
    })
}