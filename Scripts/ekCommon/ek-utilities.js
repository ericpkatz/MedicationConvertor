var ek = {};

ek.utilities = {
    enumVerify: function (enum_, value) {
        var found = false;
        for (var key in enum_)
            if (enum_[key] == value)
                found = true;
        if (!found)
            throw ("Enumeration does not contain a value for " + value);
    },
    NumberFormat: function (num) {
        var num = num.toString(); //If it's not already a String
        if (num.indexOf(".") == -1)
            return num;
        num = num.slice(0, (num.indexOf(".")) + 3);
        return num;
    },
    ManifestHelper: function (config) {
        if (applicationCache.status == applicationCache.UNCACHED)
            return;
        //config has five members - all callbacks- "start", "progress", "end", "noupdate"
        var appCacheEvents = ["checking", "error", "noupdate", "downloading", "progress", "updateready", "cached", "obsolete"];
        for (var i = 0; i < appCacheEvents.length; i++) {
            applicationCache.addEventListener(appCacheEvents[i], function (evt) {
                if (evt.type == "error") {
                    //console.log("error");
                }
                if (evt.type == "noupdate") {
                    config.noupdate();
                }
                if (evt.type == "downloading") {
                    config.start();
                }
                if (evt.type == "progress") {
                    config.progress();
                }
                if (evt.type == "updateready") {
                    config.end();
                }
            });
        }
    }
};