PainCalc.Controller = function (convertor) {
    this.convertor = convertor;
    this.init(convertor);
};

PainCalc.Controller.prototype = {
    init: function (convertor) {
        var that = this;
        $("#Existing").bind("pagebeforeshow", function () {
            //that.bindPrescriptionToEditor(new PainCalc.RxEditorWrapper(new PainCalc.RxWrapper({ IO: PainCalc.IO.Existing, MedicationType: PainCalc.MedicationTypes.ShortActing })));
        });
        $("#Existing").bind("pageshow", function () {
            ekJqm.utilities.fixGrids($("#Existing"));
        });
        //ekJqm.utilities.fixGrids($("#Existing"));
        $("#Existing").bind("pagebeforehide", function () {
            //that.log("Existing Before Hide");
        });
        $("#Existing-ShortActing").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(
                    PainCalc.IO.Existing, 
                    PainCalc.MedicationTypes.ShortActing),
                IO: PainCalc.IO.Existing,
                MedicationType: PainCalc.MedicationTypes.ShortActing
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);
        });
        $("#Existing-ShortActing").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });
        $("#Existing-LongActing").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(PainCalc.IO.Existing, PainCalc.MedicationTypes.LongActing),
                IO: PainCalc.IO.Existing,
                MedicationType: PainCalc.MedicationTypes.LongActing
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);
        });
        $("#Existing-LongActing").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });
        $("#Existing-IV").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(PainCalc.IO.Existing, PainCalc.MedicationTypes.IV),
                IO: PainCalc.IO.Existing,
                MedicationType: PainCalc.MedicationTypes.IV
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);

        });
        $("#Existing-IV").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });

        $("#Proposed-ShortActing").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(PainCalc.IO.Proposed, PainCalc.MedicationTypes.ShortActing),
                IO: PainCalc.IO.Proposed,
                MedicationType: PainCalc.MedicationTypes.ShortActing
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);
        });

        $("#Proposed-ShortActing").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });

        $("#Proposed-LongActing").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(PainCalc.IO.Proposed, PainCalc.MedicationTypes.LongActing),
                IO: PainCalc.IO.Proposed,
                MedicationType: PainCalc.MedicationTypes.LongActing
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);
        });

        $("#Proposed-LongActing").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });

        $("#Proposed-IV").bind("pagebeforeshow", function () {
            var rxWrapper = new PainCalc.RxWrapper({
                Rx: that.convertor.GetPrescription(PainCalc.IO.Proposed, PainCalc.MedicationTypes.IV),
                IO: PainCalc.IO.Proposed,
                MedicationType: PainCalc.MedicationTypes.IV
            });
            var rxEditorWrapper = new PainCalc.RxEditorWrapper(rxWrapper);
            that.bindPrescriptionToEditor(rxEditorWrapper, this);
        });

        $("#Proposed-IV").bind("pagebeforehide", function () {
            that.saveFromEditor(this);
        });

        $("#Summary").bind("pagebeforeshow", function () {
            var convertor = that.getConvertorFromView();
            //that.log("Summary Before Show");
            var views = { Summary: null, Normalized: null }; //enum
            for (var v in views)
                for (var io in PainCalc.IO)
                    for (var mt in PainCalc.MedicationTypes) {
                        var selector = "." + mt + "-" + io + "-" + v;
                        if (v == "Summary")
                            $(selector, this).html(convertor[mt + io]() ? new PainCalc.RxWrapper({ Rx: convertor[mt + io](), IO: io, MedicationType: mt }).GetLabel() : "-");
                        if (v == "Normalized")
                            $(selector, this).html(convertor[mt + io]() ? convertor[mt + io]().NormalizedFormat() : "-");
                    }

            for (var io in PainCalc.IO) {
                var selector = "." + io + "-Normalized";
                $(selector, this).html(convertor[io]().NormalizedFormat());
            }
            //that.log(convertor);
        });

        $("#Summary").bind("pageshow", function () {
            ekJqm.utilities.fixGrids(this);
        });

        $("a.delete").live("click", function () {
            that.getMedicationSelectFromElement(this).val("-1").change();
            $.mobile.changePage("#Existing");
            return false;
        });

        $("a.delete-tab").live("click", function () {
            var io = $(this).attr("data-io");
            var medicationType = $(this).attr("data-medication-type");
            that.convertor.Replace(null, io, medicationType);
            that.bindConvertorToView(that.convertor);
            ekJqm.utilities.fixGrids($("#Existing"));
            return false;
        });

        $("input[name=frequency]").live("change", function () {
            var io = that.getIOFromInput(this);
            var medicationType = that.getMedicationTypeFromInput(this);
            that.dosesPerDayInput(this).val($(this).val());
            if (that.isProposed(this)) {
                var convertor = that.getConvertorFromView();
                var existing = convertor.Existing();
                var proposed = convertor.Proposed();
                var rx = that.getPrescriptionFromEditor(new PainCalc.RxEditorWrapper(new PainCalc.RxWrapper({ IO: io, MedicationType: medicationType }))).Rx();
                proposed.Replace(rx);
                convertor = new PainCalc.RegimenConvertor(existing, proposed);
                //that.doseInput(this).val(convertor.Proposed()[medicationType]()[0].Dose);
                that.animateDoseInput(this, convertor.Proposed()[medicationType]()[0].FormattedDisplayDose());
            }
        });

        $("a[data-icon='refresh']").click(function () {
            document.location = "index.htm";
            return false;
        });

        $(".OverHours").live("change", function () {
            var perDay = PainCalc.OverHours[$(this).val()];
            that.getDosesPerDayInputFromInput(this).val(perDay);
            //console.log(perDay);
        });
        $(".Medication").live("change", function () {
            var editor = that.editorFromInput(this);
            var newMed = $(this).val();
            if (newMed != -1) {
                that.deleteButtonFromElement(this).closest('.ui-btn').show();
                var medicationType = that.getMedicationTypeFromInput(this);
                var medication = PainCalc.ThePharmacy.Medication(newMed, medicationType);
                var multiple = medication.Units == PainCalc.MedicationUnits.Mg ? 1 : 1000;
                var slider = $("input[data-type=range].Dose", editor);
                if (slider.length > 0) {
                    slider.val(medication.AvailableMultiples);
                    slider.attr("step", medication.AvailableMultiples * multiple);
                    slider.attr("min", medication.AvailableMultiples * multiple);
                    slider.attr("max", medication.AvailableMultiples * 10 * multiple);
                    slider.slider("refresh");
                }
                $(".DosesPerDay", editor).val(medication.TypicalDosesPerDay);
                if (that.getOverHoursInputFromInput(this).length > 0)
                    that.getOverHoursInputFromInput(this).val(1);
                that.doseInput(this).val(medication.AvailableMultiples * multiple);
                that.getUnitsSpanFromInput(this).html(medication.Units);
                that.setFrequencyControls(that.editorFromInput(this), new PainCalc.Rx(medication), that.isProposed(this), medicationType);
                if (that.isProposed(this)) {
                    var convertor = that.getConvertorFromView();
                    var rx = new PainCalc.Rx(medication);
                    rx.DosesPerDay = that.dosesPerDayInput(this).val() || medication.TypicalDosesPerDay;
                    convertor.Replace(rx, that.getIOFromInput(this), that.getMedicationTypeFromInput(this));

                    var rx = convertor.Proposed().FindByMedicationType(that.getMedicationTypeFromInput(this));
                    if (medicationType == PainCalc.MedicationTypes.IV) {
                        convertor.Proposed().Remove(PainCalc.MedicationTypes.ShortActing);
                        convertor.Proposed().Remove(PainCalc.MedicationTypes.LongActing);
                        convertor.Convert();
                        that.animateDoseInput(this, convertor.Proposed().IV()[0].FormattedDisplayDose());
                        //that.log("special consideration for proposed IV");
                    }
                    else
                        that.animateDoseInput(this, rx[0].FormattedDisplayDose());

                    that.getUnitsSpanFromInput(this).html(medication.Units);
                    //convertor.Replace(new PainCalc.Rx(medication));
                }
                $(".doseDetails", editor).show();
                $(".emptyMessage", editor).hide();
            }
            else {
                that.deleteButtonFromElement(this).closest('.ui-btn').hide();
                $(".doseDetails", editor).hide();
                $(".emptyMessage", editor).show();
            }
        });

        this.bindConvertorToView(convertor);
    },
    log: function (message) {
        //console.log(message);

    },
    bindConvertorToView: function (c) {
        for (var io in PainCalc.IO) {
            for (var medType in PainCalc.MedicationTypes) {
                this.prescription(new PainCalc.RxWrapper({ Rx: c.GetPrescription(io, medType), IO: io, MedicationType: medType }));
            }
        }
        this.updateExistingView(c);
        this.convertor = c;
    },
    prescription: function (rxWrapper) {
        if (rxWrapper.Rx || rxWrapper.Rx === null) {
            rxWrapper.Set();
        }
        else {
            return rxWrapper.Get();
        }
    },
    getConvertorFromView: function () {
        return this.convertor;
    },
    updateExistingView: function (convertor) {
        var existing = $("section[id=Existing]");
        if (convertor.Existing().Valid()) {
            $("a[href^=#Proposed]", existing).removeClass("ui-disabled");
            $("a[href=#Summary]").removeClass("ui-disabled");
            if (convertor.Proposed().HasIV()) {
                $("a[href=#Proposed-ShortActing],a[href=#Proposed-LongActing]", existing).addClass("ui-disabled");
            }
            if (convertor.Proposed().HasShortActing() || convertor.Proposed().HasLongActing()) {
                $("a[href=#Proposed-IV]", existing).addClass("ui-disabled");
            }
            /*else {
            $("a[href=#Proposed-ShortActing],a[href=#Proposed-LongActing]", existing).removeClass("ui-disabled");
            }*/
        }
        else {
            $("a[href^=#Proposed]", existing).addClass("ui-disabled");
            $("a[href=#Summary]").addClass("ui-disabled");
        }
        //ekJqm.utilities.fixGrids($("#Existing"));
    },
    saveFromEditor: function (page) {
        var id = page["id"];
        var wrapper = this.getPrescriptionFromEditor(new PainCalc.RxEditorWrapper(new PainCalc.RxWrapper({ IO: id.split("-")[0], MedicationType: id.split("-")[1] })));
        this.log(wrapper.IO() + " " + wrapper.MedicationType() + " Hide");
        var convertor = this.getConvertorFromView();
        convertor.Replace(wrapper.RxWrapper.Rx, wrapper.IO(), wrapper.MedicationType());
        this.bindConvertorToView(convertor);
    },
    getPrescriptionFromEditor: function (rxEditorWrapper) {
        return rxEditorWrapper.Get();
    },
    bindPrescriptionToEditor: function (rxEditorWrapper, page) {
        var bandwidth = null;
        if (rxEditorWrapper.IsProposed()) {
            var convertor = this.getConvertorFromView();
            bandwidth = convertor.Bandwidth(rxEditorWrapper.MedicationType());
        }
        rxEditorWrapper.Set(bandwidth);
        this.setFrequencyControls(this.editorFromPage(page), rxEditorWrapper.Rx(), rxEditorWrapper.IO() == PainCalc.IO.Proposed, rxEditorWrapper.MedicationType());
    },
    editorFromInput: function (elem) {
        return $(elem).parents(".editor");
    },
    editorFromPage: function (page) {
        return $(".editor", page);
    },
    dosesPerDayInput: function (elem) {
        return $("input.DosesPerDay", this.editorFromInput(elem));
    },
    doseInput: function (elem) {
        return $("input.Dose", this.editorFromInput(elem));
    },
    animateDoseInput: function (elem, dose) {
        var doseInput = this.doseInput(elem);
        doseInput.show();
        doseInput.fadeOut(function () {
            $(this).val(dose);
            $(this).fadeIn();
        });
    },
    getIOFromInput: function (elem) {
        return $(".IO", this.editorFromInput(elem)).html();
    },
    getDosesPerDayInputFromInput: function (elem) {
        return $(".DosesPerDay", this.editorFromInput(elem));
    },
    getOverHoursInputFromInput: function (elem) {
        return $(".OverHours", this.editorFromInput(elem));
    },
    getUnitsSpanFromInput: function (elem) {
        return $(".units", this.editorFromInput(elem));
    },
    frequencyControlFromElement: function (elem) {
        return $(".newFrequency", this.editorFromInput(elem));
    },
    deleteButtonFromElement: function (elem) {
        return $(".delete", this.editorFromInput(elem));
    },
    frequencyControlFromEditor: function (editor) {
        return $(".newFrequency", editor);
    },
    getMedicationTypeFromInput: function (elem) {
        return $(".MedicationType", this.editorFromInput(elem)).html();
    },
    getMedicationSelectFromElement: function (elem) {
        return $("select.Medication", this.editorFromInput(elem));
    },
    isProposed: function (elem) {
        return PainCalc.IO.Proposed == this.getIOFromInput(elem);
    },
    setFrequencyControls: function (editor, rx, isProposed, medicationType) {
        if (!rx)
            return;
        var template = $("#frequency-template");
        if (this.frequencyControlFromEditor(editor).length != 0) {
            var template = $("#frequency-template");
            var frequencyHtml = $(template.html());
            var frequency = rx.DosesPerDay;
            if (isProposed) {
                var convertor = this.getConvertorFromView();
                var bandwidth = convertor.Bandwidth(medicationType);
                this.log(bandwidth);
                var maxDoses = rx.Medication.maxDosesPerDay(bandwidth);
                $("input[type=radio]", frequencyHtml).each(function () {
                    if ($(this).val() > maxDoses)
                        $(this).attr("disabled", "disabled");
                });
                if (frequency > maxDoses) {
                    $($("input[type=radio]", frequencyHtml).get().reverse()).each(function () {
                        if (!$(this).attr("disabled")) {
                            frequency = $(this).val();
                            return false;
                        }
                    });
                }
                $(".DosesPerDay", editor).val(frequency);

            }
            var radioMatch = $("input[value=" + frequency + "]", frequencyHtml);

            radioMatch.attr("checked", "checked");
            this.frequencyControlFromEditor(editor).html(frequencyHtml).trigger("create");
        }
    }
};