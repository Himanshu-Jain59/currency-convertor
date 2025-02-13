const base_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const cross = document.querySelector("#cross");
const dropdowns = document.querySelectorAll("#dropdown select");
const option = document.querySelectorAll("option");
const amount = document.querySelector("#Amount");
const fromCurr = document.querySelector("#from select");
const toCurr = document.querySelector("#to select");
const msg = document.querySelector(".msg");
const btn = document.querySelector("button");

for (let select of dropdowns) {
  for (curCode in countryList) {
    let newOption = document.createElement("option");
    // console.log(newOption);
    newOption.innerText = curCode;
    newOption.value = curCode;
    if (select.name == "from" && curCode == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && curCode == "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);

    // cross.addEventListener("click", () => {
    //   let from = toCurr.value;
    //   let to = fromCurr.value;
    // });
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = src;
};
const getExchangeRate = async () => {
  let amtVal = amount.value;
  let response = await fetch(
    `https://api.frankfurter.app/latest?amount=${amtVal}&from=${fromCurr.value}&to=${toCurr.value}`
  );
  let data = await response.json();
  let finalAmt = amtVal * data.rates[toCurr.value];
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

window.addEventListener("load", () => {
  getExchangeRate();
});

cross.addEventListener("click", () => {
  let from = toCurr.value;
  let to = fromCurr.value;

  fromCurr.value = from;
  toCurr.value = to;

  updateFlag(fromCurr);
  updateFlag(toCurr);
});

btn.addEventListener("click", () => {
  getExchangeRate();
});
