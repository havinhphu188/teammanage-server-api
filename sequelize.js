const Sequelize = require('sequelize');
const ProjectModel = require('./models/project')
const MemberModel = require('./models/member')

const sequelize = new Sequelize('teammanageapp', 'postgres', 'asd123', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
});
const Op = Sequelize.Op;
const Project = ProjectModel(sequelize, Sequelize);
const Member = MemberModel(sequelize, Sequelize)
const ProjectMember = sequelize.define('project_member', {})

Project.belongsToMany(Member, { through: ProjectMember})
Member.belongsToMany(Project, { through: ProjectMember})

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Op,
  Project,
  Member
}
