const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Toolkit', csrfToken: req.csrfToken() });
});

router.get("/404", function(req, res, next) {
    res.render("404", {
        title: "404",
        routename: "404",
        csrfToken: req.csrfToken()
    });
});

router.get("/blank", function(req, res, next) {
    res.render("blank", {
        title: "blank",
        routename: "blank",
        csrfToken: req.csrfToken()
    });
});
router.get("/elements", function(req, res, next) {
    res.render("elements", {
        title: "elements",
        routename: "elements",
        csrfToken: req.csrfToken()
    });
});
router.get("/timeuntilblock", function(req, res, next) {
    res.render("timeuntilblock", {
        title: "Time Until Block",
        routename: "timeuntilblock",
        csrfToken: req.csrfToken()
    });
});

module.exports = router;