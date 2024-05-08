class CalcController{

constructor(){

    this.locale = "pt-Br"
    this._displayCalcEL = document.querySelector("#display");
    this._displayDateEl = document.querySelector("#date");
    this._displayTimeEl  = document.querySelector("#hour");
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

    initButtonEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g")
            
            buttons.forEach((btn, index)=>{

                this.addEventListenerAll(btn, 'click drag mouseover', e => {
                    
                    console.log(btn.className.baseVal.replace("btn-",""));
                
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

