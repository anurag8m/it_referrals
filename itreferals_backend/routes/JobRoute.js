var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var jobObj = require("../models/Job");
var catObj = require("../models/Category");
var userObj = require("../models/User");
var candidateObj = require("../models/CandidateRefer");
var Constants = require("../models/Constants");

// api to create a job
router.post("/createJob", function(req, res) {
  jobObj.create(req.body, function(err, jobCreated) {
    if (err) {
      var message = { Success: 0, Message: "Some error found" };
      res.send(message);
    } else {
      var message = { Success: 1, Job: jobCreated };
      res.send(message);
    }
  });
});

// api to get job listing on the basis of category id.
router.get("/getJobByCategory/:id", function(req, res) {
  jobObj
    .find({ isactive: true, category: req.params.id })
    .populate("category")
    .exec((err, jobList) => {
      if (err) {
        var message = { Success: 0, Message: "Some error found" };
        res.send(message);
      } else {
        var message = { Success: 1, Jobs: jobList };
        res.send(message);
      }
    });
});

//api to get JobCount based on categoryId
router.get("/jobCountByCategory", function(req, res) {
  catObj.aggregate(
    [
      {
        $lookup: {
          from: "jobs",
          let: { catId: "$_id" }, // <-- collection to join
          // localField: "_id",
          // foreignField: "restaurantId",
          as: "jobCount",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$category", "$$catId"] },
                    { $eq: ["$isactive", true] }
                  ]
                }
              }
            },
            { $count: "total" }
          ]
        }
      },
      {
        $unwind: {
          path: "$jobCount",
          preserveNullAndEmptyArrays: true
        }
      }
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send({ Success: 1, Categories: result });
      }
    }
  );
});

// api to get job Details

router.get("/getJobDetails/:jobId", function(req, res) {
  jobObj
    .findById({ _id: req.params.jobId })
    .populate("category")
    .populate("userWhoCreated")
    .exec((err, products) => {
      //Logic
      var message = { Success: 1, Detail: products };
      res.send(message);
    });
});

//api to create profile referring candidate
router.post("/referCandidate", function(req, res) {
  //   console.log(req.body);
  //   return false;
  //If User already LoggedIn
  //Check if Email exists
  if (req.body.user.userId != null) {
    var referCandidate = {
      referredName: req.body.candidate.referredName,
      referredLinkedIn: req.body.candidate.referredLinkedIn,
      referredResumeLink: req.body.candidate.referredResumeLink,
      jobId: req.body.candidate.jobId,
      referredBy: req.body.user.userId
    };
    createCandidateReferal(referCandidate)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    //If user is not LoggedIn
    //candidate
    createPasswordHash(req.body.user.password)
      .then(msg => {
        var usr = {
          name: req.body.user.name,
          email: req.body.user.email,
          password: msg.newPassword
        };

        createUser(usr)
          .then(mssg => {
            var referCandidate = {
              referredName: req.body.candidate.referredName,
              referredLinkedIn: req.body.candidate.referredLinkedIn,
              referredResumeLink: req.body.candidate.referredResumeLink,
              jobId: req.body.candidate.jobId,
              referredBy: mssg.User._id
            };
            createCandidateReferal(referCandidate)
              .then(message => {
                res.send(message);
              })
              .catch(err1 => {
                res.send(err1);
              });
          })
          .catch(err2 => {
            res.send(err2);
          });
      })
      .catch(err3 => {
        res.send(err3);
      });
  }
});

// api to create profile referring Job
router.post("/referJob", function(req, res) {
  // console.log(req.body);
  if (req.body.user.userId != null) {
    var refferJob = {
      companyNane: req.body.job.companyName,
      contactPerson: req.body.job.contactPerson,
      jobTitle: req.body.job.jobTitle,
      category: req.body.job.category,
      duration: req.body.job.duration,
      description: req.body.job.description,
      descriptionLink: req.body.job.descriptionLink,
      userWhoCreated: req.body.user.userId
    };
    createJobReferal(refferJob)
      .then(message => {
        res.send(message);
      })
      .catch(err => {
        res.send(err);
      });
  } else {
    createPasswordHash(req.body.user.password)
      .then(msg => {
        var usr = {
          name: req.body.user.name,
          email: req.body.user.email,
          password: msg.newPassword
        };

        createUser(usr)
          .then(mssg => {
            var refferJob = {
              companyNane: req.body.job.companyName,
              contactPerson: req.body.job.contactPerson,
              jobTitle: req.body.job.jobTitle,
              category: req.body.job.category,
              duration: req.body.job.duration,
              description: req.body.job.description,
              descriptionLink: req.body.job.descriptionLink,
              userWhoCreated: mssg.User._id
            };
            console.log(JSON.stringify(refferJob, null, 2));
            createJobReferal(refferJob)
              .then(message => {
                res.send(message);
              })
              .catch(err1 => {
                res.send(err1);
              });
          })
          .catch(err2 => {
            res.send(err2);
          });
      })
      .catch(err3 => {
        res.send(err3);
      });
  }
});

function createCandidateReferal(job) {
  return new Promise((resolve, reject) => {
    candidateObj.create(job, function(err, candidateObj) {
      if (err) {
        var message = { Success: 0, Message: "Some error found" };
        reject(message);
      } else {
        var message = {
          Success: 1,
          Message: "Candidate referred successfully",
          CandidateReferred: candidateObj
        };
        resolve(message);
      }
    });
  });
}

function createJobReferal(job) {
  return new Promise((resolve, reject) => {
    jobObj.create(job, function(err, jobObj) {
      if (err) {
        var message = { Success: 0, Message: "Some error found" };
        reject(message);
        console.log(message);
      } else {
        var message = {
          Success: 1,
          Message: "Job referred successfully",
          JobReferred: jobObj
        };
        resolve(message);
        console.log(message);
      }
    });
  });
}

function createUser(usr) {
  return new Promise((resolve, reject) => {
    userObj.findOne({ email: usr.email }, (err, findUser) => {
      if (err) {
        var message = { Success: 0, Message: "Some Error found" };
        reject(message);
      } else {
        if (findUser) {
          var message = { Success: 0, Message: "Email already registered" };
          reject(message);
        } else {
          userObj.create(usr, function(err, userCreated) {
            if (err) {
              var message = { Success: 0, Message: "Some error found" };
              reject(message);
              console.log(message);
            } else {
              var message = { Success: 1, User: userCreated };
              resolve(message);
              console.log(message);
            }
          });
        }
      }
    });
  });
}

function createPasswordHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error("There was an error", err);
      else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject({
              Success: 0,
              Message: "Some error found while creating salt"
            });
          } else {
            resolve({ Success: 1, newPassword: hash });
            console.log("Hashed Password is:" + hash);
          }
        });
      }
    });
  });
}

module.exports = router;
