class EncarnationController{

	constructor(formId,nameId,birthId, answerId){
		this.nameField = document.getElementById(nameId);
		this.birthField = document.getElementById(birthId);
		this.answerEl = document.getElementById(answerId);
		this.calculate(formId);
	}

	calculate(formId){
		document.getElementById(formId).addEventListener('submit',e=>{
			e.preventDefault();
			let now = moment(this.birthField.value);
			let firstRow = [now.date(),now.month()+1,this.calculateDigits(now.year())];
			let secondRow = [];
			firstRow.forEach(element => secondRow.push(this.divideNumber(element)));
			let resultFirstRow = this.sumOfArrayWithRule(firstRow);
			let resultSecondRow = this.sumOfArrayWithRule(secondRow);
			let lastDigitsYear = now.year() % 100;
			let sumDigitsYear = this.calculateDigits(lastDigitsYear);
			let secValue = this.divideNumber(sumDigitsYear);
			let resultFirstOp = this.ruleOf22(sumDigitsYear*2);
			let resultSecondOp = this.ruleOf22(sumDigitsYear + secValue);
			let encarnationNumber = Math.max(resultFirstRow,resultSecondRow,resultFirstOp,resultSecondOp);
			let sumOfYear = this.ruleOf22(firstRow[0] + firstRow[1] + now.year());
			let yearRow = [];
			firstRow.forEach(element=> yearRow.push(this.ruleOf22(element)));
			yearRow.push(this.ruleOf22(sumOfYear));
			let karmaYear = this.sumOfArray(yearRow);
			this.createAnswer(karmaYear,encarnationNumber);
		});
	}

	createAnswer(karmaYear,encarnationNumber){
		let p = document.createElement('p');
		p.innerHTML = `${this.nameField.value} seu karma será liberado com ${karmaYear} anos. Sua encarnação atual é a de nº ${encarnationNumber} `;
		this.answerEl.appendChild(p);
	}

	sumOfArray(myArray){
		return myArray.reduce((init,value)=> init + value, 0);
	}

	ruleOf22(number){
		if(number > 22)
			number = this.calculateDigits(number);
		return number;
	}

	sumOfArrayWithRule(myArray){
		return this.ruleOf22(this.sumOfArray(myArray));
	}

	divideNumber(number){
		if (number > 9)
			return this.divideNumber(this.calculateDigits(number));
		else
			return number;
	}

	calculateDigits(number){
		let sum = 0;
		while(number >=10){
			let value = number%10;
			sum+=value;
			number-=value;
			number/=10;
		}
		sum += number;
		return sum;
	}

}