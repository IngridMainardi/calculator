class CalcController{

constructor(){

    this._operation = [];
    this.locale = "pt-Br"
    this._displayCalcEL = document.querySelector("#display");
    this._displayDateEl = document.querySelector("#date");
    this._displayTimeEl  = document.querySelector("#time");
    this._currentDate;
    this.initialize();
    this.setdispayDateTime()
    this.initButtonEvents()
}

initialize(){
    this.setdispayDateTime()

    setInterval(()=>{
    this.setdispayDateTime()
    }, 1000)
}

    addEventListenerAll(element, events, fn){

            events.split(" ").forEach(event => {

                element.addEventListener(event, fn, false)

            })
    }

    addOperation(value){
        this._operation.push(value)
    }

    clearAll(){

        this._operation = []
    }
    clearEntry(){

        this._operation.pop()
    }
    setError(){

        this.displayCalc = "Error"
    }

    execBtn(value){

        switch (value){
            
            case "ac": this.clearAll
                break;
            case "ce": this.clearEntry
                break;
            case "soma":
                break;
            case "subtration":
                break
            case "multiplication":
                break
            case "division":
                break
            case "porcent":
                break
            case "equal":
                break
            default: this.setError
                break
        }
    }

    initButtonEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
            
            buttons.forEach((btn, index)=>{

                this.addEventListenerAll(btn, 'click drag', e => {
                    
                    console.log(btn.className.baseVal.replace("btn-",""));
                
                })

                this.addEventListenerAll(btn , "mouseover mouseup mpousedown", e =>{

                    btn.style.cursor = "pointer"

                })
            })

    }

    


    setdispayDateTime(){
             this.displayDate = this.currentDate.toLocaleDateString(this.locale)
             this.displayTime = this.currentDate.toLocaleTimeString(this.locale)
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

}

