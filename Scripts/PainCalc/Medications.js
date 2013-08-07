//medications
PainCalc.meds = [
   /* new PainCalc.Medication({
        Name: "Asprin",
        ConversionFactor: 1000,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 15,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [15, 30]
    }),*/
    new PainCalc.Medication({
        Name: "Morphine",
        ConversionFactor: 30,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 15,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths : [15,30]
    }),
    new PainCalc.Medication({
        Name: "Hydromorphone",
        ConversionFactor: 8,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 2,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [2, 4]
    }),
    new PainCalc.Medication({
        Name: "Meperidine",
        ConversionFactor: 300,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 50,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [50, 75]
    }),
    new PainCalc.Medication({
        Name: "Methadone",
        ConversionFactor: 2,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 2.5,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [5, 10]
    }),
    new PainCalc.Medication({
        Name: "Oxycodone",
        ConversionFactor: 20,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 5,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [5, 15, 30]
    }),
    new PainCalc.Medication({
        Name: "Oxymorphone",
        ConversionFactor: 10,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 5,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [5, 10]
    }),
    new PainCalc.Medication({
        Name: "Codeine",
        ConversionFactor: 130,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 15,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [15]
    }),
    new PainCalc.Medication({
        Name: "Hydrocodone",
        ConversionFactor: 30,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 5,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [5, 7.5, 10]
    }),
    new PainCalc.Medication({
        Name: "Levorphanol",
        ConversionFactor: 4,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 2,
        TypicalDosesPerDay: 6,
        MedicationType: PainCalc.MedicationTypes.ShortActing,
        AvailableStrengths: [2, 4]
    }),
    new PainCalc.Medication({
        Name: "MS Contin",
        ConversionFactor: 30,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 15,
        TypicalDosesPerDay: 3,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [15, 30, 60, 100]
    }),
    new PainCalc.Medication({
        Name: "Kadian",
        ConversionFactor: 30,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 20,
        TypicalDosesPerDay: 2,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [20, 30, 50, 60, 80, 100]
    }),
    new PainCalc.Medication({
        Name: "Avinza",
        ConversionFactor: 30,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 20,
        TypicalDosesPerDay: 1,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [30, 60, 90, 120]
    }),
    new PainCalc.Medication({
        Name: "Fentanyl Patch",
        ConversionFactor: .25,
        Units: PainCalc.MedicationUnits.Mc,
        AvailableMultiples: .0125,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [12.5, 25, 50, 75, 100],
        IsPatch : true
    }),
    new PainCalc.Medication({
        Name: "Oxycontin",
        ConversionFactor: 20,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 10,
        TypicalDosesPerDay: 3,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [10, 20, 40, 80]
    }),
    new PainCalc.Medication({
        Name: "Oxymorphone ER",
        ConversionFactor: 10,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 5,
        TypicalDosesPerDay: 2,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [5, 10, 20, 30, 40]
    }),
    new PainCalc.Medication({
        Name: "Exalgo",
        ConversionFactor: 8,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 4,
        TypicalDosesPerDay: 1,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [8, 12, 16]
    }),
    new PainCalc.Medication({
        Name: "Methadone",
        ConversionFactor: 2,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 2.5,
        TypicalDosesPerDay: 1,
        MedicationType: PainCalc.MedicationTypes.LongActing,
        AvailableStrengths: [5, 10]
    }),
    new PainCalc.Medication({
        Name: "Morphine IV",
        ConversionFactor: 10,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 1.0,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths : [1.0]
    }),
    new PainCalc.Medication({
        Name: "Fentanyl IV",
        ConversionFactor: .25,
        Units: PainCalc.MedicationUnits.Mc,
        AvailableMultiples: 1,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths: [2.5]
    }),
    new PainCalc.Medication({
        Name: "Hydromorphone IV",
        ConversionFactor: 2,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 1,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths: [0.1]
    }),
    new PainCalc.Medication({
        Name: "Oxymorphone IV",
        ConversionFactor: 1.0,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 1,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths: [0.05]
    }),
    new PainCalc.Medication({
        Name: "Methadone IV",
        ConversionFactor: 1.0,
        Units: PainCalc.MedicationUnits.Mg,
        AvailableMultiples: 1,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths: [0.1]
    })
    ,
    new PainCalc.Medication({
        Name: "Sufentanil IV",
        ConversionFactor: 0.01,
        Units: PainCalc.MedicationUnits.Mc,
        AvailableMultiples: 1,
        TypicalDosesPerDay: 24,
        MedicationType: PainCalc.MedicationTypes.IV,
        AvailableStrengths: [1.0]
    })

    ];