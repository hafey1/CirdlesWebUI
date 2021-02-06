import Modal from "react-modal";
import React, { useState } from "react";
import { dialogFilter } from "../../util/helper";

export const PreviewModal = props => {
  const [modalShow, setModalShow] = useState(false);
  const previewMapping = entry => {
    return <p>{entry[0] + " :: " + entry[1].join(";") + "\n"}</p>;
  };

  return (
    <div>
      <button onClick={() => setModalShow(true)}>Preview Mapping</button>
      <Modal
        isOpen={modalShow}
        onRequestClose={() => setModalShow(false)}
        contentLabel="Preview Mapping"
      >
        <h3>Sesar Mappings</h3>
        <button onClick={() => setModalShow(false)}>close window</button>
        {dialogFilter(props.ent).map(element => previewMapping(element))}
      </Modal>
    </div>
  );
};
