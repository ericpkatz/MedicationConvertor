PainCalc.Rx = function (medication, dose, dosesPerDay, units) {
    this.Medication = medication;
    this.Dose = dose || medication.AvailableMultiples;
    this.DosesPerDay = dosesPerDay || medication.TypicalDosesPerDay;
    this.DisplayUnits = units || medication.Units;
    var multiple = this.DisplayUnits == PainCalc.MedicationUnits.Mg ? 1 : 1000;
    this.Multiple = multiple;
};

PainCalc.Rx.EmptyPrescription = new PainCalc.Rx("Empty", 0, 0, 0);

PainCalc.Rx.prototype = {
    Normalized: function () {
        return this.Dose * this.DosesPerDay / this.Medication.ConversionFactor;
    },
    NonNormalized: function () {
        return this.Dose * this.DosesPerDay;
    },
    DoseByUnits: function () {
        return this.Medication.Units == PainCalc.MedicationUnits.Mc ? this.Dose * 1000 : this.Dose;
    },
    DisplayDose: function () {
        return this.Dose * this.Multiple;
    },
    FrequencyString: function () {
        if (this.DosesPerDay == 1)
            return "qD";
        else
            return "q" + 24 / this.DosesPerDay + "h";
    },
    NormalizedFormat: function () {
        var num = this.Normalized().toString(); //If it's not already a String
        num = num.slice(0, (num.indexOf(".")) + 3);
        return num;
    },
    FormattedDisplayDose: function () {
        var num = this.DisplayDose().toString();
        //num = num.slice(0, (num.indexOf(".")) + 3);
        return ek.utilities.NumberFormat(num);
        //return num;
    },
    SetDose: function (dose) {
        this.Dose = Math.floor(dose / this.Medication.AvailableMultiples) * this.Medication.AvailableMultiples;
    },
    ProposedFactor: function () {
        return this.Medication.ConversionFactor / this.DosesPerDay;
    },
    Summary: function () {
        return this.Medication.Name + " " + this.FormattedDisplayDose() + this.DisplayUnits + " " + this.DosesPerDay + " per day";
    }
};