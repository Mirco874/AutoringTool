import { generateSCORM } from "../../../AuthoringTool/utils/generateSCORMFiles";
import { generateXAPI } from "../../../AuthoringTool/utils/generatexAPIFiles";
import { Dropdown } from "../Dropdown/Dropdown";
import "./NavBar.css";
export const Navbar = ({ title, dropdownList,elements,setElements,metadata,setMetadata }) => {
  return (
    <nav className="nav-bar d-flex flex-row justify-content-between mb-3">
      <h1 className="nav-title">{title}</h1>
      <button onClick={()=>{generateSCORM(metadata,elements)}}>Export SCROM</button>
      <button onClick={()=>{generateXAPI(metadata,elements)}}>Export XAPI</button>
      {dropdownList.map((dropdownItem)=>(<Dropdown key={dropdownItem.buttonText} dropdowncontent={dropdownItem} elements={elements} setElements={setElements} metadata={metadata} setMetadata={setMetadata} />))}
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
