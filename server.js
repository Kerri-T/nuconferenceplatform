var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var async = require('async');
var async = require('async');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var LocalStrategy = require('passport-local').Strategy;
var sessionSchema = new mongoose.Schema({
    sessionname: { type: String, unique: true },
    sessiondescription: String,
    sessiondate: [String],
    sessionstart: String,
    sessionend: String,
    speakerfname: String,
    speakerlname: String,
    speakeremail: String,
    attendees: [{
        type: mongoose.Schema.Types.String, ref: 'User'
    }]
});
var userSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String,
    organization: String,
    attendeetype: String,
    email: { type: String, unique: true },
    password: String,
});

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var User = mongoose.model('User', userSchema);
var Session = mongoose.model('Session', sessionSchema);
mongoose.connect('mongodb://nimda:Pa55w0rd@ds054288.mongolab.com:54288/nucp');
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());;
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    if (req.user) {
        res.cookie('user', JSON.stringify(req.user));
    }
    next();
});
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (isMatch) return done(null, user);
            return done(null, false);
        });
    });
}));
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) next();
    else res.send(401);
}
app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.cookie('user', JSON.stringify(req.user));
    res.send(req.user);
});
app.post('/api/register', function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organization: req.body.organization,
        email: req.body.email,
        password: req.body.password,
        attendeetype: req.body.attendeetype
    });
    user.save(function (err) {
        if (err) return next(err);
        res.send(200);
    });
});
app.get('/api/logout', function (req, res, next) {
    req.logout();
    res.send(200);
});
app.get('/api/sessions', function (req, res, next) {
    var query = Session.find();
    if (req.query.alphabet) {
        query.where({ sessionname: new RegExp('^' + '[' + req.query.alphabet + ']', 'i') });
    } else {
        query.limit(12);
    }
    query.exec(function (err, sessions) {
        if (err) return next(err);
        res.send(sessions);
    });
});
app.get('/api/sessions/:id', function (req, res, next) {
    Session.findById(req.params.id, function (err, session) {
        if (err) return next(err);
        res.send(session);
    });
});
app.post('/api/createsession', function (req, res, next) {
    var session = new Session({
        sessionname: req.body.sessionname,
        sessiondescription: req.body.sessiondescription,
        sessiondate: req.body.sessiondate,
        sessionstart: req.body.sessionstart,
        sessionend: req.body.sessionend,
        speakerfname: req.body.speakerfname,
        speakerlname: req.body.speakerlname,
        speakeremail: req.body.speakeremail
    });
    session.save(function (err) {
        if (err) return next(err);
        res.send(200);
    });
});
app.post('/api/addattendee', ensureAuthenticated, function (req, res, next) {
    Session.findById(req.body.sessionID, function (err, session) {
        if (err) return next(err);
        session.attendees.push(req.user.email);
        session.save(function (err) {
            if (err) return next(err);
            res.send(200);
        });
    });
});
app.post('/api/removeattendee', ensureAuthenticated, function (req, res, next) {
    Session.findById(req.body.sessionID, function (err, session) {
        if (err) return next(err);
        var index = session.attendees.indexOf(req.user.email);
        session.attendees.splice(index, 1);
        session.save(function (err) {
            if (err) return next(err);
            res.send(200);
        });
    });
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(500, { message: err.message });
});
app.get('*', function (req, res) {
    res.redirect('/#' + req.originalUrl);
});