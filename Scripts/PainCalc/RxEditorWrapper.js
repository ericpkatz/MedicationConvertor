PainCalc.RxEditorWrapper = function (rxWrapper, meds) {
    this.RxWrapper = rxWrapper;

    this.Meds = meds ? meds.map(function (elem) {
        if (rxWrapper === null || !rxWrapper.Rx)
            elem.Selected = false;
        else if (rxWrapper.Rx.Medication.Name == elem.Name)
            elem.Selected = true;
        else
            elem.Selected = false;
        return elem;
    }) : [];
};


PainCalc.RxEditorWrapper.prototype = {
    IO: function () {
        return this.RxWrapper.IO();
    },
    IsProposed: function () {
        return this.IO() == PainCalc.IO.Proposed;
    },
    MedicationType: function () {
        return this.RxWrapper.MedicationType();
    },
    IsEmpty: function () {
        return this.RxWrapper.IsEmpty();
    },
    Rx: function () {
        return this.RxWrapper.Rx;
    },
    NotIsEmpty: function () {
        return !this.IsEmpty();
    },
    OverHours: function () {
        for (var i in PainCalc.OverHours)
            if (PainCalc.OverHours[i] == this.RxWrapper.Rx.DosesPerDay)
                return i;
    },
    MaxDose: function () {
        return this.RxWrapper.Rx.Medication.AvailableMultiples * 10 * this.RxWrapper.Rx.Multiple;
    },
    MinDose: function () {
        return this.RxWrapper.Rx.Medication.AvailableMultiples * this.RxWrapper.Rx.Multiple;
    },
    DisplayDose: function () {
        return this.RxWrapper.Rx.FormattedDisplayDose();
    },
    Units: function () {
        if (this.RxWrapper.Rx)
            return this.RxWrapper.Rx.Medication.Units;
        else
            return "";
    },
    Container: function () {
        return $("#" + this.IO() + "-" + this.MedicationType());
    },
    Get: function () {
        var page = this.Container();
        var medicationName = $("select.Medication", page).val();
        var medicationType = $(".MedicationType", page).html();
        if (medicationName == -1) {
            this.RxWrapper.Rx = null;
            return this;
        }

        //each type of editor should be responsible for getting it's data
        var medication = PainCalc.ThePharmacy.Medication(medicationName, medicationType);
        var multiple = medication.Units == PainCalc.MedicationUnits.Mg ? 1 : 1000;
        var dose = $(".Dose", page).val() / multiple;
        var dosesPerDay = $(".DosesPerDay", page).val();
        this.RxWrapper.Rx = new PainCalc.Rx(medication, dose, dosesPerDay);
        return this;
    },
    Filter: function (meds, bandwidth) {
        return $(meds).map(function (i, item) {
            if (item.canConvert(bandwidth))
                return item;
            else
                return null;
        }).get();
    },
    Set: function (bandwidth) {
        var meds = PainCalc.ThePharmacy.Medications(this.MedicationType());
        if (bandwidth !== null)
            meds = this.Filter(meds, bandwidth);
        //each type of editor should be responsible for setting it's data?
        var page = this.Container();

        var contentArea = $(":jqmData(role=content)", page);
        var header = $(":jqmData(role=header)", page);
        var h1Header = $("h1", header);
        h1Header.html(this.IO() + " " + this.MedicationType());
        var template = $("script[id*=" + this.IO() + this.MedicationType() + "]").html();
        var data = new PainCalc.RxEditorWrapper(this.RxWrapper, meds);

        var html = Mustache.to_html(template, data);
        contentArea.html(html).trigger("create");
        //console.log("Show Editor " + this.IO() + " " + this.MedicationType());
    }
};