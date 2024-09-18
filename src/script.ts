// 0: foonts, 1: velik, 2: Zolot, 3: ocal, 4: kozal, 5: huskal
var purse = [0, 0, 0, 0, 0, 0];
var scale = [0, 0, 0, 0, 0, 0];
// show the scale view
function scaleView() {
  $("#scaleView").show();
  $("#purse-entry").hide();
}
// set the values in a purse
function updatePurse() {
  let f = Number($("#foonts-entry").val());
  let v = Number($("#velik-entry").val());
  let z = Number($("#zolot-entry").val());
  let o = Number($("#ocal-entry").val());
  let k = Number($("#kozal-entry").val());
  let h = Number($("#huskal-entry").val());

  // ensure values are numbers
  [f, v, z, o, k, h].forEach((value, index) => {
    if (isNaN(value)) {
      console.log("Value is type: ", typeof value);
      window.alert(`number: ${value} at index: ${index} is NaN`);
    }
  });

  // foonts
  purse[0] = f;
  $("#foonts").text(String("Foonts: " + f));
  // velik
  purse[1] = v;
  $("#velik").text(String("Velik: " + v));
  // zolot
  purse[2] = z;
  $("#zolot").text(String("Zolot: " + z));
  // ocal
  purse[3] = o;
  $("#ocal").text(String("Ocal: " + o));
  //kozal
  purse[4] = k;
  $("#kozal").text(String("Kozal: " + k));
  // Huskal
  purse[5] = h;
  $("#huskal").text(String("Huskal: " + h));

  scaleView();
}

function add(index: number, amount: number) {
  console.log("(index, amount)", index, amount);

  if (typeof amount !== "number") {
    console.log("amount not a number");
    return;
  }
  if (purse[index] < amount) {
    window.alert("You do not have that to give!");
    return;
  }
  if (amount < 0) {
    console.log("amount > 0");
    if (scale[index] + amount < 0) {
      window.alert("Scale does not have that");
      return;
    }
  }

  // remove the coin from purse
  purse[index] = purse[index] - amount;
  // add to scale
  scale[index] = scale[index] + amount;
  // update out
  updateOut();

  if (index == 0) {
    // purse
    let newStr = String("Foonts: " + purse[index]);
    $("#foonts").text(newStr);
    newStr = String(scale[index]);
    console.log($("foonts").text(`Foonts:, ${purse[index]}`));
    // scale
    $("#fscale").text(scale[index]);
  }
  if (index == 1) {
    // purse
    let newStr = String("Velik: " + purse[index]);
    $("#velik").text(newStr);
    newStr = String(scale[index]);
    // scale
    $("#vscale").text(scale[index]);
  }
  if (index == 2) {
    // purse
    let newStr = String("Zolot: " + purse[index]);
    $("#zolot").text(newStr);
    newStr = String(scale[index]);
    // scale
    $("#zscale").text(scale[index]);
  }
  if (index == 3) {
    // purse
    let newStr = String("Velik: " + purse[index]);
    $("#ocal").text(newStr);
    newStr = String(scale[index]);
    // scale
    $("#oscale").text(scale[index]);
  }
  if (index == 4) {
    // purse
    let newStr = String("Kozal: " + purse[index]);
    $("#kozal").text(newStr);
    newStr = String(scale[index]);
    // scale
    $("#kscale").text(scale[index]);
  }
  if (index == 5) {
    // purse
    let newStr = String("Huskal: " + purse[index]);
    $("#huskal").text(newStr);
    newStr = String(scale[index]);
    // scale
    $("#hscale").text(scale[index]);
  }

  console.log("scale(after): ", scale);
}

function min(index: number, amount: number) {
  add(index, -amount);
}

// add amount field val to scale
function addAmount(index: number, addition: boolean) {
  let maybe_amount = $("#amount").val();
  let amount = Number(maybe_amount);

  console.log("amount in entry: ", amount);
  if (addition) {
    add(index, amount);
  } else {
    amount = amount * -1;
    add(index, amount);
    console.log(purse);
  }
  updateOut();
}

// update Total Target Change table
function updateOut() {
  let f = scale[0];
  let v = scale[1];
  let z = scale[2];
  let o = scale[3];
  let k = scale[4];
  let h = scale[5];

  let total = `f: ${f} v: ${v} z: ${z} o: ${o} k: ${k} h: ${h}`;
  console.log(`Total ${total}`);
  let normalized: Number = f * 960 + v * 320 + z * 80 + o * 4 + k * 2 + h;
  $("#total").text(total);
  $("#normalized").text(String(normalized));
}
