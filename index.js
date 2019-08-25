// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
// const datos = require('./Trivias/historia');
// const datos = require('./Trivias/geografia');

var datos;

function path(url){
    datos = require(url);
    return datos;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola bienvenido a Trivia Te, cuentas con las trivias: Historia de México, Ciencias naturales y Geografía, ¿Con cual deceas comenzar?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const GeografíaIntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'triviaDesicion';
    },
    handle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;
        var respuestag = request.intent.slots.answerTrivia.value;
        var speechText = '';
        switch(respuestag){
            case 'historia':
                // speechText = 'Has seleccionado Historia de México, puedes decirme dame pregunta uno';
                path('./Trivias/historia');

                break; 
            case 'ciencias': 
                speechText = 'Has seleccionado ciencias naturales, puedes decirme dame pregunta uno';
                path('./Trivias/historia');
                break; 
            case 'geografía':
                speechText = 'Has seleccionado geografía, puedes decirme dame pregunta uno';
                path('./Trivias/geografia');
                break; 
            default: 
                speechText = 'No contamos con esa trivia';
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};


const PreguntaIntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionIntent';
    },
    handle(handlerInput) {

        const requesta = handlerInput.requestEnvelope.request;
        var respuesta = request.intent.slots.answer.value;
        var speechText = respuesta;

        //  if(respuesta =='ballena'){
        //     speechText = 'Correcto muchas felicidades'
        //  }
        //  else{
        //      speechText = 'Incorrecto, intentalo de nuevo'
        //  }

         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};
const Q1IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionOne';
    },
    handle(handlerInput) {
        question = datos.preguntas[0].question
        optiona = datos.preguntas[0].optiona
        optionb = datos.preguntas[0].optionb
        optionc = datos.preguntas[0].optionc
        optiond = datos.preguntas[0].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A1IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerOne';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansOne.value;
        var speechText = '';
        if(answer == datos.preguntas[0].optiona){
            speechText = `Estas en lo correcto!, ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q2IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionTwo';
    },
    handle(handlerInput) {
        question = datos.preguntas[1].question
        optiona = datos.preguntas[1].optiona
        optionb = datos.preguntas[1].optionb
        optionc = datos.preguntas[1].optionc
        optiond = datos.preguntas[1].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)            
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};
const A2IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerTwo';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansTwo.value;
        var speechText = '';
        if(answer == datos.preguntas[1].optiona){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q3IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionThree';
    },
    handle(handlerInput) {
        question = datos.preguntas[2].question
        optiona = datos.preguntas[2].optiona
        optionb = datos.preguntas[2].optionb
        optionc = datos.preguntas[2].optionc
        optiond = datos.preguntas[2].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A3IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerThree';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansThree.value;
        var speechText = '';
        if(answer == datos.preguntas[2].optionb){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q4IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionFour';
    },
    handle(handlerInput) {
        question = datos.preguntas[3].question
        optiona = datos.preguntas[3].optiona
        optionb = datos.preguntas[3].optionb
        optionc = datos.preguntas[3].optionc
        optiond = datos.preguntas[3].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A4IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerFour';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansFour.value;
        var speechText = '';
        if(answer == datos.preguntas[3].optiona){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q5IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionFive';
    },
    handle(handlerInput) {
        question = datos.preguntas[4].question
        optiona = datos.preguntas[4].optiona
        optionb = datos.preguntas[4].optionb
        optionc = datos.preguntas[4].optionc
        optiond = datos.preguntas[4].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A5IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerFive';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansFive.value;
        var speechText = '';
        if(answer == datos.preguntas[4].optionc){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q6IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionSix';
    },
    handle(handlerInput) {
        question = datos.preguntas[5].question
        optiona = datos.preguntas[5].optiona
        optionb = datos.preguntas[5].optionb
        optionc = datos.preguntas[5].optionc
        optiond = datos.preguntas[5].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A6IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerSix';
    },
    handle(handlerInput) {const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;
        var speechText = '';
        if(answer == datos.preguntas[5].optionb){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q7IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionSeven';
    },
    handle(handlerInput) {
        question = datos.preguntas[6].question
        optiona = datos.preguntas[6].optiona
        optionb = datos.preguntas[6].optionb
        optionc = datos.preguntas[6].optionc
        optiond = datos.preguntas[6].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A7IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerSeven';
    },
    handle(handlerInput) {
        var answer = request.intent.slots.ansSix.value;
        var speechText = '';
        if(answer == datos.preguntas[6].optiond){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q8IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionEight';
    },
    handle(handlerInput) {
        question = datos.preguntas[7].question
        optiona = datos.preguntas[7].optiona
        optionb = datos.preguntas[7].optionb
        optionc = datos.preguntas[7].optionc
        optiond = datos.preguntas[7].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A8IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerEight';
    },
    handle(handlerInput) {
        var answer = request.intent.slots.ansSix.value;
        var speechText = '';
        if(answer == datos.preguntas[7].optiona){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q9IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionNine';
    },
    handle(handlerInput) {
        question = datos.preguntas[8].question
        optiona = datos.preguntas[8].optiona
        optionb = datos.preguntas[8].optionb
        optionc = datos.preguntas[8].optionc
        optiond = datos.preguntas[8].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A9IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerNine';
    },
    handle(handlerInput) {
        var answer = request.intent.slots.ansSix.value;
        var speechText = '';
        if(answer == datos.preguntas[8].optionc){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const Q10IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionTen';
    },
    handle(handlerInput) {
        question = datos.preguntas[9].question
        optiona = datos.preguntas[9].optiona
        optionb = datos.preguntas[9].optionb
        optionc = datos.preguntas[9].optionc
        optiond = datos.preguntas[9].optiond
         return handlerInput.responseBuilder
            .speak(`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};

const A10IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerTen';
    },
    handle(handlerInput) {
        var answer = request.intent.slots.ansSix.value;
        var speechText = '';
        if(answer == datos.preguntas[9].optiona){
            speechText = `Estas en lo correcto! ${answer}`
        } else {
            speechText = `Lo siento, sigue intentando, ${answer} no es lo correcto`
        }
         return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Intentalo de nuevo')
            .getResponse();
    }
};



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Regresa pronto!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Lo siento, No he entendido lo que has dicho, por favor intentalo de nuevo.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        PreguntaIntentHandler,
        A1IntentHandler,
        Q1IntentHandler,
        A2IntentHandler,
        Q2IntentHandler,
        A3IntentHandler,
        Q3IntentHandler,
        A4IntentHandler,
        Q4IntentHandler,
        A5IntentHandler,
        Q5IntentHandler,
        A6IntentHandler,
        Q6IntentHandler,
        A7IntentHandler,
        Q7IntentHandler,
        A8IntentHandler,
        Q8IntentHandler,
        A9IntentHandler,
        Q9IntentHandler,
        A10IntentHandler,
        Q10IntentHandler,
        GeografíaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
