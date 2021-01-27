(function() {
    "use strict";

    let leftVal = "0";
    let rightVal = "0";
    let operation = undefined;

    function setDisplay(x, trim = false) {
        x = parseFloat(x);
        if (x % 1 != 0 && trim) {
            // Trim the decimal of trailing zeroes, and the dot too
            // if possbile. Source: https://stackoverflow.com/a/16471544.
            x = x.toPrecision(9).replace(/\.?0+$/, "");
        }

        let calcValue = document.getElementById("calculator-value");
        calcValue.innerHTML = x;
    }

    function setOperand(x) {
        return () => {
            if (operation) {
                rightVal += x;
                setDisplay(rightVal);
            } else {
                leftVal += x;
                setDisplay(leftVal);
            }
        }
    }

    function doOperation(op, display = false) {
        return () => {
            if (operation) {
                leftVal = operation(parseFloat(leftVal), parseFloat(rightVal));
                rightVal = "0";

                if (display) {
                    setDisplay(leftVal, true);
                }
            }
            operation = op;
        };
    }

    function init() {
        // Set on click handlers for number buttons
        let numButtons = Array.from(document.getElementsByClassName("btn-num"));
        numButtons.forEach((btn) => 
            btn.addEventListener("click", setOperand(btn.innerHTML)));

        // Set on click handler for decimal button
        let btnDecimal = document.getElementById("btn-decimal");
        btnDecimal.addEventListener("click", setOperand("."));

        // Set on click handlers for operation buttons
        let btnPlusEq = document.getElementById("btn-plus-eq");
        let btnMinus = document.getElementById("btn-minus");
        let btnTimes = document.getElementById("btn-times");
        let btnDivide = document.getElementById("btn-divide");
        btnPlusEq.addEventListener("click", doOperation((x, y) => x + y, true));
        btnMinus.addEventListener("click", doOperation((x, y) => x - y));
        btnTimes.addEventListener("click", doOperation((x, y) => x * y));
        btnDivide.addEventListener("click", doOperation((x, y) => x / y));

        // Set on click handlers for clear
        let btnClear = document.getElementById("btn-clear");
        btnClear.addEventListener("click", () => {
            leftVal = "0";
            rightVal = "0";
            operation = undefined;
            setDisplay(leftVal);
        });
    }

    window.addEventListener("load", init, false);
})()
