class CalcController {

    // atributos
    constructor() {
        this._lastOperator = "";
        this._lastNumber = "";

        this._operation = [];
        this.locale = "pt-Br";
        this._displayCalcEL = document.querySelector("#display");
        this._displayDateEl = document.querySelector("#date");
        this._displayTimeEl = document.querySelector("#time");
        this._currentDate;
        this.initialize();
        this.setDispayDateTime();
        this.initButtonEvents();
        this.initKeyboard();
    }

    copyToClipboard() {
        let textToCopy = this.displayCalc;
        navigator.clipboard.writeText(textToCopy)
    }

    pasteFromClipboard() {
        navigator.clipboard.readText().then(text => {
            let number = parseFloat(text.replace(',', '.'));
            if (!isNaN(number)) {
                this.addOperation(number);
                this.setLastNumberToDisplay();
            }
        })
    }

    // config do display

    initButtonEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    get displayTime() {
        return this._displayTimeEl.innerHTML;
    }

    set displayTime(value) {
        return this._displayTimeEl.innerHTML = value;
    }

    get displayDate() {
        return this._displayDateEl.innerHTML;
    }

    set displayDate(value) {
        return this._displayDateEl.innerHTML = value;
    }

    get displayCalc() {
        return this._displayCalcEL.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEL.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        return this._currentDate = value;
    }

    initialize() {
        this.setDispayDateTime();

        setInterval(() => {
            this.setDispayDateTime();
        }, 1000);
    }

    setDispayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this.locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
    }

    initKeyboard() {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case "Escape":
                    this.clearAll();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key);
                    break;
                case "Enter":
                case "=":
                    this.calc();
                    break;
                case ",":
                case ".":
                    this.addDot();
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
                case 'v':
                    if (e.ctrlKey) this.pasteFromClipboard();
                    break;
            }
        });
    }

    // limpar o nome dos botões
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
        this.setLastNumberToDisplay();
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {
            // se não for número
            if (this.isOperator(value)) {
                // trocar o operador
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            // se antes do operador teve um número
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                // se for número
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();
            }
        }
    }

    // métodos dos botões
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        }
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    calc() {
        let last = "";
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if (!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;
    }

    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = "Error";
    }

    addDot() {
        let lastOperation = this.getLastOperation();
        if (typeof lastOperation === "string" && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();
    }

    // config dos botões
    execBtn(value) {
        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "sum":
                this.addOperation('+');
                break;
            case "subtration":
                this.addOperation('-');
                break;
            case "multiplication":
                this.addOperation('*');
                break;
            case "division":
                this.addOperation('/');
                break;
            case "porcent":
                this.addOperation('%');
                break;
            case "equal":
                this.calc();
                break;
            case "point":
                this.addDot();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
}
