ek.utilities.ManifestHelper(
               {
                   start: function () {
                       $.mobile.changePage("#new-version");
                   },
                   progress: function () {
                       var elem = $(".progress", $("#new-version"));
                       elem.html(elem.html() + ".");
                   },
                   end: function () {
                       var elem = $("a[href='index.htm']", $("#new-version"));
                       $(".ui-btn-text", elem).text("New Software Version Available");
                       elem.removeClass("ui-disabled")
                   },
                   noupdate: function () {
                       //$("#noupdate").html("end");
                   }
               }
            );