var appCacheEvents = ["checking", "error", "noupdate", "downloading", "progress", "updateready", "cached", "obsolete"];
for (var i = 0; i < appCacheEvents.length; i++) {
    applicationCache.addEventListener(appCacheEvents[i], function (evt) {
        if (evt.type == "error") {
            //console.log("error");
        }
        if (evt.type == "downloading") {
            console.log("start");
        }
        if (evt.type == "progress") {
            console.log("progress");
        }
        if (evt.type == "updateready") {
            console.log("done");
        }
    });
}