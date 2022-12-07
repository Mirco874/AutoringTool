import { useElements } from "../../../hooks";
import { Navbar } from "../../../UI/components";
import { Panel, PanelEditor, QuizModal } from "../../components";
import { exportJsonFS } from "../../helpers";
import "./EditorPage.css";

export const EditorPage = () => {
  const initialElementsList = [];

  const {
    elements,
    onAddChapter,
    onAddMulChoiseQuest,
    onAddShortTextQuest,
    onAddTFQuest,
    onUpdateElmenet,
    onRemoveElement,
    setElements
  } = useElements(initialElementsList);

  return (
    <>
      <Navbar title={"Authoring tool."} elements={elements} setElements={setElements} />
      <main className="main">
        <aside className="side-bar mx-2 postition-fixed ">
          <PanelEditor onAddChapter={onAddChapter} />
        </aside>
        <section className="panel-section">
          <QuizModal
            onAddMulChoiseQuest={onAddMulChoiseQuest}
            onAddTFQuest={onAddTFQuest}
            onAddShortTextQuest={onAddShortTextQuest}
          />
          <Panel
            elements={elements}
            onUpdateElmenet={onUpdateElmenet}
            onRemoveElement={onRemoveElement}
          />
        </section>
      </main>
    </>
  );
};
