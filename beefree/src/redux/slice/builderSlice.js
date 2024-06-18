import { createSlice } from "@reduxjs/toolkit";
import HTMLReactParser from "html-react-parser";
import { isImageLink } from "@/utils/regex";
import {
  getStyleStringFromObject,
  getStyleObjectFromString,
} from "@/utils/convert";
import {
  updateContentAreaStyle,
  updateRowStyle,
  updateStyle,
} from "@/core/builder";

const initialState = {
  data: {
    generalStyle: "",
    contentGeneralStyle: "width: 745px; margin-left: auto; margin-right: auto;",
    rows: [],
  },
  isUploadFile: false,
  contentIndex: null,
  rowIndex: null,
  columnIndex: null,
  isChangeIconImage: null,
  isRowEdit: null,
  isInsertRowImageBg: null,
  isInsertGeneralImageBg: null,
  backgroundImageArea: "ROW",
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addContent: (state, action) => {
      let temp = state.data.rows;
      if (state.data.rows.length) {
        temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            if (row.columns.length) {
              const arr = row.columns.map((column, index) => {
                if (index === +state.columnIndex) {
                  if (column.contents.length) {
                    const arr = [];
                    column.contents.forEach((item, index) => {
                      if (+action.payload.tagIndex === +index) {
                        if (!action.payload.isAppend) {
                          arr.push(action.payload.tag);
                          arr.push(item);
                        } else {
                          arr.push(item);
                          arr.push(action.payload.tag);
                        }
                      } else {
                        arr.push(item);
                      }
                    });
                    return {
                      ...column,
                      contents: arr,
                    };
                  } else {
                    let value = 0;
                    row?.columns?.forEach((column) => {
                      if (+column?.colSpan) {
                        value += +column.colSpan;
                      }
                    });
                    return {
                      columnStyle: "",
                      colSpan: 6,
                      ...column,
                      contents: [action.payload.tag],
                    };
                  }
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return {
                rowStyle: "",
                contentAreaStyle: "",
                columns: [
                  {
                    columnStyle: "",
                    colSpan: 6,
                    contents: [action.payload.tag],
                  },
                ],
              };
            }
          } else {
            return row;
          }
        });
      } else {
        temp.push({
          rowStyle: "",
          contentAreaStyle: "",
          columns: [
            {
              columnStyle: "",
              colSpan: 6,
              contents: [action.payload.tag],
            },
          ],
        });
      }
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContent: (state, action) => {
      let temp;
      if (action.payload?.tagIndex || +action.payload?.tagIndex === 0) {
        temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (+index === +action.payload.tagIndex) {
                    content.content = action.payload.content;
                    content.contentCode = action.payload.code;
                    return content;
                  } else {
                    return content;
                  }
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
      } else if (action.payload?.contentId) {
        temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (+index === +action.payload.contentId) {
                    content.isShow = true;
                    return content;
                  } else if (content?.isShow) {
                    content.isShow = false;
                    return content;
                  } else {
                    return content;
                  }
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
      } else if (action.payload?.hideEditor) {
        temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (content.isShow) {
                    content.isShow = false;
                  }
                  return content;
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
      }
      if (temp) {
        state.data = {
          ...state.data,
          rows: temp,
        };
      }
    },
    changeUploadFileStatus: (state, action) => {
      state.isUploadFile = action.payload;
    },
    updateContentIndex: (state, action) => {
      state.contentIndex = action.payload;
    },
    updateRowIndex: (state, action) => {
      state.rowIndex = action.payload;
    },
    updateColumnIndex: (state, action) => {
      state.columnIndex = action.payload;
    },
    changeRowEditStatus: (state, action) => {
      state.isRowEdit = action.payload;
    },
    replicationContent: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = [];
              column.contents.forEach((content, index) => {
                const typeList = ["title", "paragraph", "list"];
                if (+index === +state.contentIndex) {
                  arr.push(content);
                  const newContent = {
                    ...content,
                  };
                  if (typeList.includes(newContent.id)) {
                    newContent.isShow = false;
                    arr.push(newContent);
                  } else {
                    arr.push(content);
                  }
                } else {
                  arr.push(content);
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteContent: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = [];
              column.contents.forEach((content, index) => {
                if (+index !== +state.contentIndex) {
                  arr.push(content);
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    sortContentList: (state, action) => {
      let temp;
      const activeId = action.payload.activeId;
      const overId = action.payload.overId;
      const rowActiveIndex = activeId.slice(
        activeId.indexOf("row_") + 4,
        activeId.indexOf("_column")
      );
      const columnActiveIndex = activeId.slice(
        activeId.indexOf("column_") + 7,
        activeId.indexOf("_content")
      );
      const contentActiveIndex = activeId.slice(
        activeId.indexOf("content_") + 8
      );
      if (overId.includes("_content_")) {
        const rowOverIndex = overId.slice(
          overId.indexOf("row_") + 4,
          overId.indexOf("_column")
        );
        const columnOverIndex = overId.slice(
          overId.indexOf("column_") + 7,
          overId.indexOf("_content")
        );
        const contentOverIndex = overId.slice(overId.indexOf("content_") + 8);
        if (
          +rowActiveIndex === +rowOverIndex &&
          +columnActiveIndex === +columnOverIndex &&
          +contentActiveIndex !== +contentOverIndex
        ) {
          const row = state.data.rows.find(
            (row, index) => index === +rowOverIndex
          );
          const column = row.columns.find(
            (column, index) => index === +columnOverIndex
          );
          const dragContent = column.contents.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = column.contents.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.data.rows.map((row, index) => {
            if (index === +rowOverIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(dragContent);
                    } else if (+contentActiveIndex === index) {
                      arr.push(dropContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        } else if (
          +rowActiveIndex === +rowOverIndex &&
          +columnActiveIndex !== +columnOverIndex
        ) {
          const row = state.data.rows.find(
            (row, index) => index === +rowOverIndex
          );
          const columnOver = row.columns.find(
            (column, index) => index === +columnOverIndex
          );
          const columnActive = row.columns.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.contents.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = columnOver.contents.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.data.rows.map((row, index) => {
            if (index === +rowOverIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(content);
                      arr.push(dragContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else if (index === +columnActiveIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        } else if (+rowActiveIndex !== +rowOverIndex) {
          const rowOver = state.data.rows.find(
            (row, index) => index === +rowOverIndex
          );
          const rowActive = state.data.rows.find(
            (row, index) => index === +rowActiveIndex
          );
          const columnOver = rowOver.columns.find(
            (column, index) => index === +columnOverIndex
          );
          const columnActive = rowActive.columns.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.contents.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = columnOver.contents.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.data.rows.map((row, index) => {
            if (index === +rowOverIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(content);
                      arr.push(dragContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else if (index === +rowActiveIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        }
      } else if (overId.includes("_column_")) {
        const rowOverIndex = overId.slice(
          overId.indexOf("row_") + 4,
          overId.indexOf("_column")
        );
        const columnOverIndex = overId.slice(overId.indexOf("column_") + 7);
        if (+rowActiveIndex === +rowOverIndex) {
          const row = state.data.rows.find(
            (row, index) => index === +rowOverIndex
          );
          const columnActive = row.columns.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.contents.find(
            (content, index) => index === +contentActiveIndex
          );
          temp = state.data.rows.map((row, index) => {
            if (index === +rowOverIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else if (index === +columnOverIndex) {
                  let value = 0;
                  row?.columns?.forEach((column) => {
                    if (+column?.colSpan) {
                      value += +column.colSpan;
                    }
                  });
                  return {
                    columnStyle: "",
                    colSpan: 6 - value,
                    ...column,
                    contents: [dragContent],
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        } else if (+rowActiveIndex !== +rowOverIndex) {
          const row = state.data.rows.find(
            (row, index) => index === +rowActiveIndex
          );
          const columnActive = row.columns.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.contents.find(
            (content, index) => index === +contentActiveIndex
          );
          temp = state.data.rows.map((row, index) => {
            if (index === +rowActiveIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else if (index === +rowOverIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnOverIndex) {
                  let value = 0;
                  row?.columns?.forEach((column) => {
                    if (+column?.colSpan) {
                      value += +column.colSpan;
                    }
                  });
                  return {
                    columnStyle: "",
                    colSpan: 6 - value,
                    ...column,
                    contents: [dragContent],
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        }
      } else if (overId?.includes("_row_")) {
        const rowOverIndex = overId.slice(overId.indexOf("row_") + 4);
        if (+rowActiveIndex !== +rowOverIndex) {
          temp = state.data.rows.map((row, index) => {
            if (index === +rowOverIndex) {
              return {
                rowStyle: "",
                contentAreaStyle: "",
                columns: [
                  {
                    columnStyle: "",
                    colSpan: 6,
                    contents: [dragContent],
                  },
                ],
              };
            } else if (index === +rowActiveIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.contents.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
        }
      }
      if (temp) {
        state.data = {
          ...state.data,
          rows: temp,
        };
      }
    },
    updateTitle: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (+index === +state.contentIndex) {
                  let code = content.content;
                  code = code.replaceAll(code.slice(1, 3), action.payload);
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateFontFamily: (state, action) => {
      let temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "font-family",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateFontWeight: (state, action) => {
      const value = action.payload === "Bold" ? "700" : "400";
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "font-weight",
        value
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateTextColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateLinkColor: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  let newCode = "";
                  while (code.indexOf("<a") > 0) {
                    newCode += code.slice(0, code.indexOf("<a") + 3);
                    code = code.slice(code.indexOf("<a") + 3);
                    if (
                      +code.indexOf("style=") < +code.indexOf(">") &&
                      +code.indexOf("style=") !== -1
                    ) {
                      newCode += code.slice(0, code.indexOf("style=") + 7);
                      code = code.slice(code.indexOf("style=") + 7);
                      let style = code.slice(0, code.indexOf(`"`));
                      code = code.slice(code.indexOf(`"`));
                      const styleObj = getStyleObjectFromString(style);
                      styleObj.color = action.payload;
                      newCode += getStyleStringFromObject(styleObj);
                    } else {
                      newCode +=
                        `style="color: ${action.payload};"` +
                        " " +
                        code.slice(0, code.indexOf(">") + 1);
                      code = code.slice(code.indexOf(">") + 1);
                    }
                  }
                  newCode += code;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateAlign: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "text-align",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateLineHeight: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "line-height",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateLetterSpacing: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "letter-spacing",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateFontSize: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "font-size",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateListStyleType: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "list-style-type",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateParagraphSpacing: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "row-gap",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePadding: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "padding",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePaddingLeft: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "padding-left",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePaddingRight: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "padding-right",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePaddingTop: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "padding-top",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePaddingBottom: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "padding-bottom",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    insertImage: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = `
                    <a href="#" style="display: flex; justify-content: center;">
                    <img src="${action.payload}" alt="" style="width: 75%; opacity: 1;"/>
                    </a>`;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateWidthImage: (state, action) => {
      const row = state.data.rows.find(
        (row, index) => index === +state.rowIndex
      );
      const column = row.columns.find(
        (column, index) => index === +state.columnIndex
      );
      const check = column.contents.every((content, index) => {
        if (index === +state.contentIndex) {
          if (content?.content?.includes("<a")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
      if (check) {
        let temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (index === +state.contentIndex) {
                    let code = content.content;
                    const preCode = code.slice(
                      0,
                      code.lastIndexOf("style=") + 7
                    );
                    const restCode = code.slice(code.indexOf("/>") - 1);
                    let styleList = code
                      .slice(
                        code.lastIndexOf("style=") + 7,
                        code.indexOf("/>") - 1
                      )
                      .split("; ");
                    const check = styleList.find(
                      (style) =>
                        style.includes("width") && !style.includes("-width")
                    );
                    if (check) {
                      styleList = styleList.map((style, index) => {
                        if (index !== +styleList.length - 1) {
                          if (
                            style.includes("width") &&
                            !style.includes("-width")
                          ) {
                            return `width: ${action.payload}%;`;
                          } else {
                            return style.concat(";");
                          }
                        } else {
                          if (
                            style.includes("width") &&
                            !style.includes("-width")
                          ) {
                            return `width: ${action.payload}%;`;
                          }
                          return style;
                        }
                      });
                    } else {
                      styleList = styleList.map((style, index) => {
                        if (index !== +styleList.length - 1) {
                          return style.concat(";");
                        } else {
                          return style;
                        }
                      });
                      styleList.push(`width: ${action.payload}%;`);
                    }
                    code = preCode + styleList.join(" ") + restCode;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  } else {
                    return content;
                  }
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
        state.data = {
          ...state.data,
          rows: temp,
        };
      }
    },
    updateJustifyContent: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "justify-content",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateImageUrl: (state, action) => {
      const row = state.data.rows.find(
        (row, index) => index === +state.rowIndex
      );
      const column = row.columns.find(
        (column, index) => index === +state.columnIndex
      );
      const check = column.contents.every((content, index) => {
        if (index === +state.contentIndex) {
          if (content.content.includes("<a")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
      if (check) {
        if (action.payload === "") {
          let temp = state.data.rows.map((row, index) => {
            if (index === +state.rowIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +state.columnIndex) {
                  const arr = column.contents.map((content, index) => {
                    if (index === +state.contentIndex) {
                      let code = `
                      <div
                      style="padding: 1rem; display: flex; flex-direction: column; align-items: center; row-gap: 10px; background-color: #f3f3f3; border: 1px dashed #000;"
                    >
                      <i
                        className="pi pi-images"
                        style="font-size: 40px; color: #93989A;"
                      ></i>
                      <span
                        style="font-size: 14px; color: #93989A;"
                      >
                        Drop your file here
                      </span>
                      <button
                        id="upload_image"
                        style="background-color: #93989A; color: #fff; font-weight: 700; font-size: 15px; padding: 4px 8px; border-radius: 4px;"
                      >
                        Browse
                      </button>
                    </div>`;
                      content.content = code;
                      content.contentCode = HTMLReactParser(code);
                      return content;
                    } else {
                      return content;
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
          state.data = {
            ...state.data,
            rows: temp,
          };
        } else {
          let temp = state.data.rows.map((row, index) => {
            if (index === +state.rowIndex) {
              const arr = row.columns.map((column, index) => {
                if (index === +state.columnIndex) {
                  const arr = column.contents.map((content, index) => {
                    if (index === +state.contentIndex) {
                      if (isImageLink(action.payload)) {
                        let code = content.content;
                        code =
                          code.slice(0, code.indexOf(`src="`) + 5) +
                          action.payload +
                          code.slice(code.indexOf(`alt="`) - 2);
                        content.content = code;
                        content.contentCode = HTMLReactParser(code);
                        return content;
                      } else {
                        alert("Link này hông có pải link ảnh nha :))))");
                        return content;
                      }
                    } else {
                      return content;
                    }
                  });
                  return {
                    ...column,
                    contents: arr,
                  };
                } else {
                  return column;
                }
              });
              return {
                ...row,
                columns: arr,
              };
            } else {
              return row;
            }
          });
          state.data = {
            ...state.data,
            rows: temp,
          };
        }
      }
    },
    updateImageAltText: (state, action) => {
      const columnCheck = state.data.rows.find((row, index) => {
        if (index === +state.rowIndex) {
          return row.columns.find(
            (column, index) => index === +state.columnIndex
          );
        } else {
          return false;
        }
      });
      const check = columnCheck.contents.every((content, index) => {
        if (index === +state.contentIndex) {
          if (content.content.includes("<a")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
      if (check) {
        let temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (index === +state.contentIndex) {
                    let code = content.content;
                    code =
                      code.slice(0, code.indexOf(`alt="`) + 5) +
                      action.payload +
                      code.slice(code.lastIndexOf(`style="`) - 2);
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  } else {
                    return content;
                  }
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
        state.data = {
          ...state.data,
          rows: temp,
        };
      }
    },
    updateImageAction: (state, action) => {
      const columnCheck = state.data.rows.find((row, index) => {
        if (index === +state.rowIndex) {
          return row.columns.find(
            (column, index) => index === +state.columnIndex
          );
        } else {
          return false;
        }
      });
      const check = columnCheck.contents.every((content, index) => {
        if (index === +state.contentIndex) {
          if (content.content.includes("<a")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
      if (check) {
        let temp = state.data.rows.map((row, index) => {
          if (index === +state.rowIndex) {
            const arr = row.columns.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.contents.map((content, index) => {
                  if (index === +state.contentIndex) {
                    if (action.payload === "Open web page") {
                      return content;
                    }
                    return content;
                  } else {
                    return content;
                  }
                });
                return {
                  ...column,
                  contents: arr,
                };
              } else {
                return column;
              }
            });
            return {
              ...row,
              columns: arr,
            };
          } else {
            return row;
          }
        });
        state.data = {
          ...state.data,
          rows: temp,
        };
      }
    },
    updateButtonContent: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</"));
                  code = preCode + action.payload + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "width",
        `${action.payload}%`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBackgroundColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "background-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderRadius: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-radius",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-width",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderStyle: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-style",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderLeftWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-left-width",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderLeftStyle: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-left-style",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderLeftColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-left-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderRightWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-right-width",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderRightStyle: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-right-style",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderRightColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-right-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderTopWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-top-width",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderTopStyle: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-top-style",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderTopColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-top-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderBottomWidth: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-bottom-width",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderBottomStyle: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-bottom-style",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBorderBottomColor: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "border-bottom-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateDividerBackground: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.lastIndexOf(`">`));
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.lastIndexOf(`">`)
                    )
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-color")) {
                          return `border-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-color")) {
                          return `border-color: ${action.payload};`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`border-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateDividerHeight: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.lastIndexOf(`">`));
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.lastIndexOf(`">`)
                    )
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-width")) {
                          return `border-width: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-width")) {
                          return `border-width: ${action.payload}px;`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`border-width: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateDividerStyle: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.lastIndexOf(`">`));
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.lastIndexOf(`">`)
                    )
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-style")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-style")) {
                          return `border-style: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-style")) {
                          return `border-style: ${action.payload};`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`border-style: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateDividerWidth: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.lastIndexOf(`">`));
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.lastIndexOf(`">`)
                    )
                    .split("; ");
                  const check = styleList.find(
                    (style) =>
                      style.includes("width") && !style.includes("-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (
                          style.includes("width") &&
                          !style.includes("-width")
                        ) {
                          return `width: ${action.payload}%;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("width") &&
                          !style.includes("-width")
                        ) {
                          return `width: ${action.payload}%;`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`width: ${action.payload}%;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateHeight: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "height",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    addSocialIcons: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let src = action.payload;
                  let title = src.slice(
                    src.lastIndexOf("%2F") + 3,
                    src.indexOf("?")
                  );
                  title = title.slice(0, title.indexOf("."));
                  const icon = {
                    title,
                    src,
                    alt: "",
                    url: "#",
                  };
                  let iconList = [...content.iconList];
                  iconList.push(icon);
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = iconList.map((icon) => {
                    return `
                    <a href="${icon.url}" title="${icon.title}">
                      <img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/>
                    </a>
                    `;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.iconList = iconList;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateSocialIcons: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let iconList = content.iconList;
                  if (action.payload?.title) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.title = action.payload.title;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  if (action.payload?.alt) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.alt = action.payload.alt;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  if (action.payload?.url) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.url = action.payload.url;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = iconList?.map((icon) => {
                    return `
                    <a href="${icon.url}" title="${icon.title}">
                      <img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/>
                    </a>
                    `;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteSocialIcons: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let src = action.payload;
                  let iconList = content.iconList.filter((icon) => {
                    if (icon.src === src) {
                      return false;
                    } else {
                      return true;
                    }
                  });
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = iconList.map((icon) => {
                    return `
                    <a href="${icon.url}" title="${icon.title}">
                      <img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/>
                    </a>
                    `;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.iconList = iconList;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnGap: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "column-gap",
        `${action.payload}px`
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateHTML: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  const code = `
                  <div style="width: 100%; font-size: 16px; text-align: center; padding: 0.5rem;">
                    ${action.payload}
                  </div>
                  `;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateVideo: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const { url, link, title } = action.payload;
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = `
                <a id="${url}" href="#" style="display: flex; justify-content: center; position: relative;">
                <img title="${title}" src="${link}" alt="" style="width: 100%; opacity: 1;"/>
                <i class="pi pi-play-circle" style="top: 50%; left: 50%; transform: translate(-50%, -50%); position: absolute; font-size: 50px; color: #fff;"></i>
                </a>
                `;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePlayIconColor: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf("</i>") - 2);
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.indexOf("</i>") - 2
                    )
                    .split("; ");
                  const check = styleList.find(
                    (style) =>
                      style.includes("color") &&
                      !style.includes("background-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (
                          style.includes("color") &&
                          !style.includes("background-color")
                        ) {
                          return `color: ${
                            action.payload === "Light" ? "#fff" : "#000"
                          };`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("color") &&
                          !style.includes("background-color")
                        ) {
                          return `color: ${
                            action.payload === "Light" ? "#fff" : "#000"
                          };`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(
                      `color: ${action.payload === "Light" ? "#fff" : "#000"};`
                    );
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updatePlayIconSize: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.lastIndexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf("</i>") - 2);
                  let styleList = code
                    .slice(
                      code.lastIndexOf("style=") + 7,
                      code.indexOf("</i>") - 2
                    )
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("font-size")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("font-size")) {
                          return `font-size: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("font-size")) {
                          return `font-size: ${action.payload};`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`font-size: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateVideoTitle: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(`title="`) + 7);
                  const restCode = code.slice(code.indexOf(`src="`) - 2);
                  code = preCode + action.payload + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    addNewIcon: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  if (code.includes("<a")) {
                    let icon = {
                      title: "",
                      src: "https://firebasestorage.googleapis.com/v0/b/beefree-6ba5d.appspot.com/o/icons%2FstarIcon.png?alt=media&token=68078b67-9c4f-4d01-9034-6b1ecfb2697b",
                      alt: "",
                      url: "#",
                    };
                    let temp = [...content.iconList];
                    temp.push(icon);
                    const codeArr = temp.map((icon) => {
                      return `<a href="${icon.url}" title="${icon.title}"><img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/></a>`;
                    });
                    code = preCode + codeArr.join("") + restCode;
                    content.iconList = temp;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  } else {
                    code = `<div style="width: 100%; display: flex; justify-content: center; column-gap: 1.25rem; font-size: 20px; padding: 0.5rem;">
                    <a href="#" title="">
                      <img src="https://firebasestorage.googleapis.com/v0/b/beefree-6ba5d.appspot.com/o/icons%2FstarIcon.png?alt=media&token=68078b67-9c4f-4d01-9034-6b1ecfb2697b" alt="" style="width: 32px; height: auto;"/>
                    </a>
                    </div>`;
                    let icon = {
                      title: "",
                      src: "https://firebasestorage.googleapis.com/v0/b/beefree-6ba5d.appspot.com/o/icons%2FstarIcon.png?alt=media&token=68078b67-9c4f-4d01-9034-6b1ecfb2697b",
                      alt: "",
                      url: "#",
                    };
                    let temp = [...content.iconList];
                    temp.push(icon);
                    content.iconList = temp;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  }
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteIcon: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let src = action.payload;
                  let iconList = content.iconList.filter((icon) => {
                    if (icon.src === src) {
                      return false;
                    } else {
                      return true;
                    }
                  });
                  if (iconList.length) {
                    let code = content.content;
                    const preCode = code.slice(0, code.indexOf(">") + 1);
                    const restCode = code.slice(code.indexOf("</div>"));
                    const codeArr = iconList.map((icon) => {
                      return `<a href="${icon.url}" title="${icon.title}"><img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/></a>`;
                    });
                    code = codeArr.join("");
                    let newCode = preCode + code + restCode;
                    content.iconList = iconList;
                    content.content = newCode;
                    content.contentCode = HTMLReactParser(newCode);
                  } else {
                    let code = `<div style="display: flex; flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  row-gap: 0.5rem;
                  color: #9CA3AF;
                  font-weight: 600;
                  background-color: #f3f3f3;
                  width: 100%;
                  padding: 0.25rem; border: 1px dashed #000;">
                    <i className="pi pi-star" style="font-size: 50px;"></i>
                    Icons
                  </div>`;
                    content.iconList = iconList;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                  }
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateIcon: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let iconList = content.iconList;
                  if (action.payload?.title) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.title = action.payload.title;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  if (action.payload?.alt) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.alt = action.payload.alt;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  if (action.payload?.url) {
                    iconList = content.iconList.map((icon) => {
                      if (icon.src === action.payload.src) {
                        icon.url = action.payload.url;
                        return icon;
                      } else {
                        return icon;
                      }
                    });
                    content.iconList = iconList;
                  }
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = iconList?.map((icon) => {
                    return `<a href="${icon.url}" title="${icon.title}"><img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/></a>`;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    changeImageIconStatus: (state, action) => {
      state.isChangeIconImage = action.payload;
    },
    insertImageIcon: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let iconList = [];
                  iconList = content.iconList.map((icon, index) => {
                    if (index === +state.isChangeIconImage?.index) {
                      icon.src = action.payload;
                      return icon;
                    } else {
                      return icon;
                    }
                  });
                  content.iconList = iconList;
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = iconList?.map((icon) => {
                    return `<a href="${icon.url}" title="${icon.title}"><img src="${icon.src}" alt="${icon.alt}" style="width: 32px; height: auto;"/></a>`;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
      state.isChangeIconImage = null;
    },
    updateIconSize: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = content.iconList?.map((icon) => {
                    return `
                    <a href="${icon.url}" title="${icon.title}">
                      <img src="${icon.src}" alt="${icon.alt}" style="width: ${action.payload}; height: auto;"/>
                    </a>
                    `;
                  });
                  code = codeArr.join("");
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
      state.isChangeIconImage = null;
    },
    addNewItem: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  if (code.includes("<a")) {
                    let item = {
                      text: "",
                      url: "#",
                      target: "",
                      title: "",
                    };
                    let temp = [...content.itemList];
                    temp.push(item);
                    const codeArr = temp.map((item) => {
                      return `<a href="${item.url}" title="${item.title}" target="${item.target}">${item.text}</a>`;
                    });
                    code = preCode + codeArr.join(content.separator) + restCode;
                    content.itemList = temp;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  } else {
                    code = `<div style="width: 100%; display: flex; justify-content: center; align-items: center; column-gap: 1.25rem; font-size: 20px; padding: 0.5rem;">
                    <a href="#" title="" target=""></a>
                    </div>`;
                    let item = {
                      text: "",
                      url: "#",
                      target: "",
                      title: "",
                    };
                    let temp = [...content.itemList];
                    temp.push(item);
                    content.itemList = temp;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                    return content;
                  }
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateItem: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let itemList = content.itemList;
                  if (action.payload?.title) {
                    itemList = content.itemList.map((item, index) => {
                      if (index === +action.payload.index) {
                        item.title = action.payload.title;
                        return item;
                      } else {
                        return item;
                      }
                    });
                    content.itemList = itemList;
                  }
                  if (action.payload?.text) {
                    itemList = content.itemList.map((item, index) => {
                      if (index === +action.payload.index) {
                        item.text = action.payload.text;
                        return item;
                      } else {
                        return item;
                      }
                    });
                    content.itemList = itemList;
                  }
                  if (action.payload?.url) {
                    itemList = content.itemList.map((item, index) => {
                      if (index === +action.payload.index) {
                        item.url = action.payload.url;
                        return item;
                      } else {
                        return item;
                      }
                    });
                    content.itemList = itemList;
                  }
                  if (action.payload?.target) {
                    itemList = content.itemList.map((item, index) => {
                      if (index === +action.payload.index) {
                        item.target = action.payload.target;
                        return item;
                      } else {
                        return item;
                      }
                    });
                    content.itemList = itemList;
                  }
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = itemList?.map((item) => {
                    return `<a href="${item.url}" title="${item.title}" target="${item.target}">${item.text}</a>`;
                  });
                  code = codeArr.join(content.separator);
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteItem: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  let itemList = content.itemList.filter((item, index) => {
                    if (index === +action.payload) {
                      return false;
                    } else {
                      return true;
                    }
                  });
                  if (itemList.length) {
                    let code = content.content;
                    const preCode = code.slice(0, code.indexOf(">") + 1);
                    const restCode = code.slice(code.indexOf("</div>"));
                    const codeArr = itemList.map((item) => {
                      return `<a href="${item.url}" title="${item.title}" target="${item.target}">${item.text}</a>`;
                    });
                    code = codeArr.join(content.separator);
                    let newCode = preCode + code + restCode;
                    content.itemList = itemList;
                    content.content = newCode;
                    content.contentCode = HTMLReactParser(newCode);
                  } else {
                    let code = `<div style="display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    row-gap: 0.5rem;
                    color: #9CA3AF;
                    font-weight: 600;
                    background-color: #f3f3f3;
                    width: 100%;
                    padding: 0.25rem; border: 1px dashed #000;">
                      <i className="pi pi-bars" style="font-size: 40px;"></i>
                      Icons
                    </div>`;
                    content.itemList = itemList;
                    content.content = code;
                    content.contentCode = HTMLReactParser(code);
                  }
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateFlexDirection: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  if (action.payload === "column") {
                    content.separator = "";
                  }
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("flex-direction")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("flex-direction")) {
                          return `flex-direction: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("flex-direction")) {
                          return `flex-direction: ${action.payload};`;
                        }
                        return style;
                      }
                    });
                  } else {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        return style.concat(";");
                      } else {
                        return style;
                      }
                    });
                    styleList.push(`flex-direction: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    separateMenu: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const arr = row.columns.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.contents.map((content, index) => {
                if (index === +state.contentIndex) {
                  content.separator = action.payload;
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf(">") + 1);
                  const restCode = code.slice(code.indexOf("</div>"));
                  const codeArr = content.itemList.map((item) => {
                    return `<a href="${item.url}" title="${item.title}" target="${item.target}">${item.text}</a>`;
                  });
                  code = codeArr.join(content.separator);
                  let newCode = preCode + code + restCode;
                  content.content = newCode;
                  content.contentCode = HTMLReactParser(newCode);
                  return content;
                } else {
                  return content;
                }
              });
              return {
                ...column,
                contents: arr,
              };
            } else {
              return column;
            }
          });
          return {
            ...row,
            columns: arr,
          };
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateMargin: (state, action) => {
      const temp = updateStyle(
        state.data.rows,
        state.rowIndex,
        state.columnIndex,
        state.contentIndex,
        "margin",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateRowBackgroundColor: (state, action) => {
      const temp = updateRowStyle(
        state.data.rows,
        state.rowIndex,
        "background-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBackgroundColor: (state, action) => {
      const temp = updateContentAreaStyle(
        state.data.rows,
        state.rowIndex,
        "background-color",
        action.payload
      );
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBackgroundImage: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          if (action.payload.area === "ROW") {
            const check = row.rowStyle.includes("background-image");
            if (check) {
              const obj = getStyleObjectFromString(row.rowStyle);
              obj.backgroundImage = action.payload.url;
              row.rowStyle = getStyleStringFromObject(obj);
            } else {
              if (row.rowStyle) {
                row.rowStyle = row.rowStyle.concat(
                  ` background-image: ${action.payload.url}; background-size: auto; background-position: left top; background-repeat: no-repeat;`
                );
              } else {
                row.rowStyle = row.rowStyle.concat(
                  `background-image: ${action.payload.url}; background-size: auto; background-position: left top; background-repeat: no-repeat;`
                );
              }
            }
          } else if (action.payload.area === "CONTENT AREA") {
            const check = row.contentAreaStyle.includes("background-image");
            if (check) {
              const obj = getStyleObjectFromString(row.contentAreaStyle);
              obj.backgroundImage = action.payload.url;
              row.contentAreaStyle = getStyleStringFromObject(obj);
            } else {
              if (row.contentAreaStyle) {
                row.contentAreaStyle = row.contentAreaStyle.concat(
                  ` background-image: ${action.payload.url}; background-size: auto; background-position: left top; background-repeat: no-repeat;`
                );
              } else {
                row.contentAreaStyle = row.contentAreaStyle.concat(
                  `background-image: ${action.payload.url}; background-size: auto; background-position: left top; background-repeat: no-repeat;`
                );
              }
            }
          }
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    changeInsertRowImageBgStatus: (state, action) => {
      state.isInsertRowImageBg = action.payload;
    },
    removeBackgroundImage: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          if (action.payload === "ROW") {
            if (row.rowStyle.includes("background-image")) {
              const obj = getStyleObjectFromString(row.rowStyle);
              delete obj.backgroundImage;
              delete obj.backgroundSize;
              delete obj.backgroundPosition;
              delete obj.backgroundRepeat;
              row.rowStyle = getStyleStringFromObject(obj);
            }
          } else if (action.payload === "CONTENT AREA") {
            if (row.contentAreaStyle.includes("background-image")) {
              const obj = getStyleObjectFromString(row.contentAreaStyle);
              delete obj.backgroundImage;
              delete obj.backgroundSize;
              delete obj.backgroundPosition;
              delete obj.backgroundRepeat;
              row.contentAreaStyle = getStyleStringFromObject(obj);
            }
          }
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    changeBackgroundImageArea: (state, action) => {
      state.backgroundImageArea = action.payload;
    },
    updateBackgroundSize: (state, action) => {
      let temp = [...state.data.rows];
      if (action.payload.area === "ROW") {
        temp = updateRowStyle(
          state.data.rows,
          state.rowIndex,
          "background-size",
          action.payload.size
        );
      } else if (action.payload.area === "CONTENT AREA") {
        temp = updateContentAreaStyle(
          state.data.rows,
          state.rowIndex,
          "background-size",
          action.payload.size
        );
      }
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBackgroundRepeat: (state, action) => {
      let temp = [...state.data.rows];
      if (action.payload.area === "ROW") {
        temp = updateRowStyle(
          state.data.rows,
          state.rowIndex,
          "background-repeat",
          action.payload.repeat
        );
      } else if (action.payload.area === "CONTENT AREA") {
        temp = updateContentAreaStyle(
          state.data.rows,
          state.rowIndex,
          "background-repeat",
          action.payload.repeat
        );
      }
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateBackgroundPosition: (state, action) => {
      let temp = [...state.data.rows];
      if (action.payload.area === "ROW") {
        temp = updateRowStyle(
          state.data.rows,
          state.rowIndex,
          "background-position",
          action.payload.position
        );
      } else if (action.payload.area === "CONTENT AREA") {
        temp = updateContentAreaStyle(
          state.data.rows,
          state.rowIndex,
          "background-position",
          action.payload.position
        );
      }
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorder: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.style) {
            obj.borderStyle = action.payload.style;
          }
          if (action.payload?.color) {
            obj.borderColor = action.payload.color;
          }
          if (action.payload?.width || action.payload?.width === 0) {
            obj.borderWidth = `${action.payload.width}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorderLeft: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.style) {
            obj.borderLeftStyle = action.payload.style;
          }
          if (action.payload?.color) {
            obj.borderLeftColor = action.payload.color;
          }
          if (action.payload?.width || action.payload?.width === 0) {
            obj.borderLeftWidth = `${action.payload.width}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorderRight: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.style) {
            obj.borderRightStyle = action.payload.style;
          }
          if (action.payload?.color) {
            obj.borderRightColor = action.payload.color;
          }
          if (action.payload?.width || action.payload?.width === 0) {
            obj.borderRightWidth = `${action.payload.width}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorderTop: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.style) {
            obj.borderTopStyle = action.payload.style;
          }
          if (action.payload?.color) {
            obj.borderTopColor = action.payload.color;
          }
          if (action.payload?.width || action.payload?.width === 0) {
            obj.borderTopWidth = `${action.payload.width}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorderBottom: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.style) {
            obj.borderBottomStyle = action.payload.style;
          }
          if (action.payload?.color) {
            obj.borderBottomColor = action.payload.color;
          }
          if (action.payload?.width || action.payload?.width === 0) {
            obj.borderBottomWidth = `${action.payload.width}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateContentAreaBorderRadius: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          const obj = getStyleObjectFromString(row.contentAreaStyle);
          if (action.payload?.all || action.payload?.all === 0) {
            obj.borderRadius = `${action.payload.all}px`;
          }
          if (action.payload?.topLeft || action.payload?.topLeft === 0) {
            obj.borderTopLeftRadius = `${action.payload.topLeft}px`;
          }
          if (action.payload?.topRight || action.payload?.topRight === 0) {
            obj.borderTopRightRadius = `${action.payload.topRight}px`;
          }
          if (action.payload?.bottomLeft || action.payload?.bottomLeft === 0) {
            obj.borderBottomLeftRadius = `${action.payload.bottomLeft}px`;
          }
          if (
            action.payload?.bottomRight ||
            action.payload?.bottomRight === 0
          ) {
            obj.borderBottomRightRadius = `${action.payload.bottomRight}px`;
          }
          row.contentAreaStyle = getStyleStringFromObject(obj);
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    addColumn: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          let column = {
            columnStyle: "",
            colSpan: 1,
            contents: [],
          };
          if (row.columns.length && row.columns[0].colSpan > 1) {
            row.columns[0].colSpan = row.columns[0].colSpan - 1;
          }
          if (row.columns[0].colSpan === 1 && row.columns.length !== 6) {
            let check = true;
            row.columns.forEach((column) => {
              if (check) {
                if (column?.colSpan > 1) {
                  column.colSpan = column.colSpan - 1;
                  check = false;
                }
              }
            });
          }
          if (row.columns.length < 6) {
            row.columns.push(column);
          }
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteColumn: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          if (row.columns.length > 1) {
            if (+action.payload === 0) {
              row.columns[1].colSpan =
                +row.columns[1].colSpan + +row.columns[0].colSpan;
            }
            row.columns = row.columns.filter((column, index) => {
              if (index === +action.payload) {
                return false;
              } else {
                if (index === +action.payload - 1) {
                  column.colSpan =
                    row.columns[+action.payload].colSpan + column.colSpan;
                }
                return true;
              }
            });
          }
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBackgroundColor: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              obj.backgroundColor = action.payload;
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnPadding: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.all || action.payload?.all === 0) {
                obj.padding = `${action.payload.all}px`;
              }
              if (action.payload?.top || action.payload?.top === 0) {
                obj.paddingTop = `${action.payload.top}px`;
              }
              if (action.payload?.right || action.payload?.right === 0) {
                obj.paddingRight = `${action.payload.right}px`;
              }
              if (action.payload?.bottom || action.payload?.bottom === 0) {
                obj.paddingBottom = `${action.payload.bottom}px`;
              }
              if (action.payload?.left || action.payload?.left === 0) {
                obj.paddingLeft = `${action.payload.left}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBorder: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.style) {
                obj.borderStyle = action.payload.style;
              }
              if (action.payload?.color) {
                obj.borderColor = action.payload.color;
              }
              if (action.payload?.width || action.payload?.width === 0) {
                obj.borderWidth = `${action.payload.width}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBorderLeft: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.style) {
                obj.borderLeftStyle = action.payload.style;
              }
              if (action.payload?.color) {
                obj.borderLeftColor = action.payload.color;
              }
              if (action.payload?.width || action.payload?.width === 0) {
                obj.borderLeftWidth = `${action.payload.width}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBorderRight: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.style) {
                obj.borderRightStyle = action.payload.style;
              }
              if (action.payload?.color) {
                obj.borderRightColor = action.payload.color;
              }
              if (action.payload?.width || action.payload?.width === 0) {
                obj.borderRightWidth = `${action.payload.width}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBorderTop: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.style) {
                obj.borderTopStyle = action.payload.style;
              }
              if (action.payload?.color) {
                obj.borderTopColor = action.payload.color;
              }
              if (action.payload?.width || action.payload?.width === 0) {
                obj.borderTopWidth = `${action.payload.width}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateColumnBorderBottom: (state, action) => {
      let temp = state.data.rows.map((row, index) => {
        if (index === +state.rowIndex) {
          row.columns.forEach((column, index) => {
            if (index === +state.columnIndex) {
              const obj = getStyleObjectFromString(column.columnStyle);
              if (action.payload?.style) {
                obj.borderBottomStyle = action.payload.style;
              }
              if (action.payload?.color) {
                obj.borderBottomColor = action.payload.color;
              }
              if (action.payload?.width || action.payload?.width === 0) {
                obj.borderBottomWidth = `${action.payload.width}px`;
              }
              column.columnStyle = getStyleStringFromObject(obj);
            }
          });
          return row;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    duplicateRow: (state, action) => {
      let temp = [];
      state.data.rows.forEach((row, index) => {
        if (index === +state.rowIndex) {
          temp.push(row);
          temp.push(row);
        } else {
          temp.push(row);
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    deleteRow: (state, action) => {
      let temp = state.data.rows.filter((row, index) => {
        if (index === +state.rowIndex) {
          return false;
        } else {
          return true;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    addRow: (state, action) => {
      let row = {
        rowStyle: "",
        contentAreaStyle: "",
        columns: [
          {
            columnStyle: "",
            colSpan: 6,
            contents: [],
          },
        ],
      };
      const temp = [...state.data.rows];
      if (state.data.rows.length === 0) {
        temp.push(row);
        temp.push(row);
      } else {
        temp.push(row);
      }
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    sortRow: (state, action) => {
      const activeRow = state.data.rows[action.payload.activeIndex];
      const overRow = state.data.rows[action.payload.overIndex];
      let temp = state.data.rows.map((row, index) => {
        if (index === action.payload.activeIndex) {
          return overRow;
        } else if (index === action.payload.overIndex) {
          return activeRow;
        } else {
          return row;
        }
      });
      state.data = {
        ...state.data,
        rows: temp,
      };
    },
    updateWidthContentGeneral: (state, action) => {
      const obj = getStyleObjectFromString(state.data.contentGeneralStyle);
      if (+action.payload || +action.payload === 0) {
        obj.width = `${action.payload}px`;
      }
      state.data = {
        ...state.data,
        contentGeneralStyle: getStyleStringFromObject(obj),
      };
    },
    updateContentGeneralAlignment: (state, action) => {
      const obj = getStyleObjectFromString(state.data.contentGeneralStyle);
      if (action.payload === "left") {
        if (obj.marginLeft) {
          delete obj.marginLeft;
        }
      } else if (action.payload === "center") {
        if (!obj?.marginLeft) {
          obj.marginLeft = "auto";
        }
      }
      state.data = {
        ...state.data,
        contentGeneralStyle: getStyleStringFromObject(obj),
      };
    },
    updateGeneralBackgroundColor: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      obj.backgroundColor = action.payload;
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    updateContentGeneralBackgroundColor: (state, action) => {
      const obj = getStyleObjectFromString(state.data.contentGeneralStyle);
      obj.backgroundColor = action.payload;
      state.data = {
        ...state.data,
        contentGeneralStyle: getStyleStringFromObject(obj),
      };
    },
    changeInsertGeneralImageBgStatus: (state, action) => {
      state.isInsertGeneralImageBg = action.payload;
    },
    updateGeneralBgImage: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      if (obj?.backgroundImage) {
        obj.backgroundImage = action.payload;
      } else {
        obj.backgroundImage = action.payload;
        obj.backgroundSize = "auto";
        obj.backgroundPosition = "left top";
        obj.backgroundRepeat = "no-repeat";
      }
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    removeGeneralBgImage: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      delete obj.backgroundImage;
      delete obj.backgroundSize;
      delete obj.backgroundPosition;
      delete obj.backgroundRepeat;
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    updateGeneralBgSize: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      obj.backgroundSize = action.payload;
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    updateGeneralBgRepeat: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      obj.backgroundRepeat = action.payload;
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    updateGeneralBgPosition: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      obj.backgroundPosition = action.payload;
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
    updateGeneralFontFamily: (state, action) => {
      const obj = getStyleObjectFromString(state.data.generalStyle);
      obj.fontFamily = action.payload;
      console.log(getStyleStringFromObject(obj));
      state.data = {
        ...state.data,
        generalStyle: getStyleStringFromObject(obj),
      };
    },
  },
});
