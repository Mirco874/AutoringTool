import { useElementsList } from "../useElementsList/useElementsList";

export const useElements = (initialElementsList = []) => {
  const {elements,onAddElement,onUpdateElmenet,onRemoveElement,setElements}=useElementsList(initialElementsList);
  
  const onAddChapter = () => {
    const emptyChapter = {
      type: "text",
      htmlContent: "",
    };
    onAddElement(emptyChapter);
  };

  const onAddMulChoiseQuest = () => {
    const emptyMulChoiQuest = {
      type: "question",
      question_type: "multiple",
      question: "a",
      question: "",
      options: [],
      reference:"",
    };
    onAddElement(emptyMulChoiQuest);
    
  };

  const onAddTFQuest = () => {
    const emptyTFQuest = {
      type: "question",
      question_type: "tf",
      question: "",
      answer: false,
      reference:"",
    };
    onAddElement(emptyTFQuest);
  };

  const onAddShortTextQuest = () => {
    const emptyShortTestQuest = {
      type: "question",
      question_type: "word",
      question: "",
      answer: "",
      reference:"",
    };
    onAddElement(emptyShortTestQuest);
  };

  return {
    elements,
    onAddChapter,
    onAddMulChoiseQuest,
    onAddShortTextQuest,
    onAddTFQuest,
    onUpdateElmenet,
    onRemoveElement,
    setElements
  };
};
