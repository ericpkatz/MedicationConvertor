PainCalc.RegimenConvertor = function (input, output) {
    this._input = input || new PainCalc.Regimen();
    this._output = output || new PainCalc.Regimen();
    this.Convert();
};

PainCalc.RegimenConvertor.Loggers = [];

PainCalc.RegimenConvertor.prototype = {
    Replace: function (rx, io, medicationType) {
        var regimen = this.GetRegimen(io);
        //To Do - need to remove
        if (rx === null)
            regimen.Remove(medicationType);
        else
            regimen.Replace(rx);

        this.Convert();
    },
    GetRegimen: function (io) {
        return PainCalc.IO.Existing == io ? this.Existing() : this.Proposed();
    },
    Existing: function () {
        return this._input;
    },
    Proposed: function () {
        return this._output;
    },
    ShortActingFactor: 1 / 4,
    LongActingFactor: function () {
        if (this._output.Rxs().length == 1)
            return 1;
        else
            return 3 / 4;
    },
    IVFactor: 3 / 4,
    Prescription: function (ioType, medType) {
        ek.utilities.enumVerify(PainCalc.IO, ioType);
        ek.utilities.enumVerify(PainCalc.MedicationTypes, medType);
        switch (ioType) {
            case PainCalc.IO.Existing:
                switch (medType) {
                    case PainCalc.MedicationTypes.ShortActing:
                        return this.ShortActingExisting();
                        break;
                    case PainCalc.MedicationTypes.LongActing:
                        return this.LongActingExisting();
                        break;
                    case PainCalc.MedicationTypes.IV:
                        return this.IVExisting();
                        break;
                };
                break;
            case PainCalc.IO.Proposed:
                switch (medType) {
                    case PainCalc.MedicationTypes.ShortActing:
                        return this.ShortActingProposed();
                        break;
                    case PainCalc.MedicationTypes.LongActing:
                        return this.LongActingProposed();
                        break;
                    case PainCalc.MedicationTypes.IV:
                        return this.IVProposed();
                        break;
                };
                break;
        }
    },
    GetPrescription: function (io, medicationType) {
        ek.utilities.enumVerify(PainCalc.IO, io);
        ek.utilities.enumVerify(PainCalc.MedicationTypes, medicationType);
        return this[medicationType + io]();
    },
    Existing: function () {
        return this._input;
    },
    Proposed: function () {
        return this._output;
    },
    ShortActingProposed: function () {
        if (this.Proposed().HasShortActing())
            return this.Proposed().ShortActing()[0];
        return null;
    },
    LongActingProposed: function () {
        if (this.Proposed().HasLongActing())
            return this.Proposed().LongActing()[0];
        return null;
    },
    IVProposed: function () {
        if (this.Proposed().HasIV())
            return this.Proposed().IV()[0];
        return null;
    },
    ShortActingExisting: function () {
        if (this.Existing().HasShortActing())
            return this.Existing().ShortActing()[0];
        return null;
    },
    LongActingExisting: function () {
        if (this.Existing().HasLongActing())
            return this.Existing().LongActing()[0];
        return null;
    },
    IVExisting: function () {
        if (this.Existing().HasIV())
            return this.Existing().IV()[0];
        return null;
    },
    ValidProposed: function () {
        return this.Proposed().Valid();
    },
    ValidExisting: function () {
        return this.Existing().Valid();
    },
    CanConvert: function () {
        return this.ValidExisting() && this.ValidProposed();
    },
    Bandwidth: function (medType) {
        if (this.Proposed().Count() == 0 || (this.Proposed().Count() == 1 && this.Proposed().Rxs()[0].Medication.MedicationType == medType))
            return this.Existing().Normalized();
        else {
            if (medType == PainCalc.MedicationTypes.ShortActing) {
                //if there currently is no short acting - then we need to give more bandwidth
                var factor = !this.Proposed().HasShortActing() ? (3/4) : 1.0;
                return this.Existing().Normalized() - this.Proposed().LongActing()[0].Normalized() * factor;
            }
            if (medType == PainCalc.MedicationTypes.LongActing) {
                return this.Existing().Normalized() * (3 / 4);
            }
        }
    },
    Convert: function () {
        var msg = "** Existing ** \n";
        msg += this._input;
        msg += "\n** Proposed PRE-Process **\n";
        msg += this._output;
        if (this.CanConvert()) {
            if (this.Proposed().HasIV()) {
                this.Proposed().Rxs()[0].Dose = this.IVFactor * this.IVProposed().Medication.ConversionFactor / 24 * this.Existing().Normalized();
            }
            else if (this.Existing().Count() == 1 && this.Proposed().Count() == 1) {
                this.Proposed().Rxs()[0].Dose =
                            this.Proposed().Rxs()[0].Medication.AvailableMultiples
                            *
                            Math.floor(this.Proposed().Rxs()[0].Medication.ConversionFactor / this.Existing().Rxs()[0].Medication.ConversionFactor / this.Proposed().Rxs()[0].DosesPerDay * this.Existing().Rxs()[0].NonNormalized() / this.Proposed().Rxs()[0].Medication.AvailableMultiples);
            }
            else {
                if (this.LongActingProposed() != null)
                    this.LongActingProposed().SetDose(this.Existing().Normalized() * this.LongActingFactor() * this.LongActingProposed().Medication.ConversionFactor / this.LongActingProposed().DosesPerDay);
                if (this.ShortActingProposed() != null)
                    this.ShortActingProposed().SetDose((this.Existing().Normalized() - (this.LongActingProposed() == null ? 0 : this.LongActingProposed().Normalized())) * this.ShortActingProposed().Medication.ConversionFactor / this.ShortActingProposed().DosesPerDay);
            }
        }
        var filtered = [];
        $(this._output.Rxs()).each(function () {
            if (this.Dose > 0)
                filtered.push(this);
        });
        this._output = new PainCalc.Regimen(filtered);
        if (this._input.Rxs().length == 0)
            this._output = new PainCalc.Regimen([]);
        var that = this;
        $(PainCalc.RegimenConvertor.Loggers).each(function () {
            //msg += "\n";
            //msg += that.Existing();
            msg += "\n** Proposed POST-Process **\n";
            msg += that.Proposed();
            msg += "\n"
            this.log(msg);
        });
    }
};