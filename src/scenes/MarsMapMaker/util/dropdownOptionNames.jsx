import React from "react";

//These are different variables to make the filter function in Dropdown more readable
//  the name corresponds to which options from ./sesarOptions.js are accepted by the filter

export const userCodeDropdownOption = ftitle => {
  return (
    <option key={ftitle} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const metaDataAddDropdownOption = ftitle => {
  return (
    <option key={ftitle} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const multiValueDropdownOption = ftitle => {
  return (
    <option style={{ fontStyle: "italic" }} key={ftitle} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const one2OneDropdownOption = ftitle => {
  return (
    <option key={ftitle} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const noneDropdownOption = () => {
  return <option value="none">none</option>;
};
