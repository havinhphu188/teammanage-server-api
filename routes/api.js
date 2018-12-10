var express = require("express");
var router = express.Router();
const {Op, Project, Member } = require("../sequelize");

/*
list all current project
no param needed
*/ 
router.get("/all-project", function(req, res) {
  //res.json({ title: 'Express' });
  Project.findAll().then(projects=>{
    res.json(projects);
  })
});

/*
list get project info
param: id of the requested project
*/ 
router.get("/get-project-info", function(req, res) {
  //res.json({ title: 'Express' });
  Project.findById(req.query.id).then(function (project) {
    res.json(project)
  })
});

/*
get all assigned member of current project
param: id of requested project
*/
router.get("/get-assigned-member", function(req, res) {
  //res.json({ title: 'Express' });
  Project.findById(req.query.id)
      .then(project => project.getMembers())
      .then(members => res.json(members));
});

/**
 * get unassigned member of current project. 
 * param: id of requesed project
 */
router.get("/get-unassigned-member", function(req, res) {
  //res.json({ title: 'Express' });
  Project.findById(req.query.id)
      .then(
        project => project.getMembers()
        )
      .then(function (assignedMember) {
        var assignedId = assignedMember.map(member => member.id);
        return Member.findAll({
          where: {
            id: {
              [Op.notIn]: assignedId
            }
          }
        })  
      })
      .then(unassignedMember => {
        res.json(unassignedMember)
      });
});

/**
 * remove assigned the member from the project
 * param: 
 * projectId:   id of the project
 * memberId:   id of the member
 */
router.post("/remove-assigned-member", function(req, res) {
  var promiseFindProject = Project.findById(req.body.projectId);
  var promiseFindMember = Member.findById(req.body.memberId);
  Promise.all([promiseFindProject, promiseFindMember]).then(function (values) {
    values[0].removeMember(values[1]);
  })
  .then(result => {res.json(result)})
  .catch(err=>{console.log(err)});
});

/**
 * create member
 * param:
 *    name of the member
 *    email of the member
 */
router.post("/create-member", function(req, res) {
  //res.json({ title: 'Express' });
  Member.create({
    member_name: req.body.member_name,
    member_email: req.body.member_email
  }).then(memb => res.json(memb));
});

/**
 * create project
 * param:
 *    name of the project
 *    desc of the project
 */
router.post("/create-project", function(req, res) {
  Project.create({
    project_name: req.body.project_name,
    project_desc: req.body.project_desc
  }).then(proj => res.json(proj));
});


router.post("/assigned-member-to-project", function(req, res) {
  var promiseFindMembers = Member.findAll({
    where: {
      id: {
        [Op.in]: req.body.memberIds
      }
    }
  });

  var promiseFindProject = Project.findById(req.body.projectId);

  Promise.all([promiseFindProject, promiseFindMembers]).then(function (values) {
    values[0].setMembers(values[1]);
  })
  .then(result=>{
    res.json(result);
  });
});

module.exports = router;
