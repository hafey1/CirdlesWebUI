import Modal from "react-modal";
import React, { useState } from "react";
import { dialogFilter } from "../../util/helper";

export const PreviewModal = props => {
  const [modalShow, setModalShow] = useState(false);
  const previewMapping = entry => {
    return <tr>
        <td>{entry[0]}</td>
        <td>{entry[1].join(";")}</td>
      </tr>;
  };

  return (
    <div>
      <button className="btn bg-white btn-outline-dark btn-middle" onClick={() => setModalShow(true)}>Preview Mapping</button>
      <Modal
        isOpen={modalShow}
        onRequestClose={() => setModalShow(false)}
        contentLabel="Preview Mapping"
      >
        <button className="btn bg-white btn-outline-dark float-right" onClick={() => setModalShow(false)}>
          x
        </button>
        <h3>Sesar Mappings</h3>
        <table class="table table-striped">
          <tbody>
          {dialogFilter(props.ent).map(element => previewMapping(element))}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
