import { get, getBlobFile, post } from "./fetch";

const createText=(textId,htmlContent)=>{
    return `<div id=text-${textId}>
                ${htmlContent}
            </div>`;
}

const createBadResponseCard=(id,message)=>{
    return `
    <div class="card border-danger" id="bad-response-question-${id}" style="max-width: 100vh;" hidden>
        <div class="card-body text-danger">
        <h6 class="card-title">Respueta incorrecta</h6>
        <p class="card-text">${message}</p>
        </div>
    </div>
    `
}


const createMCOption=(questionId,value,optionIndex)=>{
    return `<div class="form-check">
                <input  class="check-input form-check-input question-${questionId} multiple-choise-input" 
                        type="checkbox" 
                        value="${value}" 
                        id="flexCheckChecked${optionIndex}" >
                <label class="form-check-label" for="flexCheckChecked${optionIndex}}">${value}</label>
            </div>
            `;
}


const createMCQuestion=(index,question,optionsList)=>{

    let optionsHtml=``;
    optionsList.forEach(option => {
        optionsHtml+=createMCOption(index,option.content,option.index);
    });

    return `<div class="card shadow-none p-3 rounded">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                    <h5 class="card-title">${question}</h5>

                    <div class="form-group multiple-choise-question" id="${index}">
                        ${optionsHtml}
                    </div>

                </div>
            </div>
            
            
            `;
}


const createTFQuestion=(index,question)=>{
    const name=question.replace(/ /g, "");

    return `<div class="card shadow-none p-3 rounded">
                <div class="card-body">
                    <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                    <h5 class="card-title">${question}</h5>
                    <div class=" form-group d-flex flex-row true-false-question" id="${index}">

                        <div class="form-check">
                            <input class="form-check-input question-${index} true-false-input" type="radio" name="flexRadio${name}" id="flexRadio${name}1" value="true" >
                            <label class="form-check-label" for="flexRadio${name}1">True</label>
                        </div>

                        <div class="form-check mx-3">
                            <input class="form-check-input question-${index} true-false-input" type="radio" name="flexRadio${name}" id="flexRadio${name}2" value="false" >
                            <label class="form-check-label" for="flexRadio${name}2">False</label>
                        </div>

                    </div>
                </div>
            </div>`;
}

const createSAQuestion=(index,question)=>{
    return `<div class="card shadow-none p-3 rounded question" >
                <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Pregunta ${index}.</h6>
                <h5 class="card-title">${question}</h5>
            
                <div class="input-group short-response-question" id="${index}">
                    <div class="input-group-prepend ">
                    <span class="input-group-text">Tú respuesta:</span>
                    </div>
                    <input type="text" class="form-control question-${index} short-text-input" id="answer-input">
                </div>

                </div>
            </div>`;
}

const generateInteractiveContent=(content)=>{
    let htmlForm=``;
    content.forEach((item)=>{
        console.log(item)
    const {type}=item;  

        if(type==="text"){
            const {index,htmlContent}=item;
            htmlForm+=createText(index,htmlContent);
            }

        if(type==="question"){
            const {index,question_type,question,failedMessage}=item;
            if(question_type==="multiple"){
                htmlForm+=createMCQuestion(index,question,item.options);
                

            }
            if(question_type==="tf"){
                htmlForm+=createTFQuestion(index,question);

            }
            if(question_type==="word"){
                htmlForm+=createSAQuestion(index,question);
            }
            htmlForm+=createBadResponseCard(index,failedMessage);
        }
    })
    return htmlForm;
}

const getCorrectAnswer=(answerList)=>{
    let response=``;

    for (var i = 0; i < answerList.length; i++) {
        console.log(answerList[i])
        if(answerList[i].state===true){
            response+=`"${answerList[i].content}"`;
            if(i<answerList.length-1){
                response+=`,`;
            }
        }
      }
      return response;
}


const generateScript=(content)=>{
    let questionsResponseExpected=``;
    let totalQuestions=0;
    const pointsPerQuestion=100/content.length;
    content.forEach((item)=>{
        const {type}=item;
        if(type==="question")
        {
            totalQuestions++;
            const {index,question_type,answer,points,failedMessage}=item;
            if(question_type==="multiple"){
                questionsResponseExpected+=`{ 
                                            number:${index},
                                            correctAnswer:[${getCorrectAnswer(item.options)}],
                                            points:${parseInt(points)},
                                            failedMessage:"${failedMessage.toString()}"
                                            },`;
            }
            else{
                questionsResponseExpected+=`{ 
                                            number:${index},
                                            correctAnswer:["${answer}"],
                                            points:${parseInt(points)},
                                            failedMessage:"${failedMessage.toString()}"
                                            },`;
                }
        }

    })
    

    return `
    let totalScore=0;
    let totalAttemps=0;
    let incorrectResponses=0;
    const minScore=0;
    const maxScore=100;
    const minimalNoteToAprove=51;
    const questionsResponseExpected=[${questionsResponseExpected}];`;
}






const generateHtml=(content)=>{
    let htmlInteractiveContent=generateInteractiveContent(content);
    let script=generateScript(content);

    return `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                        <link rel="stylesheet" href="../styles/form-styles.css">
                        <title>Ejemplo del cuestionario final</title>
                    </head>
                    <body>
                        <main class="mx-auto">
                            <h1>Cuestionario 2022 </h1>
                            ${htmlInteractiveContent}
                            <button class="btn btn-outline-primary d-block mb-5" id="evaluation-button" onclick='setPointsPerQuestion()'>Enviar</button>
                        </main>
                        <script src="scormfunctions.js" type="text/javascript"></script>
                        <script>
                            ${script}
                        </script>
                        <script src="../scripts/form-script.js"></script>    
                    </body>
            </html>`;
}

const generateManifest=()=>{
    return `<manifest 
    identifier="com.scorm.eva.2_2022.group_5" 
    version="1">
<metadata> 
    <schema>ADL SCORM</schema>
    <schemaversion>2004 3rd Edition</schemaversion>
</metadata>
<organizations>
    <organization identifier="eva_2022">
        <title>EVA 2022</title>
        <item identifier="item_1" identifierref="resource_1">
            <title>Cuestionario</title>
            <imsss:sequencing>
            <imsss:deliveryControls completionSetByContent="true" objectiveSetByContent="true"/>
            </imsss:sequencing>
        </item>
        <imsss:sequencing>
            <imsss:controlMode choice="true" flow="true"/>
        </imsss:sequencing>
    </organization>
</organizations>

<resources>
    <resource identifier="resource_1" type="webcontent" adlcp:scormType="sco" href="shared/main.html">
        <file href="shared/main.html"/>
    </resource>
</resources>

</manifest>`;
}

const createHtmlFile=(htmlContent)=>{
    const url="http://localhost:3001/editor";
    const jsonBody={
        standar:"scorm",
        type:"main",
        content:htmlContent
    }
    post(url,jsonBody)
}

const createManifestFile=(manifestContent)=>{
    const url="http://localhost:3001/editor";
    const jsonBody={
        standar:"scorm",
        type:"manifest",
        content:manifestContent
    }
    post(url,jsonBody)
}

const downloadScormZip=()=>{
    const url="http://localhost:3001/generate-scorm";
    const currentDate = (new Date()).toLocaleString();
    const fileName=`scorm_${currentDate}`;
    getBlobFile(url,fileName)
}


export const generateSCORM=(content)=>{
    const htmlContent=generateHtml(content);
    const manifestContent=generateManifest();
    console.log(htmlContent);
    createHtmlFile(htmlContent);
    createManifestFile(manifestContent)
    downloadScormZip();
} 