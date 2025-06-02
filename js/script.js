// calc js kod

window.onload = init; //inlet lcd = null;                   // Referens till displayfältet
let isComma = false;              // anger om ett decimaltecken har lagts till
let memory = 0;                   // (Ej aktiv) Tidigare sparat värde
let arithmetic = null;            // Ej aktiv) Sparad operator
let infoDisplay = null;           // Visar tidigare uträkning och resultat
let calculationString = "";       // Håller hela uttrycket som en sträng

function init() {
    lcd = document.getElementById('lcd');             // Hämtar displayelementet
    infoDisplay = document.getElementById('infoDisplay'); // Hämtar info-display
    let keyBoard = document.getElementById('keyBoard');   // Hämtar knappraden
    keyBoard.onclick = buttonClick;                   // kopplar alla knappar till funktionen
    clearLCD();                                       // Nollställer displayen
}

/**
 * Hanterar knapptryckningar från kalkylatorn
 */
function buttonClick(e) {
    let btn = e.target.id;  // Hämtar id på den knapp som tryckts

    if (btn.substring(0, 1) === 'b') {  // läser endast bokstaven "b"
        let digit = btn.substring(1, 2);  // Extraherar siffran från id:t, t.ex. b5 → "5"
        addDigit(digit);
    } else {
        switch (btn) {
            case 'add':
                setOperator('+');
                break;
            case 'sub':
                setOperator('-');
                break;
            case 'mul':
                setOperator('*');
                break;
            case 'div':
                setOperator('/');
                break;
            case 'clear':
                memClear();
                break;
            case 'enter':
                calculate();
                break;
            case 'comma':
                addComma();
                break;
        }
    }
}

/**
 * Lägger till en siffra till uttrycket och uppdaterar displayen
 */
function addDigit(digit) {
    if (lcd.value == '0') {
        lcd.value = digit;
    } else {
        lcd.value += digit;
    }
    calculationString += digit;     // Lägger till siffran till beräkningssträngen
    lcd.value = calculationString;  // Visar uppdaterad sträng på displayen
}

/**
 * Lägger till ett decimaltecken om det inte redan finns
 */
function addComma() {
    if (!isComma) {
        lcd.value += '.';
        calculationString += '.';   // Lägger till decimal i beräkningssträngen
        isComma = true;
    }
}

/**
 * Lägger till vald operator till uttrycket och uppdaterar displayen
 */
function setOperator(operator) {
    if (lcd.value !== "") {
        calculationString += " " + operator + " ";  // Lägger till operator med mellanslag,,, SUPER VIKTIGT!!
        lcd.value = calculationString;              // Uppdaterar displayen
        isComma = false;                            // Tillåter ny decimal i nästa tal, också EXTREMT viktigt
    }
}

/**
 * Räknar ut hela uttrycket och visar resultatet
 */
function calculate() {
    try{
        const tokens = calculationString.split(" "); //ska dela upp strängen i delar
        const operators = ['*', '/', '+', '-']; //förklarar operatörerna

        for(let op of ['*', '/', '+', '-']){
            while (tokens.includes(op)){
                const index = tokens.indexOf(op); // hittade index av operatören
                const left = parseFloat(tokens[index - 1]);
                const right = parseFloat(tokens[index + 1]);

                // felhantering 
                if (isNaN(left) || isNaN(right)) {
                    lcd.value = " error"; 
                    return;
                }

                let result;

                switch (op){
                    case '*':
                        result = left * right;
                        break;
                    case '/':
                        if(right == 0){
                            lcd.value = "division med noll";
                            return;
                        }
                        result = left / right;
                        break;
                    case '+':
                        result = left + right;
                        break;
                    case '-':
                        result = left - right;
                        break;
                }
                tokens.splice(index - 1, 3, result);  // tar bort delarna och lägger till resultaten
            }
        }
        const finalResult = tokens[0]; // slutliga resultatet 
        lcd.value = finalResult; // displayar resultatet
        calculationString = finalResult.toString(); // resultatet sparas i beräkningssträngen
        isComma = calculationString.includes('.'); //uppdaterat is comma baserat på resultatet
        infoDisplay.textContent = calculationString; // visar calc strängen i info diplayen
        
    } catch (error){
        lcd.value = "error";
        console.error("Beräkningsfel:", error);
    }
}

/**
 * Rensar endast displayen
 */
function clearLCD() {
    lcd.value = '0';
    isComma = false;
}

/**
 * Rensar hela kalkylatorn inklusive uttryck och historik
 */
function memClear() {
    memory = 0;
    arithmetic = null;
    calculationString = "";
    clearLCD();
    if (infoDisplay) {
        infoDisplay.textContent = "";
    }
}

window.onload = init; //initierar kalkylatorn när sidan laddas