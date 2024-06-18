import {
  getStyleObjectFromString,
  getStyleStringFromObject,
  formatStringToKebabCase,
  formatStringToCamelCase,
} from "@/utils/convert";
import HTMLReactParser from "html-react-parser";

// function to update style of a content
export const updateStyle = (
  rows,
  rowIndex,
  columnIndex,
  contentIndex,
  property,
  value
) => {
  return rows.map((row, index) => {
    if (index === +rowIndex) {
      const arr = row.columns.map((column, index) => {
        if (index === +columnIndex) {
          const arr = column.contents.map((content, index) => {
            if (index === +contentIndex) {
              let code = content.content;
              const preCode = code.slice(0, code.indexOf("style=") + 7);
              const restCode = code.slice(code.indexOf(">") - 1);
              let style = code.slice(
                code.indexOf("style=") + 7,
                code.indexOf(">") - 1
              );
              const objStyle = getStyleObjectFromString(style);
              objStyle[formatStringToCamelCase(property)] = value;
              code = `${preCode}${getStyleStringFromObject(
                objStyle
              )}${restCode}`;
              content.content = code;
              content.contentCode = HTMLReactParser(code);
              return content;
            } else {
              return content;
            }
          });
          return { ...column, contents: arr };
        } else {
          return column;
        }
      });
      return { ...row, columns: arr };
    } else {
      return row;
    }
  });
};

// function to update style of a row
export const updateRowStyle = (rows, rowIndex, property, value) => {
  return rows.map((row, index) => {
    if (index === +rowIndex) {
      const obj = getStyleObjectFromString(row.rowStyle);
      obj[formatStringToCamelCase(property)] = value;
      row.rowStyle = getStyleStringFromObject(obj);
      return row;
    } else {
      return row;
    }
  });
};

// function to update style of a content area
export const updateContentAreaStyle = (rows, rowIndex, property, value) => {
  return rows.map((row, index) => {
    if (index === +rowIndex) {
      const obj = getStyleObjectFromString(row.contentAreaStyle);
      obj[formatStringToCamelCase(property)] = value;
      row.contentAreaStyle = getStyleStringFromObject(obj);
      return row;
    } else {
      return row;
    }
  });
};

// function to update style of a column
export const updateColumnStyle = (
  rows,
  rowIndex,
  columnIndex,
  property,
  value
) => {
  return rows.map((row, index) => {
    if (index === +rowIndex) {
      const arr = row.columns.map((column, index) => {
        if (index === +columnIndex) {
          const obj = getStyleObjectFromString(column.columnStyle);
          obj[formatStringToCamelCase(property)] = value;
          column.columnStyle = getStyleStringFromObject(obj);
          return column;
        } else {
          return column;
        }
      });
      return { ...row, columns: arr };
    } else {
      return row;
    }
  });
};
