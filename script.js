const billAmountUser = document.querySelector("#number");
const generateBtn = document.querySelector(".generate-btn");
const tipButtonContainer = document.querySelector(".button-tip");
const customAmount = document.querySelector(".custom-input-tip input");
const eachPersonDisplay = document.querySelector(".each-person");
const billAmountDisplay = document.querySelector(".bill-amount");
const tipAmountDisplay = document.querySelector(".tip-amount");
const resetBtn = document.querySelector(".reset-btn");

const numberPeopleContainer = document.querySelector(
  ".number-people-container input"
);
let discountAmount;
let totalAmount;
let finalAmount;
let discountAmountBtn = 0;

[...tipButtonContainer.children].forEach((tipBtn) => {
  tipBtn.addEventListener("click", () => {
    discountAmountBtn = parseFloat(tipBtn.innerText);
    customAmount.value = "";
  });
});

generateBtn.addEventListener("click", () => {
  console.log(discountAmountBtn);
  const billAmount = parseFloat(billAmountUser.value);
  const discountAmountUser = parseFloat(customAmount.value);
  const numOfPeople = parseFloat(numberPeopleContainer.value);
  if (isNaN(billAmount) || billAmount <= 0) {
    console.error("Please enter a valid bill amount greater than zero.");
    return;
  }
  if (discountAmountBtn) {
    discountAmount = prCalculation(discountAmountBtn, billAmount);
  } else {
    discountAmount = prCalculation(discountAmountUser, billAmount);
    customAmount.value = "";
  }

  console.log(discountAmount);
  totalAmount = billAmount + discountAmount;
  console.log(totalAmount);
  finalAmount = (billAmount + discountAmount) / numOfPeople;

  console.log(finalAmount);
  eachPersonDisplay.innerText = `₹ ${finalAmount}`;
  billAmountDisplay.innerText = `₹ ${totalAmount}`;
  tipAmountDisplay.innerText = `₹ ${discountAmount}`;
  resetBtn.disabled = false;
});

function prCalculation(value, totalValue) {
  if (totalValue === 0) {
    throw new Error("totalValue cannot be zero");
  }
  let disAmount = (value / 100) * totalValue;
  return disAmount;
}

billAmountUser.addEventListener("input", (e) => {
  if (e.target.value && e.target.value > 0) {
    [...tipButtonContainer.children].forEach((tipBtn) => {
      tipBtn.disabled = false;
    });
    customAmount.disabled = false;
    numberPeopleContainer.disabled = false;
  } else {
    [...tipButtonContainer.children].forEach((tipBtn) => {
      tipBtn.disabled = true;
    });
    customAmount.disabled = true;
    numberPeopleContainer.disabled = true;
    customAmount.value = "";
    numberPeopleContainer.value = "";
  }
});

numberPeopleContainer.addEventListener("input", (e) => {
  if (e.target.value) {
    generateBtn.disabled = false;
  } else {
    generateBtn.disabled = true;
  }
});
customAmount.addEventListener("input", (e) => {
  if (e.target.value) {
    discountAmountBtn = 0;
  }
});

resetBtn.addEventListener("click", () => {
  billAmountUser.value = "";
  eachPersonDisplay.innerText = "";
  billAmountDisplay.innerText = "";
  tipAmountDisplay.innerText = "";
  customAmount.value = "";
  numberPeopleContainer.value = "";
  [...tipButtonContainer.children].forEach((tipBtn) => {
    tipBtn.disabled = true;
  });
  customAmount.disabled = true;
  numberPeopleContainer.disabled = true;
  generateBtn.disabled = true;
  resetBtn.disabled = true;
});
