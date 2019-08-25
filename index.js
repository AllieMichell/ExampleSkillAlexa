// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
var triviaAPL = require('./APL/aplQ.json')
var datos;

function path(url){
    datos = require(url);
    return datos;
}
function supportsAPL (handlerInput){ 
    const supportedInterfaces = 
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface != undefined; 
}

function allowedpermissions (handlerInput) {
    const { requestEnvelope } = handlerInput;
    const consentToken = requestEnvelope.context.System.user.permissions
      && requestEnvelope.context.System.user.permissions.consentToken;
    return consentToken != null && consentToken != undefined; 
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        var speakText = 'Hola bienvenido a  mi Trivia, cuentas con las trivias: Historia de México, Ciencias naturales y Geografía, ¿Con cual deceas comenzar?';
        var speakRepromp = 'Cuentas con las trivias: Historia de México, Ciencias naturales y Geografía, ¿Con cual deceas comenzar?';
        var speakView = 'Historia, Ciencias y Geografía'; 

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};


const GeografíaIntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'triviaDesicion';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var respuestag = request.intent.slots.answerTrivia.value;
        var speakText = '';
        var speakRepromp = ''; 
        var speakView = ''; 
        switch(respuestag){
            case 'historia':
                speakText = 'Has seleccionado Historia de México, puedes decirme dame pregunta uno';
                speakRepromp = 'Puedes decierme dame pregunta dos';
                speakView = 'Historia de México'
                path('./Trivias/historia');

                break; 
            case 'ciencias': 
                speakText = 'Has seleccionado ciencias naturales, puedes decirme dame pregunta uno';
                speakRepromp = 'Puedes decierme dame pregunta tres';
                speakView = 'Ciencias Naturales'
                path('./Trivias/historia');
                break; 
            case 'geografía':
                speakText = 'Has seleccionado geografía, puedes decirme dame pregunta uno';
                speakRepromp = 'Puedes decierme dame pregunta cuatro';
                speakView = 'Geografía'
                path('./Trivias/geografia');
                break; 
            default: 
                speakText = 'No contamos con esa trivia';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q1IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionOne';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[0].question
        optiona = datos.preguntas[0].optiona
        optionb = datos.preguntas[0].optionb
        optionc = datos.preguntas[0].optionc
        optiond = datos.preguntas[0].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
         
    }
};

const A1IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerOne';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansOne.value;

        speakText = '';
        speakRepromp = 'Para continuar puedes decirme pregunta dos';
        speakView = '';

        if(answer == datos.preguntas[0].optiona){
            speakText = 'Tu respuesta es correcta!';
            speakView = 'Correcto';
        } else {
            speakText = 'Tu respuesta es incorrecta!';
            speakView = 'Incorrecto';
        }
        
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q2IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionTwo';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[1].question
        optiona = datos.preguntas[1].optiona
        optionb = datos.preguntas[1].optionb
        optionc = datos.preguntas[1].optionc
        optiond = datos.preguntas[1].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};
