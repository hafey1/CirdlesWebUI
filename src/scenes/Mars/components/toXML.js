import { SESAR_BASE_URL } from "../../../constants/api";

// @flow
function toXML(samples, usercode) {
  //create document
  let doc = document.implementation.createDocument(
    SESAR_BASE_URL,
    "samples",
    null
  );
  doc.documentElement.setAttributeNS(
    "http://www.w3.org/2001/XMLSchema-instance",
    "xsi:schemaLocation",
    SESAR_BASE_URL + "/samplev2.xsd"
  );

  for (let i = 0; i < samples.length; i++) {
    //create sample
    let sampleNode = document.createElementNS(SESAR_BASE_URL, "sample");
    sampleNode
      .appendChild(document.createElementNS(SESAR_BASE_URL, "user_code"))
      .appendChild(document.createTextNode(usercode));
    doc.documentElement.appendChild(sampleNode);

    //TEST: ADD REQUIRED attributes
    /*sampleNode
        .appendChild(
          document.createElementNS("http://app.geosamples.org", "sample_type")
        )
        .appendChild(document.createTextNode("Core"));
    sampleNode
      .appendChild(document.createElementNS(SESAR_BASE_URL, "material"))
      .appendChild(document.createTextNode("Rock"));
    sampleNode
      .appendChild(document.createElementNS(SESAR_BASE_URL, "elevation_unit"))
      .appendChild(document.createTextNode("meters"));*/

    //add attributes, excepting user_code which is handled above
    for (let j = 0; j < samples[i].length; j++) {
      if (samples[i][j].key) {
        if (samples[i][j].key != "user_code") {
          let node = document.createElementNS(
            SESAR_BASE_URL,
            samples[i][j].key
          );
          node.appendChild(document.createTextNode(samples[i][j].value));
          sampleNode.appendChild(node);
        }
      }
    }
  }

  return doc;
}

export default toXML;
