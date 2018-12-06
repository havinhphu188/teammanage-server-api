var express = require("express");
var router = express.Router();
const { Project, Member } = require("../sequelize");

/* GET home page. */
router.get("/all-project", function(req, res) {
  //res.json({ title: 'Express' });
  Project.findAll().then(projects=>{
    console.log(projects);
    res.json(projects);
  })
});

router.post("/create-member", function(req, res) {
  //res.json({ title: 'Express' });
  Member.create({
    member_name: req.body.member_name,
    member_email: req.body.member_email
  }).then(memb => res.json(memb));
});

router.post("/create-project", function(req, res) {
  //res.json({ title: 'Express' });
  Project.create({
    project_name: req.body.project_name,
    project_email: req.body.project_email
  }).then(proj => res.json(proj));
});

module.exports = router;
