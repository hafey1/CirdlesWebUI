import React from "react";

//These are different variables to make the filter function in Dropdown more readable
//  the name corresponds to which options from ./sesarOptions.js are accepted by the filter

export const userCodeDropdownOption = (ftitle, fid) => {
  return (
    <option key={fid} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const metaDataAddDropdownOption = (ftitle, fid) => {
  return (
    <option key={fid} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const multiValueDropdownOption = (ftitle, fid) => {
  return (
    <option style={{ fontStyle: "italic" }} key={fid} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const one2OneDropdownOption = (ftitle, fid) => {
  return (
    <option key={fid} value={ftitle}>
      {ftitle}
    </option>
  );
};

export const noneDropdownOption = fid => {
  return (
    <option key={fid} value="none">
      none
    </option>
  );
};