const A2IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerTwo';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansTwo.value;

        speakText = '';
        speakRepromp = 'Para continuar puedes decirme pregunta tres';
        speakView = '';

        if(answer == datos.preguntas[1].optiona){
            speechText = 'Tu respuesta es correcta!';
            speakView = 'Correcto';
        } else {
            speechText = 'Tu respuesta es incorrecta!'
            speakView = 'Incorrecto'
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q3IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionThree';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[2].question
        optiona = datos.preguntas[2].optiona
        optionb = datos.preguntas[2].optionb
        optionc = datos.preguntas[2].optionc
        optiond = datos.preguntas[2].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`; ; 

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A3IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerThree';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansThree.value;

        var speakText = '';
        var speakRepromp = 'Para continuar puedes decirme pregunta cuatro'; 
        var speakView = '';

        if(answer == datos.preguntas[2].optionb){
            speakText = 'Tu respuesta es correcta!';
            speakView = 'Correcto;'
        } else {
            speakText = 'Tu respuesta es incorrecta!';
            speakView = 'Incorrecto';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q4IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionFour';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[3].question
        optiona = datos.preguntas[3].optiona
        optionb = datos.preguntas[3].optionb
        optionc = datos.preguntas[3].optionc
        optiond = datos.preguntas[3].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp =  `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A4IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerFour';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansFour.value;

        speakText = '';
        speakRepromp = 'Para continuar puedes decirme pregunta cinco';
        speakView = '';

        if(answer == datos.preguntas[3].optiona){
            speakText = 'Tu respuesta es correcta!'; 
            speakView = 'Correcto'; 
        } else {
            speakText = 'Tu respuesta es incorrecta!'; 
            speakView = 'Incorrecto;'
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q5IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionFive';
    },
     async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[4].question
        optiona = datos.preguntas[4].optiona
        optionb = datos.preguntas[4].optionb
        optionc = datos.preguntas[4].optionc
        optiond = datos.preguntas[4].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}` ;
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A5IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerFive';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansFive.value;

        speakText = '';
        speakRepromp = 'Para continuar pudes decirme pregunta seis';
        speakView = '';

        if(answer == datos.preguntas[4].optionc){
            speakText = 'Tu respuesta es correcta!'; 
            speakView = 'Correcto'; 
        } else {
            speakText = 'Tu respuesta es incorrecta!'; 
            speakView = 'Incorrecto';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q6IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionSix';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);
        
        question = datos.preguntas[5].question
        optiona = datos.preguntas[5].optiona
        optionb = datos.preguntas[5].optionb
        optionc = datos.preguntas[5].optionc
        optiond = datos.preguntas[5].optiond

        speakText =`${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A6IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerSix';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;

        speakText = '';
        speakRepromp = 'Para continuar puedes decirme pregunta siete';
        speakView = '';

        if(answer == datos.preguntas[5].optionb){
            speakText = 'Tu respuesta es correcta!'
            speakView = 'Correcto';
        } else {
            speakText = 'Tu respuesta es incorrecta'
            speakView = 'Incorrecto';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q7IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionSeven';
    },
     async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[6].question
        optiona = datos.preguntas[6].optiona
        optionb = datos.preguntas[6].optionb
        optionc = datos.preguntas[6].optionc
        optiond = datos.preguntas[6].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A7IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerSeven';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;

        speakText = '';        
        speakRepromp = 'Para coninuar pudes decirme pregunta ocho'; 
        speakView = ''; 

        if(answer == datos.preguntas[6].optiond){
            speakText = 'Tu respuesta es correcta!'; 
            speakView = 'Correcto'; 
        } else {
            speakText = 'Tu respuesta es incorrecta!'; 
            speakView = 'Incorrecto';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q8IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionEight';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput); 

        question = datos.preguntas[7].question
        optiona = datos.preguntas[7].optiona
        optionb = datos.preguntas[7].optionb
        optionc = datos.preguntas[7].optionc
        optiond = datos.preguntas[7].optiond

        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        
        
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A8IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerEight';
    },
     async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;

        speakText = '';
        speakRepromp = 'Para continuar pudes decirme pregunta nueve';
        speakView = '';

        if(answer == datos.preguntas[7].optiona){
            speakText = 'Tu respuesta es correcta!'; 
            speakView = 'Correcto'; 
        } else {
            speakText = 'Tu respuesta es incorrecta!'
            speakView = 'Incorrecto';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q9IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionNine';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput); 

        question = datos.preguntas[8].question
        optiona = datos.preguntas[8].optiona
        optionb = datos.preguntas[8].optionb
        optionc = datos.preguntas[8].optionc
        optiond = datos.preguntas[8].optiond
        
        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
         
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A9IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerNine';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;

        speakText = '';
        speakRepromp = '';
        speakView = '';

        if(answer == datos.preguntas[8].optionc){
            speakText = 'Tu respuesta es correcta!'; 
            speakView = 'Correcto'
        } else {
            speakText = 'Tu respuesta es incorrecta!'
            speakView = 'Incorrecto;'
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const Q10IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'questionTen';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput);

        question = datos.preguntas[9].question
        optiona = datos.preguntas[9].optiona
        optionb = datos.preguntas[9].optionb
        optionc = datos.preguntas[9].optionc
        optiond = datos.preguntas[9].optiond
        
        speakText = `${question}, tus opciones son ${optiona}, ${optionb}, ${optionc}, o ${optiond}`; 
        speakRepromp = `Tienes como opciones ${optiona}, ${optionb}, ${optionc}, o ${optiond}`;
        speakView = `${optiona}, ${optionb}, ${optionc}, o ${optiond}`;

        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
    }
};

const A10IntentHandler ={
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'answerTen';
    },
    async handle(handlerInput) {
        const { responseBuilder } = handlerInput;
        const aplSupport = supportsAPL(handlerInput); 

        const request = handlerInput.requestEnvelope.request;
        var answer = request.intent.slots.ansSix.value;

        speakText = '';
        speakRepromp = 'Relicidades has concluido la trivia';
        speakView = '';
        if(answer == datos.preguntas[9].optiona){
            speakText = 'Tu respuesta es correcta'; 
            speakView = 'Felicidades!'
        } else {
            speakText = 'Tu respuesta es incorrecta!'; 
            speakView = 'Puedes intentarlo nuevamente iniciando la trivia';
        }
        if(aplSupport) {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakView,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
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
        if(aplSupport) {
            return responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: triviaAPL, 
                datasources: {
                    bodyTemplate3Data: {
                        type: 'object', 
                        content: {
                            backgroundImage: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            title: 'Triviate', 
                            imageSmall: 'https://imagestrivia.s3.amazonaws.com/ch1.png',
                            subtitle: '', 
                            primaryText: speakOutput,
                            bulletPoint: '',
                            logoUrl: 'https://imagestrivia.s3.amazonaws.com/triviat.png'
                        }
                    }
                }
            })
            .getResponse();
        } else {
            return responseBuilder
            .speak(speakText)
            .reprompt(speakRepromp)
            .getResponse();
        }
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
