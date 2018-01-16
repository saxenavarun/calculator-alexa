'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var calledEvent;

const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', "Welcome! I can perform almost any simple calculation between two numbers.", "What calculation would you like me to perform?");
    },
    'CalcIntent': function () {
        var n1 = calledEvent.request.intent.slots.numA.value;
        var n2 = calledEvent.request.intent.slots.numB.value;
        var op = calledEvent.request.intent.slots.Op.value;
        console.log("Found equation: " + n1 + " " + op + " " + n2);
        var speechOutput;
        
        if(n1 && n2 && op) {
            console.log("Doing calculation");
             speechOutput = doCalc(n1, n2, op);
            console.log(speechOutput);
            this.emit(":tell", "The answer to " + n1 + " " + op + " " + n2 + " is " + speechOutput + ". Again, the answer is " + speechOutput);
        } else {
            console.warn("Couldn't parse calculation");
            this.emit(":ask", "I couldn't make out what calculation you requested.", "You can ask me questions like, what is three times six, for example. You can also ask me for help to get more examples.");
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', "I can provide answers to calculations using addition, subtraction, division, multiplication, and exponentiation. You need to ask me questions like, what is seven to the power of six, or, what is nine divided by three, for example.", "What calculation would you like me to perform?");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "goodbye");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "goodbye");
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', "goodbye");
    },
};

exports.handler = (event, context) => {
    calledEvent = event;
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// perform a calculation given two numbers and an operation
function doCalc(x, y, o) {
    x = parseFloat(x);
    y = parseFloat(y);
    var output;
    switch(o) {
        case "plus":
            output = x + y;
            break;
        case "minus":
            output = x - y;
            break;
        case "times":
            output = x * y;
            break;
        case "divided by":
            if(y !== 0) {
                output = x / y;
            } else {
                output = "undefined";
            }
            break;
        case "to the power of":
            output = Math.pow(x, y);
            break;
    }
    if(output !== "undefined") {
        console.log("Original output: " + output);
        output = output.toFixed(6);
        console.log("Fixed output: " + output);
    }
    return output;
}
