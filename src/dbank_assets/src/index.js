import { dbank } from "../../declarations/dbank";

const VALUE = document.getElementById("value");
const DEPOSIT = document.getElementById("input-amount");
const WITHDRAW = document.getElementById("withdrawal-amount");

window.addEventListener("load", async function () {
  update();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  
  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(DEPOSIT.value);
  const outputAmount = parseFloat(WITHDRAW.value);

  button.setAttribute("disabled", true);

  if (DEPOSIT.value.length != 0) await dbank.topUp(inputAmount);
  
  if (WITHDRAW.value.length != 0) await dbank.withdraw(outputAmount);

  await dbank.compound()
  
  update()

  DEPOSIT.value = "";
  WITHDRAW.value = "";
  
  button.removeAttribute("disabled");
});

async function update() {
  const currentAmount = await dbank.checkBalance();
  VALUE.innerText = Math.round(currentAmount * 100) / 100;
  // or currentAmount.toFixed(2);
};

