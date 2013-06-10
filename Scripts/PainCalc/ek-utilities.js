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
        if(num.indexOf(".") == -1)
          return num;
        num = num.slice(0, (num.indexOf(".")) + 3);
        return num;
    },
};