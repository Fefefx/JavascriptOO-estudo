class CalcController {
    constructor() {
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = "pt-BR";
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
    }
    pasteFromClipboard(){
        document.addEventListener('paste',e=>{
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });
    }
    copyToClipboard(){
        //Cria um elemento HTML dinâmicamente com Javascript 
        let input = document.createElement('input');
        input.value = this.displayCalc;
        //Adiciona o elemento input ao body do documento HTML com um elemento filho
        document.body.appendChild(input);
        //Permite selecionar o conteúdo do input para a área de transferência
        input.select();
        //Habilita o copiar
        document.execCommand("Copy");
        //Remove o input
        input.remove();
    }
    initKeyboard(){
        document.addEventListener('keyup', e=>{
            this.playAudio();
            switch (e.key) {
                case "Escape":
                    this.clearAll();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                case "+":
                case "-":
                case "/":
                case "*":
                case "%":
                    this.addOperation(e.key);
                    break;
                case "Enter":
                case "=":
                    this.calc();
                    break;
                case ".":
                case ",":
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
                case 'c':
                    if(e.ctrlKey)
                        this.copyToClipboard();
                    break;
            }
        });
    }
    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        /**
         * Finaliza a execução do setInterval
         */
        /*setTimeout(()=>{
            //armazenar o Interval em uma variável primeiro !
            clearInterval(interval);
        },10000);*/
        this.setLastNumberToDisplay();
        this.pasteFromClipboard();
        document.querySelectorAll('.btn-ac').forEach(btn=>{
            btn.addEventListener('dblclick',e=>{
                this.toggleAudio();
            });
        });
    }
    toggleAudio(){
        this._audioOnOff = !this._audioOnOff;
    }
    playAudio(){
        if(this._audioOnOff){
            this._audio.currentTime = 0;
            this._audio.play();
        }
    }
    addEventListenerAll(element, events, fn) {
        //Elements é uma String e split separa em um vetor de elementos pelo espaço
        events.split(" ").forEach(event => {
            //O false aborta a execução de dois eventos simultâneos
            element.addEventListener(event, fn, false);
        });
    }
    clearAll() {
        //Limpa o vetor
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }
    clearEntry() {
        //Pop remove o último elemento do vetor
        this._operation.pop();
        this.setLastNumberToDisplay();
    }
    setError() {
        this.displayCalc = "Error";
    }
    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }
    isOperator(value) {
        //Indexof verifica se existe um valor dentro de um vetor. Senão existir retorna -1
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }
    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
        }
    }
    getResult(){
        //Join junta os elementos do vetor em uma String colocando o parâmetro como separador
        //Eval realiza a ação especificada na String 
        try{
            return eval(this._operation.join(""));
        }catch(e){
            setTimeout(()=>{
                this.setError();
            },1);
        }
    }
    calc() {
        let last = "";
        this._lastOperator = this.getLastItem();
        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem,this._lastOperator,this._lastNumber];
        }
        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }
        let result = this.getResult();
        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if(last){
                this._operation.push(last);
            }
        }
        this.setLastNumberToDisplay();
    }
    getLastItem(isOperator = true){
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }
        if(!lastItem){
            //Define um if ternário onde se o valor de isOperator for true armazena o valor de _lastOperator em lastItem, caso contrário armazena o valor de _lastNumber.
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }
        return lastItem;
    }
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);
        if(!lastNumber){
            lastNumber = 0;
        }
        this.displayCalc = lastNumber;
    }
    addOperation(value) {
        //isNaN verifica se o último elemento não é um número retornando true ou false
        if (isNaN(this.getLastOperation())) {
            if (this.isOperator(value)) {
                //Trocar o operador
                this.setLastOperation(value);
            } else {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if (this.isOperator(value)) {
                this.pushOperation(value);
            } else {
                //Converter em String para concatenar os números
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();
            }
        }
    }
    addDot(){
        let lastOperation = this.getLastOperation();
        /* verifica se lastOperation é uma String e realiza Split de nada dividindo os caracteres em um array 
        para que o indexOf verifique se existe um ponto nesse Array */
        if(typeof lastOperation == 'string' && lastOperation.split('').indexOf('.') > -1){
            return;
        }
        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation('0.');
        }else{
            this.setLastOperation(lastOperation.toString() + '.');
        }
        this.setLastNumberToDisplay();
    }
    execBtn(value) {
        this.playAudio();
        switch (value) {
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation('+');
                break;
            case "subtracao":
                this.addOperation('-');
                break;
            case "divisao":
                this.addOperation('/');
                break;
            case "multiplicacao":
                this.addOperation('*');
                break;
            case "porcento":
                this.addOperation('%');
                break;
            case "igual":
                this.calc();
                break;
            case "ponto":
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }
    initButtonsEvents() {
        //Seleciona todos os elementos filhos g dos ids buttons e parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //percorre cada um dos elementos de buttons passando suas informações para os parâmetros btn e index
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                //btn.className.baseVal captura o nome de uma class de um elemento svg
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });
            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                //Muda o estilo da seta para uma mão clicável
                btn.style.cursor = "pointer";
            });
        });
    }
    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        if(value.toString().length > 10){
            this.setError();
            return false;
        }
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }
    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }
}