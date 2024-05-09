class CalcController{

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

initialize(){
    this.setDispayDateTime()

    setInterval(()=>{
    this.setDispayDateTime()
    }, 1000)
}

    addEventListenerAll(element, events, fn){

            events.split(' ').forEach(event => {

                element.addEventListener(event, fn, false)

            })
    }


    initButtonEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

            buttons.forEach((btn, index)=>{
                
                this.addEventListenerAll('click drag mouseover', e =>{
                    
                    console.log(btn.className.baseVal.replace("btn-", ""))

                    
                })
                btn.style.cursor = "pointer"
                
            })
            

    }

    


    setDispayDateTime(){
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
