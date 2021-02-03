//a list of available database columns
const options = [
  {
    id: 999,
    title: "",
    type: "both",
    message: "no value",
    format: "none"
  },
  {
    id: 1,
    title: "",
    type: "both",
    message: "Sesar Selection",
    format: "defaultValue"
  },
  {
    id: 2,
    title: "user_code",
    type: "text",
    message: "check SESAR database",
    format: "one2one"
  },
  {
    id: 3,
    title: "original_archive",
    type: "text",
    message: "Name of institution",
    format: "one2one"
  },
  {
    id: 4,
    title: "current_archive",
    type: "text",
    format: "one2one"
  },
  {
    id: 5,
    title: "platform_name",
    type: "text",
    format: "one2one"
  },
  {
    id: 6,
    title: "cruise_field_prgrm",
    type: "text",
    message:
      "Name or identifier of the field program during which the sample was collected.",
    format: "one2one"
  },
  {
    id: 7,
    title: "name",
    type: "text",
    message: "The Name of the sample.",
    format: "one2one"
  },
  {
    id: 8,
    title: "collection_method",
    type: "text",
    message: "Method by which the sample was collected",
    format: "one2one"
  },
  {
    id: 9,
    title: "collection_start_date",
    type: "numbers",
    message:
      "Date when the sample was collected. The format is YYYY-MM-DDTHH:MM:SSZ",
    format: "one2one"
  },
  {
    id: 10,
    title: "collection_end_date",
    type: "numbers",
    message: "Date when the sample collection was finished",
    format: "one2one"
  },
  {
    id: 11,
    title: "latitude",
    key: "numbers",
    message:
      "Latitude of the location where the sample was collected. (Start latitude for linear sampling features)",
    format: "one2one"
  },
  {
    id: 12,
    title: "latitude_end",
    key: "numbers",
    message:
      "End latitude of the location where the sample was collected (WGS84)",
    format: "one2one"
  },
  {
    id: 13,
    title: "longitude",
    key: "numbers",
    message:
      "Longitude of the location where the sample was collected. (Start longitude for linear sampling features)",
    format: "one2one"
  },
  {
    id: 14,
    title: "longitude_end",
    key: "numbers",
    message:
      "End longitude of the location where the sample was collected (WGS84)",
    format: "one2one"
  },
  {
    id: 15,
    title: "elevation",
    key: "numbers",
    message:
      "Elevation at which a sample was collected (in meters). Use negative values for depth below sea level",
    format: "one2one"
  },
  {
    id: 16,
    title: "elevation_end",
    key: "numbers",
    message: "End elevation at which a sample was collected",
    format: "one2one"
  },
  {
    id: 17,
    title: "collector",
    type: "text",
    message:
      "Name of the person who collected the sample or name of chief scientist for larger field programs",
    format: "one2one"
  },
  {
    id: 18,
    title: "primary_location_type",
    type: "text",
    message:
      "Physiographic feature or type of feture that your sample was collected from",
    format: "one2one"
  },
  {
    id: 19,
    title: "igsn",
    type: "numbers",
    message: "(AUTOMATIC) The 9-digit IGSN of the sample",
    format: "one2one"
  },
  {
    id: 20,
    title: "classification",
    type: "text",
    message: "Classification",
    format: "one2one"
  },
  {
    id: 21,
    title: "material",
    type: "text",
    message: "check SESAR database",
    format: "one2one"
  },
  {
    id: 22,
    title: "elevation_unit",
    type: "text",
    message: "check SESAR database",
    format: "one2one"
  },
  {
    id: 23,
    title: "sample_type",
    type: "text",
    message: "The type of sample which comes from a SESAR controlled list",
    format: "one2one"
  },
  {
    id: 24,
    title: "size",
    message: "Size of the registered object",
    type: "numbers",
    format: "multivalue"
  },
  {
    id: 25,
    title: "description",
    type: "text",
    message: "Any free 'text' comment about the sample",
    format: "multivalue"
  },
  {
    id: 26,
    title: "sample_comment",
    type: "text",
    format: "multivalue"
  },
  {
    id: 27,
    title: "geological_age",
    type: "numbers",
    message: "Age of a sample as described by the stratigraphic era",
    format: "multivalue"
  },
  {
    id: 28,
    title: "field_name",
    type: "text",
    message: "Keyed List / Order Pair of Values (Ex: [FACILITY CODE: MARS])",
    format: "multivalue"
  }
];

module.exports = { options };
