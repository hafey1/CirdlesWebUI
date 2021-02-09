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
        <button className="btn bg-white btn-outline-dark float-right" onClick={() => setModalShow(false)}>
          X
        </button>
        <h3>Sesar Mappings</h3>
        {dialogFilter(props.ent).map(element => previewMapping(element))}
      </Modal>
    </div>
  );
};
