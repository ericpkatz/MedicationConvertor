PainCalc.Regimen = function (rxs) {
    this._rxs = [];
    var ar = (rxs && typeof(rxs.length) != "undefined") ? rxs : arguments;
    var rx;
    for (var i = 0; i < ar.length; i++) {
        var rx = this.ConvertFromMedication(ar[i]);
        this._rxs.push(rx);
    };
}

PainCalc.Regimen.prototype = {
    Rxs: function () {
        return this._rxs;
    },
    Add: function (rx) {
        this.Rxs().push(this.ConvertFromMedication(rx));
    },
    ConvertFromMedication: function (rx) {
        return rx instanceof PainCalc.Medication ? new PainCalc.Rx(rx) : rx;
    },
    Normalized: function () {
        var sum = 0;
        $(this.Rxs()).each(function () {
            sum += this.Normalized();
        });
        return sum;
    },
    FindByMedicationType: function (medicationType) {
        return $.grep(this.Rxs(), function (item) {
            return item.Medication.MedicationType == medicationType;
        });
    },
    Remove: function (medicationType) {
        if (this.FindByMedicationType(medicationType).length > 0) {
            var toReplace = this.FindByMedicationType(medicationType)[0];
            var index = this.Rxs().indexOf(toReplace);
            this.Rxs().splice(index, 1);
        }
    },
    Replace: function (prescription) {
        if (this.FindByMedicationType(prescription.Medication.MedicationType).length > 0) {
            var toReplace = this.FindByMedicationType(prescription.Medication.MedicationType)[0];
            var index = this.Rxs().indexOf(toReplace);
            this.Rxs()[index] = prescription;
        }
        else
            this.Rxs().push(prescription);
    },
    LongActing: function () {
        return this.FindByMedicationType(PainCalc.MedicationTypes.LongActing);
    },
    HasLongActing: function () {
        return this.LongActing().length > 0;
    },
    ShortActing: function () {
        return this.FindByMedicationType(PainCalc.MedicationTypes.ShortActing);
    },
    IV: function () {
        return this.FindByMedicationType(PainCalc.MedicationTypes.IV);
    },
    HasIV: function () {
        return this.IV().length > 0;
    },
    HasShortActing: function () {
        return this.ShortActing().length > 0;
    },
    Count: function () {
        return this.Rxs().length;
    },
    Valid: function () {
        return this.HasShortActing() || this.HasLongActing() || this.HasIV();
    },
    toString: function () {
        var str = ""
        $(this.Rxs()).each(function () {
            str += " | " + this.Summary();
        });
        return str == "" ? "empty regimen" : str;
    },
    NormalizedFormat: function () {
        var num = this.Normalized().toString(); //If it's not already a String
        num = num.slice(0, (num.indexOf(".")) + 3);
        return num;
    },
};

