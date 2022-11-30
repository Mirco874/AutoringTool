import { useState } from "react";

export const ShortAnswerQuestion = ({ body, onUpdateElmenet,onRemoveElement }) => {
  const [questionBody, setQuestionBody] = useState(body);
  const { index, question, answer } = questionBody;

  const onQuestionChange = ({ target }) => {
    const { name, value } = target;

    setQuestionBody({
      ...questionBody,
      [name]: value,
    });
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
      <label>Answer: </label>
        <input
          type="text"
          name="answer"
          value={answer}
          onChange={(e) => onQuestionChange(e)}
        />
        <br />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => {
            onUpdateElmenet(questionBody);
          }}
        >
          save
        </button>
        <button className="btn btn-danger ms-2" onClick={()=>{onRemoveElement(index)}}>remove</button>
      </div>
    </div>
  );
};
