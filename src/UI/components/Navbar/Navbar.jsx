import { Dropdown } from "../Dropdown/Dropdown";
import "./NavBar.css";
export const Navbar = ({ title, dropdownList,elements }) => {
  return (
    <nav className="nav-bar d-flex flex-row justify-content-between mb-3">
      <h1 className="nav-title">{title}</h1>
      {dropdownList.map((dropdownItem)=>(<Dropdown key={dropdownItem.buttonText} dropdowncontent={dropdownItem} elements={elements} />))}
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
