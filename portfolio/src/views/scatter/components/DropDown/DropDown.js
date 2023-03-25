import React, { useRef } from "react";
import "./DropDown.css";

const ItemElement = ({
  value,
  className = "bx bx-folder",
  label,
  setChosenOption,
}) => {
  return (
    <div onClick={() => setChosenOption(value)}>
      <i className={className}></i>
      {label}
    </div>
  );
};

const DropDown = ({
  xOffset = 220,
  yOffset = 140,
  setChosenOption,
  listOptions,
  dropDownTitle,
}) => {
  const arrowRef = useRef();
  const dropdownRef = useRef();

  return (
    <div
      className="container"
      style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
    >
      <button
        className="btn"
        onClick={(e) => {
          dropdownRef.current.classList.toggle("show");
          arrowRef.current.classList.toggle("arrow");
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {dropDownTitle}
        <i ref={arrowRef} className="bx"></i>
      </button>

      <div
        className="dropdown"
        ref={dropdownRef}
        onClick={(e) => {
          if (dropdownRef.current.classList.contains("show")) {
            dropdownRef.current.classList.toggle("show");
            arrowRef.current.classList.toggle("arrow");
          }
        }}
      >
        {listOptions
          ? listOptions.map((option) => (
              <ItemElement
                value={option.value}
                label={option.label}
                setChosenOption={setChosenOption}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default DropDown;
