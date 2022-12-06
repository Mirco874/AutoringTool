import { useState } from "react";
import { useCounter } from "../../../hooks";

export const TFQuestion = ({ body,onUpdateElmenet,onRemoveElement }) => {
    const [questionBody, setQuestionBody] = useState(body);
    const {index,question, answer,reference } = questionBody;


    const onQuestionChange = ({ target }) => {
        const { name, value,checked } = target;
        if(name==="question" || name==="reference"){
          setQuestionBody({
            ...questionBody,
              [name]: value,
          });
        }
        else{
          setQuestionBody({
            ...questionBody,
              answer: checked,
          }); 
        }

      };



  return (
    <div className="card">
      <div className="card-header">
        <label className="me-2">Question: </label>
        <input
          type={"text"}
          placeholder="Insert question"
          onChange={(e) => onQuestionChange(e)}
          name="question"
          value={question}
        ></input>
      </div>
      <div className="card-body mx-auto">
        <input type="checkbox" name= {`${index}-TFanswer`} checked={answer} onChange={(e)=>{onQuestionChange(e)}} /><label >True</label> 
        <br />
        <br />
          <div className="d-flex flex-row">
            <p>reference(optional):</p> <input type="text" className="w-25 h-25" value={reference} name={`reference`} onChange={(e) => onQuestionChange(e)}/>
          </div>
        <br />
        <button className="btn btn-primary" onClick={()=>{onUpdateElmenet(questionBody)}}>save</button>
        <button className="btn btn-danger ms-2" onClick={()=>{onRemoveElement(index)}}>remove</button>
      </div>
    </div>
  )
}
