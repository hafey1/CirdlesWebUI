import Tabulator from "tabulator-tables";

/**
 * A function that determines whether a Tabulator cell should be editable. To be provided as the "editable"
 * property on a column data object.
 * 
 * @param {Tabulator.CellComponent} cell 
 */
export function cellIsEditable(cell) {
  return cell.getData()[cell.getField()];
}

/**
 * A custom text editor that only commits new values if they are parseable to a number.
 * 
 * @param {Tabulator.CellComponent} cell 
 * @param {() => void} onRendered 
 * @param {(any) => void} success   // passes the successfully updated value to the Tabulator
 * @param {(any) => void} cancel    // cancels the edit, reverting to the previous value
 * @param {Tabulator.EditorParams} editorParams 
 */
export function NumberEditor(cell, onRendered, success, cancel, editorParams) {

  let editor = document.createElement("input");

  editor.setAttribute("type", "text");

  // Create and style input
  editor.style.padding = "3px";
  editor.style.width = "100%";
  editor.style.boxSizing = "border-box";
  editor.style.fontFamily = "\'Lucida Console\', monospace";

  editor.value = cell.getValue();

  // Set focus on the select box when the editor is selected
  onRendered(() => {
    editor.focus();
    // editor.style.css = "100%";
  });

  // Commit edit only if value is a number
  editor.addEventListener("blur", () => {
    const value = +editor.value;
    if (isNaN(value)) cancel(); 
    else success(value);
  });
  return editor;
};

/**
 * A custom checkbox editor. If the cell's row has child rows, then the boolean value for that cell's field
 * is applied to each of the child rows.
 * 
 * @param {Tabulator.CellComponent} cell 
 * @param {() => void} onRendered 
 * @param {(any) => void} success   // passes the successfully updated value to the Tabulator
 * @param {(any) => void} cancel    // cancels the edit, reverting to the previous value
 * @param {Tabulator.EditorParams} editorParams 
 */
export function BooleanEditor(cell, onRendered, success, cancel, editorParams) {
  let editor = document.createElement("input");

  editor.setAttribute("type", "checkbox");

  editor.checked = cell.getValue();

  onRendered(() => {
    editor.focus();
  });

  editor.addEventListener("blur", () => {
    const value = editor.checked,
          children = cell.getRow().getTreeChildren();
    children.forEach(child => {
      child.getData()[cell.getField()] = value;
    });
    success(value);
  });

  return editor;
}