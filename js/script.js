let lcd = null;                   // Referens till displayfältet
let isComma = false;              // Anger om ett decimaltecken har lagts till
let memory = 0;                   // (Ej aktiv) Tidigare sparat värde
let arithmetic = null;            // (Ej aktiv) Sparad operator
let infoDisplay = null;           // Visar tidigare uträkning och resultat
let calculationString = "";       // Håller hela uttrycket som en sträng

function init() {
    lcd = document.getElementById('lcd');             // Hämtar displayelementet
    infoDisplay = document.getElementById('infoDisplay'); // Hämtar info-display
    let keyBoard = document.getElementById('keyBoard');   // Hämtar knappraden
    keyBoard.onclick = buttonClick;                   // Kopplar alla knappar till funktionen
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
    try {
        let result = eval(calculationString);  // Utför beräkningen
        lcd.value = result;                    // Visar resultatet
        infoDisplay.textContent = calculationString + " = " + result; // Visar hela uträkningen
        calculationString = result.toString(); // Startar om med resultatet som bas
    } catch (error) {
        lcd.value = "ERROR";
        infoDisplay.textContent = "Invalid Calculation"; // Felmeddelande vid ogiltigt uttryck
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
