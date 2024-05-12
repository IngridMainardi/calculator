
class CalcController{

    // atributos
    constructor(){
    
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


    addOperation(value){

        if(isNaN(this.getLastOperation())){
            
            //se não for número
            if(this.isOperator(value)) {
                //trocar o operador
                
                this.setLastOperation(value)

            } else if(isNaN(value)){
                    
                console.log(value)

            }else{
             
                this._operation.push(value)

            }
                
        } else {
            //se for número
            let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
            //transforma tudo em string e junta
        }

        console.log(this._operation)

        }
           
    
        clearAll(){
    
            this._operation = [];
            }
    
        clearEntry(){
    
            this._operation.pop();
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
                case "equal":
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
    