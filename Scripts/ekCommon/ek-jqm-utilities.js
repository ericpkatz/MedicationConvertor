var ekJqm = {};

ekJqm.utilities = {
    fixGrids: function (container) {
        $("[class^=ui-block-]").each(function () {
            $(this).removeAttr("style");
            $(">div", this).removeAttr("style");
        });
        var fixBlocks = function (blocks) {
            blocks = $(blocks);
            var heights = [];
            blocks.each(function () {
                if ($.inArray($(this).height(), heights) == -1)
                    heights.push($(this).height());
            });
            if (heights.length == 1)
                return;
            var maxHeight = 0;
            blocks.each(function () {
                if ($(this).height() > maxHeight)
                    maxHeight = $(this).height();
            });
            blocks.each(function () {
                $(this).height(maxHeight);
                var adjust = $(">div", this).outerHeight() - $(">div", this).height();
                $(">div", this).height(maxHeight - adjust);
            });
        };

        $("[class^=ui-grid-]", container).each(function () {
            var maxHeight = 0;
            var blocks = $(">[class^=ui-block-]", this);
            var set = [];
            var tempSet = [];
            blocks.each(function (index) {
                var _class = $(this).attr("class");
                if ($.inArray(_class, tempSet) >= 0) {
                    fixBlocks(set);
                    tempSet = [];
                    set = [];
                }
                set.push(this);
                tempSet.push(_class);
                if (index == blocks.length - 1)
                    fixBlocks(set);
            });
        });
    }
};