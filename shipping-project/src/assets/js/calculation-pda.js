$(function () {
  $("table tr").hide();
});

function generateProforma() {
  if (
    $(".input1").val() === "" ||
    $(".input2").val() === "" ||
    $(".input3").val() === ""
  ) {
    setTimeout(() => {
      alert("You need to provide the required vessel particulars.");
    }, 300);
  } else {
    calculateProforma();
  }
}

function calculateProforma() {
  let grossTonnage = document.getElementById("gross_tonnage").value;
  let lengthOverAll = document.getElementById("length_over_all").value;
  let hoursAtBerth = document.getElementById("hours_at_berth").value;
  let tanker = document.getElementById("tanker");
  let container = document.getElementById("container");
  let passenger = document.getElementById("passenger");
  let docking = document.getElementById("docking-repairs");
  let navy = document.getElementById("navy");
  let loading = document.getElementById("loading");
  let other = document.getElementById("other");
  let dgCargoIn = document.getElementById("dg-cargo-in");
  let dgCargoOut = document.getElementById("dg-cargo-out");
  let dgCargoInOut = document.getElementById("dg-cargo-in-out");
  let overtime = document.getElementById("overtime");

  if ($(loading).is(":selected")) {
    $(".cargo-verification").css("display", "table-row");
  }

  if ($(tanker).is(":selected")) {
    $(".vessel-tanker").css("display", "table-row");
  }

  $("table tr").each(function (index) {
    $(this)
      .delay(index * 70)
      .show(1000);
  });

  // ============================== VARNA EAST TABLE ============================== //

  let resultVeTonnageDues = document.getElementById("ve-result-tonnage-dues");
  let resultVeBerthDues = document.getElementById("ve-result-berth-dues");
  let resultVePilotageIn = document.getElementById("ve-result-pilotage-in");
  let resultVePilotageOut = document.getElementById("ve-result-pilotage-out");
  let resultVeTowageIn = document.getElementById("ve-result-towage-in");
  let resultVeTowageOut = document.getElementById("ve-result-towage-out");
  let resultVeMooring = document.getElementById("ve-result-mooring");
  let resultVeUnmooring = document.getElementById("ve-result-unmooring");
  let resultVeChannelDues = document.getElementById("ve-result-channel-dues");
  let resultVeLightDues = document.getElementById("ve-result-light-dues");
  let resultVeSailingPermission = document.getElementById(
    "ve-result-sailing-permission"
  );
  let resultVeMarpolFee = document.getElementById("ve-result-marpol-fee");
  let resultVeCargoPlan = document.getElementById("ve-cargo-plan-verification");
  let resultVeBooming = document.getElementById("ve-oilbooming");
  let resultVeTotalCost = document.getElementById("ve-result-total-cost");

  // ===============  Validation for input fields ================= //

  // ===============  Tonnage dues ================= //

  if ($(tanker).is(":selected")) {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0.5);
  } else if ($(container).is(":selected")) {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0.55 * 0.6);
  } else if ($(passenger).is(":selected")) {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0.55 * 0.4);
  } else if ($(navy).is(":selected")) {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0);
  } else if ($(docking).is(":selected")) {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0.05);
  } else {
    resultVeNumberTonnageDues = Math.round(grossTonnage * 0.55);
  }

  // =============== Berth dues ================= //

  if ($(docking).is(":selected")) {
    resultVeNumberBerthDues = Math.round(
      lengthOverAll * hoursAtBerth * 0.1 * 0.5 * 0
    );
  } else if ($(navy).is(":selected")) {
    resultVeNumberBerthDues = Math.round(
      lengthOverAll * hoursAtBerth * 0.1 * 0
    );
  } else {
    resultVeNumberBerthDues = Math.round(lengthOverAll * hoursAtBerth * 0.1);
  }

  // =============== Pilotage In dues ================= //

  if ($(passenger).is(":selected") && lengthOverAll <= 240) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190 * 0.9;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220 * 0.9;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250 * 0.9;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290 * 0.9;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320 * 0.9;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350 * 0.9;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390 * 0.9;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430 * 0.9;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460 * 0.9;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500 * 0.9;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = (500 + b * 60) * 0.9;
    }
  } else if ($(passenger).is(":selected") && lengthOverAll > 240) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190 * 0.8;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220 * 0.8;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250 * 0.8;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290 * 0.8;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320 * 0.8;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350 * 0.8;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390 * 0.8;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430 * 0.8;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460 * 0.8;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500 * 0.8;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = (500 + b * 60) * 0.8;
    }
  } else if ($(dgCargoIn).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = (500 + b * 60) * 1.2;
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190 * 1.5;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220 * 1.5;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250 * 1.5;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290 * 1.5;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320 * 1.5;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350 * 1.5;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390 * 1.5;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430 * 1.5;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460 * 1.5;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500 * 1.5;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = (500 + b * 60) * 1.5;
    }
  } else if ($(dgCargoInOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = (500 + b * 60) * 1.2;
    }
  } else {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageIn = 190;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageIn = 220;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageIn = 250;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageIn = 290;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageIn = 320;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageIn = 350;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageIn = 390;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageIn = 430;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageIn = 460;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageIn = 500;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageIn = 500 + b * 60;
    }
  }

  // =============== Pilotage Out dues ================= //

  if ($(passenger).is(":selected") && lengthOverAll <= 240) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190 * 0.9;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220 * 0.9;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250 * 0.9;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290 * 0.9;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320 * 0.9;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350 * 0.9;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390 * 0.9;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430 * 0.9;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460 * 0.9;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500 * 0.9;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = (500 + b * 60) * 0.9;
    }
  } else if ($(passenger).is(":selected") && lengthOverAll > 240) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190 * 0.8;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220 * 0.8;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250 * 0.8;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290 * 0.8;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320 * 0.8;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350 * 0.8;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390 * 0.8;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430 * 0.8;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460 * 0.8;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500 * 0.8;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = (500 + b * 60) * 0.8;
    }
  } else if ($(dgCargoOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = (500 + b * 60) * 1.2;
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190 * 1.5;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220 * 1.5;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250 * 1.5;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290 * 1.5;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320 * 1.5;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350 * 1.5;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390 * 1.5;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430 * 1.5;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460 * 1.5;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500 * 1.5;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = (500 + b * 60) * 1.5;
    }
  } else if ($(dgCargoInOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = (500 + b * 60) * 1.2;
    }
  } else {
    if (grossTonnage < 1000) {
      resultVeNumberPilotageOut = 190;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVeNumberPilotageOut = 220;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVeNumberPilotageOut = 250;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVeNumberPilotageOut = 290;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVeNumberPilotageOut = 320;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVeNumberPilotageOut = 350;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVeNumberPilotageOut = 390;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVeNumberPilotageOut = 430;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVeNumberPilotageOut = 460;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVeNumberPilotageOut = 500;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberPilotageOut = 500 + b * 60;
    }
  }

  // =============== Towage In dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 420 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 620 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 820 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 1020 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 1220 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 1420 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 1620 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 1820 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 2020 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 2220 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (2200 + d * 55) * 0.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 840 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1240 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 1640 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 2040 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 2440 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 2840 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 3240 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 3640 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 4040 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 4440 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (4440 + d * 110) * 0.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 1260 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1860 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 2460 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 3060 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 3660 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 4260 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 4860 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 5460 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 6060 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 6660 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (6660 + d * 165) * 0.5;
      }
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 420 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 620 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 820 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 1020 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 1220 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 1420 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 1620 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 1820 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 2020 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 2220 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (2200 + d * 55) * 1.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 840 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1240 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 1640 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 2040 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 2440 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 2840 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 3240 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 3640 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 4040 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 4440 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (4440 + d * 110) * 1.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 1260 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1860 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 2460 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 3060 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 3660 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 4260 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 4860 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 5460 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 6060 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 6660 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = (6660 + d * 165) * 1.5;
      }
    }
  } else {
    if (grossTonnage <= 1000) {
      resultVeNumberTowageIn = 420;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVeNumberTowageIn = 620;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberTowageIn = 820;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVeNumberTowageIn = 1020;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVeNumberTowageIn = 1220;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVeNumberTowageIn = 1420;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVeNumberTowageIn = 1620;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVeNumberTowageIn = 1820;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVeNumberTowageIn = 2020;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVeNumberTowageIn = 2220;
    }
    if (grossTonnage > 10000) {
      const c = grossTonnage - 10000;
      const d = Math.ceil(c / 1000);
      resultVeNumberTowageIn = 2200 + d * 55;
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 840;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1240;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 1640;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 2040;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 2440;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 2840;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 3240;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 3640;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 4040;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 4440;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = 4440 + d * 110;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageIn = 1260;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageIn = 1860;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageIn = 2460;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageIn = 3060;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageIn = 3660;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageIn = 4260;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageIn = 4860;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageIn = 5460;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageIn = 6060;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageIn = 6660;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageIn = 6660 + d * 165;
      }
    }
  }

  // =============== Towage Out dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 420 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 620 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 820 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 1020 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 1220 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 1420 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 1620 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 1820 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 2020 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 2220 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (2200 + d * 55) * 0.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 840 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1240 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 1640 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 2040 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 2440 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 2840 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 3240 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 3640 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 4040 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 4440 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (4440 + d * 110) * 0.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 1260 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1860 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 2460 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 3060 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 3660 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 4260 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 4860 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 5460 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 6060 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 6660 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (6660 + d * 165) * 0.5;
      }
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 420 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 620 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 820 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 1020 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 1220 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 1420 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 1620 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 1820 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 2020 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 2220 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (2200 + d * 55) * 1.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 840 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1240 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 1640 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 2040 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 2440 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 2840 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 3240 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 3640 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 4040 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 4440 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (4440 + d * 110) * 1.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 1260 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1860 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 2460 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 3060 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 3660 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 4260 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 4860 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 5460 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 6060 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 6660 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = (6660 + d * 165) * 1.5;
      }
    }
  } else {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 420;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 620;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 820;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 1020;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 1220;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 1420;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 1620;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 1820;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 2020;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 2220;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = 2200 + d * 55;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 840;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1240;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 1640;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 2040;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 2440;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 2840;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 3240;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 3640;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 4040;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 4440;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = 4440 + d * 110;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVeNumberTowageOut = 1260;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVeNumberTowageOut = 1860;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVeNumberTowageOut = 2460;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVeNumberTowageOut = 3060;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVeNumberTowageOut = 3660;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVeNumberTowageOut = 4260;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVeNumberTowageOut = 4860;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVeNumberTowageOut = 5460;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVeNumberTowageOut = 6060;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVeNumberTowageOut = 6660;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVeNumberTowageOut = 6660 + d * 165;
      }
    }
  }

  // =============== Mooring dues ================= //

  if ($(docking).is(":selected")) {
    resultVeNumberMooring = 0;
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage <= 1000) {
      resultVeNumberMooring = 60 * 1.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVeNumberMooring = 90 * 1.5;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberMooring = 120 * 1.5;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVeNumberMooring = 140 * 1.5;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVeNumberMooring = 160 * 1.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVeNumberMooring = 180 * 1.5;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVeNumberMooring = 200 * 1.5;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVeNumberMooring = 220 * 1.5;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVeNumberMooring = 230 * 1.5;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVeNumberMooring = 240 * 1.5;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberMooring = (240 + b * 35) * 1.5;
    }
  } else {
    if (grossTonnage <= 1000) {
      resultVeNumberMooring = 60;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVeNumberMooring = 90;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberMooring = 120;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVeNumberMooring = 140;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVeNumberMooring = 160;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVeNumberMooring = 180;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVeNumberMooring = 200;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVeNumberMooring = 220;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVeNumberMooring = 230;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVeNumberMooring = 240;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberMooring = 240 + b * 35;
    }
  }

  // =============== Unmooring dues ================= //

  if ($(docking).is(":selected")) {
    resultVeNumberUnmooring = 0;
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage <= 1000) {
      resultVeNumberUnmooring = 60 * 1.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVeNumberUnmooring = 90 * 1.5;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberUnmooring = 120 * 1.5;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVeNumberUnmooring = 140 * 1.5;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVeNumberUnmooring = 160 * 1.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVeNumberUnmooring = 180 * 1.5;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVeNumberUnmooring = 200 * 1.5;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVeNumberUnmooring = 220 * 1.5;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVeNumberUnmooring = 230 * 1.5;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVeNumberUnmooring = 240 * 1.5;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberUnmooring = (240 + b * 35) * 1.5;
    }
  } else {
    if (grossTonnage <= 1000) {
      resultVeNumberUnmooring = 60;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVeNumberUnmooring = 90;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberUnmooring = 120;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVeNumberUnmooring = 140;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVeNumberUnmooring = 160;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVeNumberUnmooring = 180;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVeNumberUnmooring = 200;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVeNumberUnmooring = 220;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVeNumberUnmooring = 230;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVeNumberUnmooring = 240;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVeNumberUnmooring = 240 + b * 35;
    }
  }

  // =============== Channel dues ================= //

  if ($(container).is(":selected")) {
    resultVeNumberChannelDues = Math.round(grossTonnage * 0.04 * 0.25);
  } else if ($(passenger).is(":selected")) {
    resultVeNumberChannelDues = Math.round(grossTonnage * 0.04 * 0.5);
  } else if ($(navy).is(":selected")) {
    resultVeNumberChannelDues = Math.round(grossTonnage * 0.04 * 0);
  } else {
    resultVeNumberChannelDues = Math.round(grossTonnage * 0.04);
  }

  // =============== Light dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage <= 10) {
      resultVeNumberLightDues = 5 * 0.5;
    }
    if (grossTonnage > 10 && grossTonnage <= 40) {
      resultVeNumberLightDues = 10 * 0.5;
    }
    if (grossTonnage > 40 && grossTonnage <= 500) {
      resultVeNumberLightDues = 15 * 0.5;
    }
    if (grossTonnage > 500 && grossTonnage <= 1000) {
      resultVeNumberLightDues = 40 * 0.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 5000) {
      resultVeNumberLightDues = 70 * 0.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 10000) {
      resultVeNumberLightDues = 110 * 0.5;
    }
    if (grossTonnage > 10000) {
      resultVeNumberLightDues = 150 * 0.5;
    }
  } else if ($(navy).is(":selected")) {
    resultVeNumberLightDues = 0;
  } else {
    if (grossTonnage <= 10) {
      resultVeNumberLightDues = 5;
    }
    if (grossTonnage > 10 && grossTonnage <= 40) {
      resultVeNumberLightDues = 10;
    }
    if (grossTonnage > 40 && grossTonnage <= 500) {
      resultVeNumberLightDues = 15;
    }
    if (grossTonnage > 500 && grossTonnage <= 1000) {
      resultVeNumberLightDues = 40;
    }
    if (grossTonnage > 1000 && grossTonnage <= 5000) {
      resultVeNumberLightDues = 70;
    }
    if (grossTonnage > 5000 && grossTonnage <= 10000) {
      resultVeNumberLightDues = 110;
    }
    if (grossTonnage > 10000) {
      resultVeNumberLightDues = 150;
    }
  }

  // =============== Sailing permission dues ================= //

  if ($(navy).is(":selected")) {
    resultVeNumberSailingPermission = 0;
  } else {
    resultVeNumberSailingPermission = 50;
  }

  // =============== Garbage/Marpol dues ================= //

  if ($(docking).is(":selected")) {
    resultVeNumberMarpolFee = 0;
  } else {
    if (grossTonnage <= 2000) {
      resultVeNumberMarpolFee = 65;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVeNumberMarpolFee = 160;
    }
    if (grossTonnage > 3000 && grossTonnage <= 6000) {
      resultVeNumberMarpolFee = 210;
    }
    if (grossTonnage > 6000 && grossTonnage <= 10000) {
      resultVeNumberMarpolFee = 305;
    }
    if (grossTonnage > 10000 && grossTonnage <= 20000) {
      resultVeNumberMarpolFee = 365;
    }
    if (grossTonnage > 20000 && grossTonnage <= 30000) {
      resultVeNumberMarpolFee = 460;
    }
    if (grossTonnage > 30000 && grossTonnage <= 40000) {
      resultVeNumberMarpolFee = 735;
    }
    if (grossTonnage > 40000 && grossTonnage <= 50000) {
      resultVeNumberMarpolFee = 1140;
    }
    if (grossTonnage > 50000) {
      resultVeNumberMarpolFee = 1500;
    }
  }

  // =============== Gargo plan dues ================= //

  if ($(loading).is(":selected") && $(container).is(":selected")) {
    resultVeNumberCargoPlan = 50;
  } else if ($(loading).is(":selected") && $(other).is(":selected")) {
    resultVeNumberCargoPlan = 500;
  } else {
    resultVeNumberCargoPlan = 0;
  }

  // =============== Booming dues ================= //

  resultVeNumberBooming = Math.round(
    100 + lengthOverAll * 2.5 * 0.15 * hoursAtBerth
  );

  // =============== Final calculations Varna East ================= //

  resultVeTonnageDues.innerHTML = resultVeNumberTonnageDues;
  resultVeBerthDues.innerHTML = resultVeNumberBerthDues;
  resultVePilotageIn.innerHTML = resultVeNumberPilotageIn;
  resultVePilotageOut.innerHTML = resultVeNumberPilotageOut;
  resultVeTowageIn.innerHTML = resultVeNumberTowageIn;
  resultVeTowageOut.innerHTML = resultVeNumberTowageOut;
  resultVeMooring.innerHTML = resultVeNumberMooring;
  resultVeUnmooring.innerHTML = resultVeNumberUnmooring;
  resultVeChannelDues.innerHTML = resultVeNumberChannelDues;
  resultVeLightDues.innerHTML = resultVeNumberLightDues;
  resultVeSailingPermission.innerHTML = resultVeNumberSailingPermission;
  resultVeMarpolFee.innerHTML = resultVeNumberMarpolFee;
  resultVeCargoPlan.innerHTML = resultVeNumberCargoPlan;
  resultVeBooming.innerHTML = resultVeNumberBooming;

  resultVeTotalCost.innerHTML = Math.round(
    resultVeNumberTonnageDues +
      resultVeNumberBerthDues +
      resultVeNumberPilotageIn +
      resultVeNumberPilotageOut +
      resultVeNumberTowageIn +
      resultVeNumberTowageOut +
      resultVeNumberMooring +
      resultVeNumberUnmooring +
      resultVeNumberChannelDues +
      resultVeNumberLightDues +
      resultVeNumberSailingPermission +
      resultVeNumberMarpolFee +
      resultVeNumberCargoPlan
  );

  // ============================== VARNA WEST TABLE ============================== //

  let resultVwTonnageDues = document.getElementById("vw-result-tonnage-dues");
  let resultVwBerthDues = document.getElementById("vw-result-berth-dues");
  let resultVwPilotageIn = document.getElementById("vw-result-pilotage-in");
  let resultVwPilotageOut = document.getElementById("vw-result-pilotage-out");
  let resultVwTowageIn = document.getElementById("vw-result-towage-in");
  let resultVwTowageOut = document.getElementById("vw-result-towage-out");
  let resultVwMooring = document.getElementById("vw-result-mooring");
  let resultVwUnmooring = document.getElementById("vw-result-unmooring");
  let resultVwChannelDues = document.getElementById("vw-result-channel-dues");
  let resultVwLightDues = document.getElementById("vw-result-light-dues");
  let resultVwSailingPermission = document.getElementById(
    "vw-result-sailing-permission"
  );
  let resultVwMarpolFee = document.getElementById("vw-result-marpol-fee");
  let resultVwCargoPlan = document.getElementById("vw-cargo-plan-verification");
  let resultVwBooming = document.getElementById("vw-oilbooming");
  let resultVwTotalCost = document.getElementById("vw-result-total-cost");

  // =============== Tonnage dues ================= //

  if ($(tanker).is(":selected")) {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0.5);
  } else if ($(container).is(":selected")) {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0.4 * 0.6);
  } else if ($(passenger).is(":selected")) {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0.4 * 0.4);
  } else if ($(navy).is(":selected")) {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0);
  } else if ($(docking).is(":selected")) {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0.05);
  } else {
    resultVwNumberTonnageDues = Math.round(grossTonnage * 0.4);
  }

  // =============== Berth dues ================= //

  if ($(docking).is(":selected")) {
    resultVwNumberBerthDues = Math.round(
      lengthOverAll * hoursAtBerth * 0.1 * 0.5 * 0
    );
  } else if ($(navy).is(":selected")) {
    resultVwNumberBerthDues = Math.round(lengthOverAll * hoursAtBerth * 0);
  } else {
    resultVwNumberBerthDues = Math.round(lengthOverAll * hoursAtBerth * 0.1);
  }

  // =============== Pilotage In dues ================= //

  if ($(passenger).is(":selected") && lengthOverAll <= 240) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400 * 0.9;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450 * 0.9;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520 * 0.9;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570 * 0.9;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640 * 0.9;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690 * 0.9;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760 * 0.9;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810 * 0.9;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870 * 0.9;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940 * 0.9;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = (940 + b * 80) * 0.9;
    }
  } else if ($(passenger).is(":selected") && lengthOverAll > 240) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400 * 0.8;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450 * 0.8;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520 * 0.8;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570 * 0.8;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640 * 0.8;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690 * 0.8;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760 * 0.8;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810 * 0.8;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870 * 0.8;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940 * 0.8;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = (940 + b * 80) * 0.8;
    }
  } else if ($(dgCargoIn).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = (940 + b * 80) * 1.2;
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400 * 1.5;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450 * 1.5;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520 * 1.5;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570 * 1.5;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640 * 1.5;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690 * 1.5;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760 * 1.5;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810 * 1.5;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870 * 1.5;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940 * 1.5;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = (940 + b * 80) * 1.5;
    }
  } else if ($(dgCargoInOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = (940 + b * 80) * 1.2;
    }
  } else {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageIn = 400;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageIn = 450;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageIn = 520;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageIn = 570;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageIn = 640;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageIn = 690;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageIn = 760;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageIn = 810;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageIn = 870;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageIn = 940;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageIn = 940 + b * 80;
    }
  }

  // =============== Pilotage Out dues ================= //

  if ($(passenger).is(":selected") && lengthOverAll <= 240) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400 * 0.9;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450 * 0.9;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520 * 0.9;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570 * 0.9;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640 * 0.9;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690 * 0.9;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760 * 0.9;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810 * 0.9;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870 * 0.9;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940 * 0.9;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = (940 + b * 80) * 0.9;
    }
  } else if ($(passenger).is(":selected") && lengthOverAll > 240) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400 * 0.8;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450 * 0.8;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520 * 0.8;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570 * 0.8;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640 * 0.8;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690 * 0.8;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760 * 0.8;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810 * 0.8;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870 * 0.8;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940 * 0.8;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = (940 + b * 80) * 0.8;
    }
  } else if ($(dgCargoOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = (940 + b * 80) * 1.2;
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400 * 1.5;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450 * 1.5;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520 * 1.5;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570 * 1.5;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640 * 1.5;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690 * 1.5;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760 * 1.5;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810 * 1.5;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870 * 1.5;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940 * 1.5;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = (940 + b * 80) * 1.5;
    }
  } else if ($(dgCargoInOut).is(":selected")) {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400 * 1.2;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450 * 1.2;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520 * 1.2;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570 * 1.2;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640 * 1.2;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690 * 1.2;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760 * 1.2;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810 * 1.2;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870 * 1.2;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940 * 1.2;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = (940 + b * 80) * 1.2;
    }
  } else {
    if (grossTonnage < 1000) {
      resultVwNumberPilotageOut = 400;
    }
    if (grossTonnage >= 1000 && grossTonnage < 2000) {
      resultVwNumberPilotageOut = 450;
    }
    if (grossTonnage >= 2000 && grossTonnage < 3000) {
      resultVwNumberPilotageOut = 520;
    }
    if (grossTonnage >= 3000 && grossTonnage < 4000) {
      resultVwNumberPilotageOut = 570;
    }
    if (grossTonnage >= 4000 && grossTonnage < 5000) {
      resultVwNumberPilotageOut = 640;
    }
    if (grossTonnage >= 5000 && grossTonnage < 6000) {
      resultVwNumberPilotageOut = 690;
    }
    if (grossTonnage >= 6000 && grossTonnage < 7000) {
      resultVwNumberPilotageOut = 760;
    }
    if (grossTonnage >= 7000 && grossTonnage < 8000) {
      resultVwNumberPilotageOut = 810;
    }
    if (grossTonnage >= 8000 && grossTonnage < 9000) {
      resultVwNumberPilotageOut = 870;
    }
    if (grossTonnage >= 9000 && grossTonnage < 10000) {
      resultVwNumberPilotageOut = 940;
    }
    if (grossTonnage >= 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberPilotageOut = 940 + b * 80;
    }
  }

  // =============== Towage In dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 540 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 800 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 1060 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 1320 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 1580 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 1840 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 2100 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 2360 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 2620 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 2880 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (2880 + d * 65) * 0.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1080 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 1600 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 2120 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 2640 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 3160 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 3680 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 4200 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 4720 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 5240 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 5760 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (5760 + d * 130) * 0.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1620 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 2400 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 3180 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 3960 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 4740 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 5520 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 6300 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 7080 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 7860 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 8640 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (8640 + d * 195) * 0.5;
      }
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 540 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 800 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 1060 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 1320 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 1580 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 1840 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 2100 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 2360 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 2620 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 2880 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (2880 + d * 65) * 1.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1080 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 1600 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 2120 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 2640 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 3160 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 3680 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 4200 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 4720 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 5240 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 5760 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (5760 + d * 130) * 1.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1620 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 2400 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 3180 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 3960 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 4740 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 5520 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 6300 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 7080 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 7860 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 8640 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = (8640 + d * 195) * 1.5;
      }
    }
  } else {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 540;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 800;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 1060;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 1320;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 1580;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 1840;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 2100;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 2360;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 26205;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 2880;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = 2880 + d * 65;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1080;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 1600;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 2120;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 2640;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 3160;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 3680;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 4200;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 4720;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 5240;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 5760;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = 5760 + d * 130;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageIn = 1620;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageIn = 2400;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageIn = 3180;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageIn = 3960;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageIn = 4740;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageIn = 5520;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageIn = 6300;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageIn = 7080;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageIn = 7860;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageIn = 8640;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageIn = 8640 + d * 195;
      }
    }
  }

  // =============== Towage Out dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 540 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 800 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 1060 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 1320 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 1580 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 1840 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 2100 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 2360 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 2620 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 2880 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (2880 + d * 65) * 0.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1080 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 1600 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 2120 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 2640 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 3160 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 3680 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 4200 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 4720 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 5240 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 5760 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (5760 + d * 130) * 0.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1620 * 0.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 2400 * 0.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 3180 * 0.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 3960 * 0.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 4740 * 0.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 5520 * 0.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 6300 * 0.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 7080 * 0.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 7860 * 0.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 8640 * 0.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (8640 + d * 195) * 0.5;
      }
    }
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 540 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 800 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 1060 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 1320 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 1580 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 1840 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 2100 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 2360 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 2620 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 2880 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (2880 + d * 65) * 1.5;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1080 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 1600 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 2120 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 2640 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 3160 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 3680 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 4200 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 4720 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 5240 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 5760 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (5760 + d * 130) * 1.5;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1620 * 1.5;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 2400 * 1.5;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 3180 * 1.5;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 3960 * 1.5;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 4740 * 1.5;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 5520 * 1.5;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 6300 * 1.5;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 7080 * 1.5;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 7860 * 1.5;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 8640 * 1.5;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = (8640 + d * 195) * 1.5;
      }
    }
  } else {
    if (grossTonnage >= 1000 && grossTonnage <= 4500) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 540;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 800;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 1060;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 1320;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 1580;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 1840;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 2100;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 2360;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 2620;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 2880;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = 2880 + d * 65;
      }
    }
    if (grossTonnage > 4500 && grossTonnage <= 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1080;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 1600;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 2120;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 2640;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 3160;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 3680;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 4200;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 4720;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 5240;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 5760;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = 5760 + d * 130;
      }
    }
    if (grossTonnage > 18000) {
      if (grossTonnage <= 1000) {
        resultVwNumberTowageOut = 1620;
      }
      if (grossTonnage > 1000 && grossTonnage <= 2000) {
        resultVwNumberTowageOut = 2400;
      }
      if (grossTonnage > 2000 && grossTonnage <= 3000) {
        resultVwNumberTowageOut = 3180;
      }
      if (grossTonnage > 3000 && grossTonnage <= 4000) {
        resultVwNumberTowageOut = 3960;
      }
      if (grossTonnage > 4000 && grossTonnage <= 5000) {
        resultVwNumberTowageOut = 4740;
      }
      if (grossTonnage > 5000 && grossTonnage <= 6000) {
        resultVwNumberTowageOut = 5520;
      }
      if (grossTonnage > 6000 && grossTonnage <= 7000) {
        resultVwNumberTowageOut = 6300;
      }
      if (grossTonnage > 7000 && grossTonnage <= 8000) {
        resultVwNumberTowageOut = 7080;
      }
      if (grossTonnage > 8000 && grossTonnage <= 9000) {
        resultVwNumberTowageOut = 7860;
      }
      if (grossTonnage > 9000 && grossTonnage <= 10000) {
        resultVwNumberTowageOut = 8640;
      }
      if (grossTonnage > 10000) {
        const c = grossTonnage - 10000;
        const d = Math.ceil(c / 1000);
        resultVwNumberTowageOut = 8640 + d * 195;
      }
    }
  }

  // =============== Mooring dues ================= //

  if ($(docking).is(":selected")) {
    resultVwNumberMooring = 0;
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage <= 1000) {
      resultVwNumberMooring = 60 * 1.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVwNumberMooring = 90 * 1.5;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVwNumberMooring = 120 * 1.5;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVwNumberMooring = 140 * 1.5;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVwNumberMooring = 160 * 1.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVwNumberMooring = 180 * 1.5;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVwNumberMooring = 200 * 1.5;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVwNumberMooring = 220 * 1.5;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVwNumberMooring = 230 * 1.5;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVwNumberMooring = 240 * 1.5;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberMooring = (240 + b * 35) * 1.5;
    }
  } else {
    if (grossTonnage <= 1000) {
      resultVwNumberMooring = 60;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVwNumberMooring = 90;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVwNumberMooring = 120;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVwNumberMooring = 140;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVwNumberMooring = 160;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVwNumberMooring = 180;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVwNumberMooring = 200;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVwNumberMooring = 220;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVwNumberMooring = 230;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVwNumberMooring = 240;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberMooring = 240 + b * 35;
    }
  }

  // =============== Unmooring dues ================= //

  if ($(docking).is(":selected")) {
    resultVwNumberUnmooring = 0;
  } else if ($(overtime).is(":selected")) {
    if (grossTonnage <= 1000) {
      resultVwNumberUnmooring = 60 * 1.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVwNumberUnmooring = 90 * 1.5;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVwNumberUnmooring = 120 * 1.5;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVwNumberUnmooring = 140 * 1.5;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVwNumberUnmooring = 160 * 1.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVwNumberUnmooring = 180 * 1.5;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVwNumberUnmooring = 200 * 1.5;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVwNumberUnmooring = 220 * 1.5;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVwNumberUnmooring = 230 * 1.5;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVwNumberUnmooring = 240 * 1.5;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberUnmooring = (240 + b * 35) * 1.5;
    }
  } else {
    if (grossTonnage <= 1000) {
      resultVwNumberUnmooring = 60;
    }
    if (grossTonnage > 1000 && grossTonnage <= 2000) {
      resultVwNumberUnmooring = 90;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVwNumberUnmooring = 120;
    }
    if (grossTonnage > 3000 && grossTonnage <= 4000) {
      resultVwNumberUnmooring = 140;
    }
    if (grossTonnage > 4000 && grossTonnage <= 5000) {
      resultVwNumberUnmooring = 160;
    }
    if (grossTonnage > 5000 && grossTonnage <= 6000) {
      resultVwNumberUnmooring = 180;
    }
    if (grossTonnage > 6000 && grossTonnage <= 7000) {
      resultVwNumberUnmooring = 200;
    }
    if (grossTonnage > 7000 && grossTonnage <= 8000) {
      resultVwNumberUnmooring = 220;
    }
    if (grossTonnage > 8000 && grossTonnage <= 9000) {
      resultVwNumberUnmooring = 230;
    }
    if (grossTonnage > 9000 && grossTonnage <= 10000) {
      resultVwNumberUnmooring = 240;
    }
    if (grossTonnage > 10000) {
      const a = grossTonnage - 10000;
      const b = Math.ceil(a / 1000);
      resultVwNumberUnmooring = 240 + b * 35;
    }
  }

  // =============== Channel dues ================= //

  if ($(container).is(":selected")) {
    resultVwNumberChannelDues = Math.round(grossTonnage * 0.13 * 0.74);
  } else if ($(passenger).is(":selected")) {
    resultVwNumberChannelDues = Math.round(grossTonnage * 0.13 * 0.5);
  } else if ($(navy).is(":selected")) {
    resultVwNumberChannelDues = Math.round(grossTonnage * 0.13 * 0);
  } else {
    resultVwNumberChannelDues = Math.round(grossTonnage * 0.13);
  }

  // =============== light dues ================= //

  if ($(passenger).is(":selected")) {
    if (grossTonnage <= 10) {
      resultVwNumberLightDues = 5 * 0.5;
    }
    if (grossTonnage > 10 && grossTonnage <= 40) {
      resultVwNumberLightDues = 10 * 0.5;
    }
    if (grossTonnage > 40 && grossTonnage <= 500) {
      resultVwNumberLightDues = 15 * 0.5;
    }
    if (grossTonnage > 500 && grossTonnage <= 1000) {
      resultVwNumberLightDues = 40 * 0.5;
    }
    if (grossTonnage > 1000 && grossTonnage <= 5000) {
      resultVwNumberLightDues = 70 * 0.5;
    }
    if (grossTonnage > 5000 && grossTonnage <= 10000) {
      resultVwNumberLightDues = 110 * 0.5;
    }
    if (grossTonnage > 10000) {
      resultVwNumberLightDues = 150 * 0.5;
    }
  } else if ($(navy).is(":selected")) {
    resultVwNumberLightDues = 0;
  } else {
    if (grossTonnage <= 10) {
      resultVwNumberLightDues = 5;
    }
    if (grossTonnage > 10 && grossTonnage <= 40) {
      resultVwNumberLightDues = 10;
    }
    if (grossTonnage > 40 && grossTonnage <= 500) {
      resultVwNumberLightDues = 15;
    }
    if (grossTonnage > 500 && grossTonnage <= 1000) {
      resultVwNumberLightDues = 40;
    }
    if (grossTonnage > 1000 && grossTonnage <= 5000) {
      resultVwNumberLightDues = 70;
    }
    if (grossTonnage > 5000 && grossTonnage <= 10000) {
      resultVwNumberLightDues = 110;
    }
    if (grossTonnage > 10000) {
      resultVwNumberLightDues = 150;
    }
  }

  // =============== Sailing permission dues ================= //

  if ($(navy).is(":selected")) {
    resultVwNumberSailingPermission = 0;
  } else {
    resultVwNumberSailingPermission = 50;
  }

  // =============== Garbage/Marpol dues ================= //

  if ($(docking).is(":selected")) {
    resultVwNumberMarpolFee = 0;
  } else {
    if (grossTonnage <= 2000) {
      resultVwNumberMarpolFee = 65;
    }
    if (grossTonnage > 2000 && grossTonnage <= 3000) {
      resultVwNumberMarpolFee = 160;
    }
    if (grossTonnage > 3000 && grossTonnage <= 6000) {
      resultVwNumberMarpolFee = 210;
    }
    if (grossTonnage > 6000 && grossTonnage <= 10000) {
      resultVwNumberMarpolFee = 305;
    }
    if (grossTonnage > 10000 && grossTonnage <= 20000) {
      resultVwNumberMarpolFee = 365;
    }
    if (grossTonnage > 20000 && grossTonnage <= 30000) {
      resultVwNumberMarpolFee = 460;
    }
    if (grossTonnage > 30000 && grossTonnage <= 40000) {
      resultVwNumberMarpolFee = 735;
    }
    if (grossTonnage > 40000 && grossTonnage <= 50000) {
      resultVwNumberMarpolFee = 1140;
    }
    if (grossTonnage > 50000) {
      resultVwNumberMarpolFee = 1500;
    }
  }

  // =============== Gargo plan dues ================= //

  if ($(loading).is(":selected") && $(container).is(":selected")) {
    resultVwNumberCargoPlan = 50;
  } else if ($(loading).is(":selected") && $(other).is(":selected")) {
    resultVwNumberCargoPlan = 500;
  } else {
    resultVwNumberCargoPlan = 0;
  }
  // =============== Booming dues ================= //

  resultVwNumberBooming = Math.round(
    100 + lengthOverAll * 2.5 * 0.15 * hoursAtBerth
  );

  // =============== Final calculations Varna West ================= //

  resultVwTonnageDues.innerHTML = resultVwNumberTonnageDues;
  resultVwBerthDues.innerHTML = resultVwNumberBerthDues;
  resultVwPilotageIn.innerHTML = resultVwNumberPilotageIn;
  resultVwPilotageOut.innerHTML = resultVwNumberPilotageOut;
  resultVwTowageIn.innerHTML = resultVwNumberTowageIn;
  resultVwTowageOut.innerHTML = resultVwNumberTowageOut;
  resultVwMooring.innerHTML = resultVwNumberMooring;
  resultVwUnmooring.innerHTML = resultVwNumberUnmooring;
  resultVwChannelDues.innerHTML = resultVwNumberChannelDues;
  resultVwLightDues.innerHTML = resultVwNumberLightDues;
  resultVwSailingPermission.innerHTML = resultVwNumberSailingPermission;
  resultVwMarpolFee.innerHTML = resultVwNumberMarpolFee;
  resultVwCargoPlan.innerHTML = resultVwNumberCargoPlan;
  resultVwBooming.innerHTML = resultVwNumberBooming;
  resultVwTotalCost.innerHTML =
    resultVwNumberTonnageDues +
    resultVwNumberBerthDues +
    resultVwNumberPilotageIn +
    resultVwNumberPilotageOut +
    resultVwNumberTowageIn +
    resultVwNumberTowageOut +
    resultVwNumberMooring +
    resultVwNumberUnmooring +
    resultVwNumberChannelDues +
    resultVwNumberLightDues +
    resultVwNumberSailingPermission +
    resultVwNumberMarpolFee +
    resultVwNumberCargoPlan;

  const proformaEntry = {
    grossTonnage,
    lengthOverAll,
    hoursAtBerth,
    resultVeTotalCost,
    resultVwTotalCost,
  };
}
