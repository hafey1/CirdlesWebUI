const html_beautify = require("js-beautify").html;

const XML_DOCTYPE = `<?xml version="1.0" encoding="UTF-8"?>`,
  SVG_DOCTYPE_PUBLIC = "-//W3C//DTD SVG 1.1//EN",
  SVG_DOCTYPE_SYSTEM = "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd";

export function svgElementToBlob(svgElement) {
  const svg = svgElement.cloneNode(true);
  svg.removeAttribute("id");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("version", "1.1");

  const xml =
    XML_DOCTYPE +
    `\n<!DOCTYPE svg PUBLIC \"${SVG_DOCTYPE_PUBLIC}\" \"${SVG_DOCTYPE_SYSTEM}\">\n` +
    html_beautify(svg.outerHTML, {
      indent_size: 2
    });
  
  return new Blob([xml], {
    type: "image/svg+xml"
  });
}
