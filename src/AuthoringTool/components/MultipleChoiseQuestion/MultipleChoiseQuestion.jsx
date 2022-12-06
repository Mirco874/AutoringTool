import { useState } from "react";
import { useCounter } from "../../../hooks";
import { MultipleChoiseInput } from "../MultipleChoiseInput/MultipleChoiseInput";

export const MultipleChoiseQuestion = ({ body,onUpdateElmenet,onRemoveElement }) => {

  const [questionBody, setQuestionBody] = useState(body);
  const {index, question, options,reference } = questionBody;
  const {counter,increment}= useCounter(1);

  const onAddOption = () => {
    const emptyOption = {
      index: `${index}-${counter}` ,
      content: "",
      state: false,
    };
    increment(1);

    setQuestionBody({
      ...questionBody,
      options: [...options, emptyOption],
    });

  };

  const onQuestionChange = ({ target }) => {
    const { name, value } = target;
console.log(name,value)
    setQuestionBody({
      ...questionBody,
      [name]: value,
    });
  };

  const onInputChange = (event, inputIndex) => {
    const { value } = event.target;

    let optionList = options.filter(({ index }) => inputIndex != index); ///preguntar

    const targetOption = options.find(({ index }) => {
      return inputIndex == index;
    });
    targetOption.content = value;

    optionList.push(targetOption);

    optionList.sort((a, b) => 
      {
      return (a.index.substring(a.index.length-1,a.index.length) - b.index.substring(a.index.length-1,a.index.length))
      }
      
      );

    setQuestionBody({ ...questionBody, options: optionList });
  };

  const onCheckChange = (event, id) => {
    //encontrar
    const targetOption = options.find(({ index }) => {
      return id == index;
    });

    //eliminar
     let optionList = options.filter(({ index }) => id != index); 

    targetOption.state = !targetOption.state;

    optionList.push(targetOption);

    optionList.sort((a, b) => 
      {
      return (a.index.substring(a.index.length-1,a.index.length) - b.index.substring(a.index.length-1,a.index.length))
      }
      );

    setQuestionBody({ ...questionBody, options: optionList });
  };

  return (
    <div className="card">
      <div className="card-header">
        <label className="me-2">Question: </label>
        <input
          type={"text"}
          placeholder="Insert question"
          onChange={(e) => onQuestionChange(e)}
          name={"question"}
          value={question}
        ></input>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Question</th>
              <th scope="col">correct answer</th>
            </tr>
          </thead>
          <tbody>
            {options.map(({ index, content, state }) => (
              <tr key={index}>
                <MultipleChoiseInput
                  index={index}
                  content={content}
                  state={state}
                  onInputChange={onInputChange}
                  onCheckChange={onCheckChange}
                />
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-light" onClick={() => onAddOption()}>
          add option
        </button>
        <br />
        <br />
        <div className="d-flex flex-row">
          <p>reference(optional):</p> <input type="text" value={reference} className="w-25 h-25" name={`reference`} onChange={(e) => onQuestionChange(e)}/>
        </div>
        <br />
        <button className="btn btn-primary" onClick={()=>{onUpdateElmenet(questionBody)}}>save</button>
        <button className="btn btn-danger ms-2" onClick={()=>{onRemoveElement(index)}}>remove</button>
      </div>
    </div>
  );
};
