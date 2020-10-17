class Calculator {
	constructor(displayValue) {
		this.resetFlag = false;
		this.displayValue = displayValue;
		this.allClear();
	}

	allClear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
		this.updateDisplay();
	}

	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) {
			return;
		}
		this.currentOperand += number;
	}
	
	updateDisplay() {
		if (this.currentOperand !== '') {
			this.displayValue.value = this.currentOperand;
		} else {
			this.displayValue.value = '0';
		}
		
	}

	setOperation(operator) {
		if (this.currentOperand === '') {
			return;
		}
		if (this.previousOperand !== '') {
			this.operate();
		}
		this.operation = operator;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	operate() {
		let result = 0;
		let operator = this.operation;
		let valOne = parseFloat(this.previousOperand);
		let valTwo = parseFloat(this.currentOperand);

		if (isNaN(valOne) || isNaN(valTwo)) {
			return;
		}

		switch (operator) {
			case "+": 
				result = add(valOne, valTwo);
				break;
			case "-":
				result = subtract(valOne, valTwo);
				break;
			case "*":
				result = multiply(valOne, valTwo);
				break;
			case "/":
				result = divide(valOne, valTwo);
				break;
			default:
				return;
		}
		this.currentOperand = result;
		this.previousOperand = '';
		this.operation = undefined;
		this.updateDisplay();
		console.log("Previous " + this.previousOperand + " Current " + this.currentOperand);
	}

	test() {
		console.log("Previous: " + this.previousOperand);
		console.log("Current: " + this.currentOperand);
	}
}

//Select buttons
const display = document.querySelector('input[class="display"]');
const numberButton = document.querySelectorAll('.numberButton');
const decimalButton = document.querySelector('[data-decimal]')
const clearButton = document.querySelector('[data-clear]');
const operationButton = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');

//Math functions
function add (x, y) {
	return x + y;
}

function subtract (x, y) {
	return x - y;
}

function multiply (x, y) {
	return x * y;
}

function divide (numerator, denominator) {
	if (denominator === 0) {
		alert("Cannot divide by zero ya dingus");
		calculator.allClear();
		return '';
	}
	return numerator / denominator;
}

//Create calculator object
const calculator = new Calculator(display);


//Add Click listeners for buttons
numberButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.value);
		calculator.updateDisplay();
	});
});

decimalButton.addEventListener('click', () => {
	if (calculator.currentOperand == '') {
		calculator.appendNumber('0');
		calculator.appendNumber('.');
	}
	else if (calculator.currentOperand != '.') {
		calculator.appendNumber('.');

	}
});

clearButton.addEventListener('click', () => {
	calculator.allClear();
});

operationButton.forEach(button => {
	button.addEventListener('click', () => {
		calculator.setOperation(button.value);
	});
});

equalsButton.addEventListener('click', () => {
	if (calculator.operation === undefined) {
		return;
	}
	calculator.operate();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
})