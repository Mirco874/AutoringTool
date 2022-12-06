import { generateSCORM } from "../../../AuthoringTool/utils/generateSCORMFiles";
import { Dropdown } from "../Dropdown/Dropdown";
import "./NavBar.css";
export const Navbar = ({ title, dropdownList,elements,setElements }) => {
  return (
    <nav className="nav-bar d-flex flex-row justify-content-between mb-3">
      <h1 className="nav-title">{title}</h1>
      <button onClick={()=>{generateSCORM(elements)}}>Export SCROM</button>
      {dropdownList.map((dropdownItem)=>(<Dropdown key={dropdownItem.buttonText} dropdowncontent={dropdownItem} elements={elements} setElements={setElements} />))}
    </nav>
  );
};




Navbar.defaultProps = {
  title: "",
  dropdownList: [
    {
      buttonText: "",
      options: [{text: "",funct: () => {},}],
    },
  ],
};
