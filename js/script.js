
let lcd = null; // displayen
let isComma = false;
let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /

function init() {
    lcd = document.getElementById('lcd'); // hämtar input fältet
    let keyBoard = document.getElementById('keyBoard') // hämtar hela knappraden
    keyBoard.onclick = buttonClick; // kopplar klick till funktion 
    clearLCD();
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id;                                        //id för den tangent som tryckte ner

    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2);               // plolcd.value =0; ckar ut siffran från id:et
        addDigit(digit);
    } else {                                          // inte en siffertangent, övriga tangenter. if (btn === 'comma')
        //addComma();
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
            case 'spec':
                memClear();
                break;
            case 'enter':
                calculate();
                break;
            case 'comma':
                addComma();
                break;
        }
        console.log(arithmetic);
    }
}

/**
* Se detta som en grund att utgå ifrån.
* Det är helt fritt att ändra och ta bort kod om ni
* isComma = true;
} önskar lösa problemen med andra metoder.
*/

function addDigit(digit) {
    if (lcd.value == '0') {
        lcd.value = digit;
    } else {
        lcd.value += digit;
    }
}
/**
 * Lägger till decimaltecken
 */
function addComma() {
    if (!isComma) {
        lcd.value += '.';
        isComma = true;
    }
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = parseFloat(lcd.value);
    arithmetic = operator;
    clearLCD();
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let current = parseFloat(lcd.value); // det andra talet
    let result = 0;                        // börjar såklart som noll

    switch (arithmetic) {
        case '+':
            result = memory + current;
            break;
        case '-':
            result = memory - current;
            break;
        case '*':
            result = memory * current;
            break;
        case '/':
            if (current !== 0) {
                result = memory / current;
            } else {
                lcd.value = "ERROR, noll division";
            }
            break;
    }
    lcd.value = result
}

/** Rensar display */
function clearLCD() {
    lcd.value = '0';
    isComma = false;

}

/** Rensar allt, reset */
function memClear() {
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;