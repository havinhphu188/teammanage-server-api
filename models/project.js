module.exports = (sequelize, type) => {
    return sequelize.define('project', {
        project_name: type.STRING,
        project_desc: type.STRING
    })
}