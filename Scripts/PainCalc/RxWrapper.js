PainCalc.RxWrapper = function (config) {
    this.Rx = config.Rx;
    if (config.IO) {
        this._io = config.IO;
        ek.utilities.enumVerify(PainCalc.IO, config.IO);
    }
    if (config.MedicationType) {
        this._medicationType = config.MedicationType;
        ek.utilities.enumVerify(PainCalc.MedicationTypes, config.MedicationType);
    }
};


PainCalc.RxWrapper.prototype = {
    IO: function (io) {
        if (io)
            this._io = io;
        else
            return this._io;
    },
    DisplayDose: function () {
        return this.Rx.FormattedDisplayDose();
    },
    ButtonText: function () {
        switch (this.MedicationType()) {
            case PainCalc.MedicationTypes.ShortActing:
                return "Short Acting";
                break;
            case PainCalc.MedicationTypes.LongActing:
                return "Long Acting";
                break;
            case PainCalc.MedicationTypes.IV:
                return "IV";
                break;
        }
    },
    MedicationType: function (medicationType) {
        if (medicationType)
            this._medicationType = medicationType;
        else
            return this._medicationType;
    },
    IV: function () {
        return this.MedicationType() == PainCalc.MedicationTypes.IV;
    },
    ShortActing: function () {
        return this.MedicationType() == PainCalc.MedicationTypes.ShortActing;
    },
    LongActing: function () {
        return this.MedicationType() == PainCalc.MedicationTypes.LongActing;
    },
    IVDose: function () {
        return (this.Rx.Dose * this.Rx.DosesPerDay) / 24;
    },
    GetLabel: function () {
        if (!this.Rx)
            return "";
        if (this.IV())
            return this.IVDoseFormatted();
        else if (this.ShortActing())
            return this.ShortActingDoseFormatted();
        return this.LongActingDoseFormatted();
    },
    ShortActingDoseFormatted: function () {
        var number = this.Rx.Dose;
        number *= this.Rx.Multiple;
        if (this.IO() == PainCalc.IO.Existing)
            var str = this.Rx.Medication.Name + "<br />" + ek.utilities.NumberFormat(number) + " " + this.Rx.Medication.Units + "<br />" + this.Rx.DosesPerDay + "pills per Day";
        if (this.IO() == PainCalc.IO.Proposed)
            var str = this.Rx.Medication.Name + "<br />" + ek.utilities.NumberFormat(number) + " " + this.Rx.Medication.Units + "<br />" + this.Rx.FrequencyString();
        return str;
    },
    LongActingDoseFormatted: function () {
        var number = this.Rx.Dose;
        number *= this.Rx.Multiple;
        var str = this.Rx.Medication.Name + "<br />" + ek.utilities.NumberFormat(number) + " " + this.Rx.Medication.Units + "<br />" + this.Rx.FrequencyString();
        return str;
    },
    IVDoseFormatted: function () {
        var number = this.IVDose();
        number *= this.Rx.Multiple;
        var str = this.Rx.Medication.Name + "<br />" + ek.utilities.NumberFormat(number) + "<br />" + this.Rx.Medication.Units + " per hour";
        if (this.IO() == PainCalc.IO.Proposed)
            str += " and " + ek.utilities.NumberFormat(number) + " " + this.Rx.Medication.Units + " q10'-q15'";
        if (this.IO() == PainCalc.IO.Existing) {
            var selected = "";
            for (var i in PainCalc.OverHours)
                if (PainCalc.OverHours[i] == this.Rx.DosesPerDay)
                    selected = i;
            str = this.Rx.Medication.Name + "<br />" + this.Rx.DisplayDose() + " " + this.Rx.Medication.Units + "<br />over " + selected + " hours";
        }
        return str;
    },
    IsEmpty: function () {
        return this.Rx === null;
    },
    NotIsEmpty: function () {
        return !this.IsEmpty();
    },
    Container: function () {
        return $("#" + this.IO() + "-" + this.MedicationType() + "-Container");
    },
    Set: function () {
        var container = this.Container();
        var doseField = $(".Dose", container);
        var dosesField = $(".DosesPerDay", container);
        var template = $("#rx-tab-input").html();
        var html = Mustache.to_html(template, this);
        container.html(html);
        container.trigger("create");
    }
};