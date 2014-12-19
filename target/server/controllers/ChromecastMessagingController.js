module.exports = {

    clientCheckin: function(req, res, sockets) {
        console.log("clientnameee:", req.body);
        req.body.alert.expiresAt = new Date(new Date().getTime() + 10000); //FIVE SECS DURATION HARD CODED! NOT COOL!!
        sockets.emit("client-checkin", req.body.alert);
        res.end();
    },

    clearAlerts: function(req, res, sockets) {
        sockets.emit("alert-deleted");
        res.end("clear alerts!");
    }
};
