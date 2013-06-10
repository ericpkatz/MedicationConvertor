PainCalc.Pharmacy = function(meds) {
    this._medications = null;
    if (meds) {
        this.Medications(meds);
    }
};



PainCalc.Pharmacy.prototype = {
    Medications: function (data) {
        if (typeof data == "object") {
            this._medications = data;
        }
        else {
            return $.grep(this._medications, function (med) {
                return !data || med.MedicationType == data;
            });
        }
    },
    Medication: function (name, type) {
        if (type)
            ek.utilities.enumVerify(PainCalc.MedicationTypes, type);
        var results = $.grep(this._medications, function (med) {
            return med.Name == name && med.MedicationType == type;
        });
        return results.length == 0 ? null : results[0];
    }
};