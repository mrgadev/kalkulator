const calculator = {
	displayNumber: '0',
	operator: null,
	firstNumber: null,
	waitingForSecondNumber: false
};

function updateDisplay() {
	document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
	calculator.displayNumber = '0';
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.waitingForSecondNumber = false;
}

// fungsi untuk memasukkan angka ke dalam nilai displayNumber kalkulator.
function inputDigit(digit) {
	if (calculator.displayNumber === '0') {
		calculator.displayNumber = digit;
	} else {
		calculator.displayNumber += digit;
	}
}

// function untuk inverse number
function inverseNumber() {
   if (calculator.displayNumber === '0') {
       return;
   }
   calculator.displayNumber = calculator.displayNumber * -1;
}

//function untuk operator yang lain
function handleOperator(operator) {
	if (!calculator.waitingForSecondNumber) {
		calculator.operator = operator;
		calculator.waitingForSecondNumber = true;
		calculator.firstNumber = calculator.displayNumber;

		// mengatur ulang nilai display supaya tombol selanjutnya dimulai dari angka pertama lagi
		calculator.displayNumber = '0';
	} else {
		alert('Operator Sudah Ditetapkan!')
	}
}

//function untuk equals operator
function performCalculation() {
	if (calculator.firstNumber == null || calculator.operator == null) {
		alert("Anda belum menetapkan operator!");
		return;
	}

	let result = 0;
	if (calculator.operator === "+") {
		result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
	} else {
		result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
	}

	calculator.displayNumber = result;
} 
// variabel buttons
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
	button.addEventListener('click', function(event) {

		// mendapatkan objek elemen yang diklik
		const target = event.target;

		if (target.classList.contains('clear')) {
           clearCalculator();
           updateDisplay();
           return;
       }

       //negative operators
		if(target.classList.contains('negative')) {
			inverseNumber();
			updateDisplay();
			return;
		}

		//equal operator
		if(target.classList.contains('equals')) {
			performCalculation();
			updateDisplay();
			return;
		}

		if(target.classList.contains('operator')) {
			handleOperator(target.innerText);
			return;
		}

		inputDigit(target.innerText);
		updateDisplay()
	});
}