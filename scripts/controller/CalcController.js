
class CalcController{

    // atributos
    constructor(){    
        
        this._lastOperator = ""
        this._lastNumber = ""

        this._operation = [];
        this.locale = "pt-Br"
        this._displayCalcEL = document.querySelector("#display");
        this._displayDateEl = document.querySelector("#date");
        this._displayTimeEl  = document.querySelector("#time");
        this._currentDate;
        this.initialize();
        this.setDispayDateTime()
        this.initButtonEvents()
        }   
    
    // config do display
    
        initButtonEvents(){
            let buttons = document.querySelectorAll("#buttons > g, #parts > g")
    
                buttons.forEach((btn, index)=>{
                    
                    this.addEventListenerAll(btn, 'click drag', e =>{
                        
                        let textBtn = btn.className.baseVal.replace("btn-", "")

                                
                            this.execBtn(textBtn)
                    })

                    this.addEventListenerAll(btn, 'mouseover mouseup, mousedown', e => {

                        btn.style.cursor = "pointer"
                    })

                    
                })
                
    
        }
        get displayTime(){
            return this._displayTimeEl.innerHTML;
        }
    
        set displayTime(value){
            return this._displayTimeEl.innerHTML = value;
        }
    
        get displayDate(){
            return this._displayDateEl.innerHTML;
        }
        set displayDate(value){
            return this._displayDateEl.innerHTML = value;
        }
    
        get displayCalc(){
            return this._displayCalcEL.innerHTML;
        }
    
        set displayCalc(value){
            this._displayCalcEL.innerHTML = value;
        }
    
        get currentDate(){
            return new Date();
        }
        set currentDate(value){
            return this._currentDate = value;
        }
    
    
    initialize(){
    
    // hora no display
        this.setDispayDateTime()
    
        setInterval(()=>{
        this.setDispayDateTime()
        }, 1000)
        }
    // data no display
        setDispayDateTime(){
    
        this.displayDate = this.currentDate.toLocaleDateString(this.locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
    
       }
    
    
    // limpar o nome dos botões
        addEventListenerAll(element, events, fn){
    
                events.split(' ').forEach(event => {
    
                    element.addEventListener(event, fn, false)
    
                })

    //número 0 quando abre a calculadora
    this.setLastNumberToDisplay()
        }
    
    
    addOperation(value){
        this._operation.push(value);

    }


     // métodos dos botões

     
        getLastOperation(){
    
            return this._operation[this._operation.length - 1];

        }

        isOperator(value){

            return (['+', '-', '*', '/', '%'].indexOf(value) > -1) 

        }

        setLastOperation(value){

            this._operation[this._operation.length - 1] = value
        }

        pushOperation(value){
            
            this._operation.push(value)

            if (this._operation.length > 3){

                this.calc()

            }

        }
        
        getResult(){

            return eval(this._operation.join(""))
        }


        calc(){

            let last = ""
            this._lastOperator = this.getLastItem()

            if (this._operation.length >3){
                last = this._operation.pop()

                this._lastNumber = this.getResult()
            } else if(this._operation.length == 3){

                this._lastNumber = this.getLastItem(false)

            }

            console.log('_lastOperator', this._lastOperator)
            console.log('_lastNumber', this._lastNumber)
            
            let result = this.getResult()

            if (last == '%'){

                result /= 100
                    this._operation = [result]

            } else {
               

                    this._operation = [result]

                    if(last) this._operation.push(last)

            }

                    this.setLastNumberToDisplay()
        }

        getLastItem(isOperator = true){

            let lastItem;

            for(let i = this._operation.length-1; i >=0; i--){

                if (this.isOperator(this._operation[i]) == isOperator){

                    lastItem = this._operation[i];
                        break;
                }

        }

        return lastItem;

    }

        setLastNumberToDisplay(){

            let lastNumber = this.getLastItem(false);
                 
          

            if(!lastNumber) lastNumber = 0
            this.displayCalc = lastNumber;

    }





    addOperation(value){

        if(isNaN(this.getLastOperation())){
                
            //se não for número
            if(this.isOperator(value)) {
                //trocar o operador
                
                this.setLastOperation(value)

            } else if(isNaN(value)){
                    
                console.log(value)

            }else{
                console.log(this._operation)

                this.pushOperation(value)

                this.setLastNumberToDisplay()
            }
                
        } else {
            //se antes do oprador teve um número
            
            if(this.isOperator(value)){

                this.pushOperation(value)

                
            
            } else {
               
                //se for número
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
        //transforma tudo em string e junta
               this.setLastNumberToDisplay()
            }

        }

        }
           
    
        clearAll(){
    
            this._operation = [];
            this.setLastNumberToDisplay()
            }
    
        clearEntry(){
    
            this._operation.pop();
            this.setLastNumberToDisplay()
            }
    
        setError(){
    
            this.displayCalc = "Error";
            }
    
    // config dos botões
        execBtn(value){
    
            switch (value){
                
                case "ac": this.clearAll()
                    break;
                case "ce": this.clearEntry()
                    break;
                case "sum": this.addOperation('+')
                    break;
                case "subtration":this.addOperation('-')
                    break;
                case "multiplication":this.addOperation('*')
                    break;
                case "division":this.addOperation('/')
                    break;
                case "porcent":this.addOperation('%')
                    break;
                case "equal": this.calc()
                    break;
                case "point": this.addOperation('.')
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
    
                default: this.setError();
                    break;
            }
        }
    
    
    
    
    }
    