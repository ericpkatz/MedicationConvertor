PainCalc.MedicationTypes = {
    ShortActing: "ShortActing",
    LongActing: "LongActing",
    IV: "IV"
};

PainCalc.MedicationUnits = {
    Mg: "mg",
    Mc: "mcg"
};

PainCalc.IO = {
    Existing : "Existing",
    Proposed : "Proposed"
};

PainCalc.OverHours = {};
for (var i = 1; i <= 24; i++)
    PainCalc.OverHours[i.toString()] = 24 / i;


//a medication

PainCalc.Medication = function (config) {
    if(config.MedicationType)
        ek.utilities.enumVerify(PainCalc.MedicationTypes, config.MedicationType);
    if (config.Units)
        ek.utilities.enumVerify(PainCalc.MedicationUnits, config.Units);
    this.Name = config.Name;
    this.ConversionFactor = config.ConversionFactor;//always in mg
    this.Units = config.Units;
    this.AvailableMultiples = config.AvailableMultiples;//always in mg
    this.TypicalDosesPerDay = config.TypicalDosesPerDay;
    this.MedicationType = config.MedicationType;
    this.AvailableStrengths = config.AvailableStrengths;
}

PainCalc.Medication.prototype = {
    minDoseConversionRatio: function () {
        return (this.AvailableMultiples) / this.ConversionFactor;
    },
    maxDosesPerDay: function (bandwidth) {
        return Math.floor(bandwidth / this.minDoseConversionRatio());
    },
    canConvert: function (bandwidth) {
        return this.maxDosesPerDay(bandwidth) > 0;
    }
};