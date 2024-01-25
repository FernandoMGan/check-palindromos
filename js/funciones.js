function checkCashRegister(price, cash, cid) {
    const unitValues = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
  
    let changeDue = cash - price;
    let changeArr = [];
  
    // Calcular el total en efectivo en la caja
    const totalInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);
  
    // Comparar el cambio debido con el total en la caja
    if (Number(totalInDrawer) < changeDue) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (Number(totalInDrawer) === changeDue) {
      return { status: "CLOSED", change: cid };
    } else {
      for (let i = cid.length - 1; i >= 0; i--) {
        const coinName = cid[i][0];
        const coinValue = unitValues[coinName];
        const availableCoins = cid[i][1];
        
        let returnedCoins = Math.min(Math.floor(changeDue / coinValue + 0.0001), availableCoins);
        let returnedAmount = (returnedCoins * coinValue).toFixed(2);
  
        if (returnedCoins > 0) {
          changeArr.push([coinName, parseFloat(returnedAmount)]);
          changeDue = (changeDue - parseFloat(returnedAmount)).toFixed(2);
  
        }
      }
    }
  
    // Verificar si se puede devolver el cambio exacto
    if (changeDue > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return { status: "OPEN", change: changeArr };
    }
  }
  

console.log(
    checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], 
    ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
);

// debe devolver { status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]] }