import { createSlice } from "@reduxjs/toolkit";
import HTMLReactParser from "html-react-parser";
import { isImageLink } from "@/utils/regex";

const initialState = {
  contentList: [],
  isUploadFile: false,
  contentIndex: null,
  rowIndex: null,
  columnIndex: null,
  isChangeIconImage: null,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addContent: (state, action) => {
      let temp = state.contentList;
      if (state.contentList.length) {
        temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            if (row.length) {
              return row.map((column, index) => {
                if (index === +state.columnIndex) {
                  if (column.length) {
                    const arr = [];
                    column.forEach((item, index) => {
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
                    return arr;
                  } else {
                    return [action.payload.tag];
                  }
                } else {
                  return column;
                }
              });
            } else {
              return [[action.payload.tag]];
            }
          } else {
            return row;
          }
        });
      } else {
        temp.push([[action.payload.tag]]);
      }
      state.contentList = temp;
    },
    updateContent: (state, action) => {
      let temp;
      if (action.payload?.tagIndex || +action.payload?.tagIndex === 0) {
        temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                return column.map((content, index) => {
                  if (+index === +action.payload.tagIndex) {
                    content.content = action.payload.content;
                    content.contentCode = action.payload.code;
                    return content;
                  } else {
                    return content;
                  }
                });
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
      } else if (action.payload?.contentId) {
        temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                return column.map((content, index) => {
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
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
      } else if (action.payload?.hideEditor) {
        temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                return column.map((content, index) => {
                  if (content.isShow) {
                    content.isShow = false;
                  }
                  return content;
                });
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
      }
      if (temp) state.contentList = temp;
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
    replicationContent: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = [];
              column.forEach((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    deleteContent: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = [];
              column.forEach((content, index) => {
                if (+index !== +state.contentIndex) {
                  arr.push(content);
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
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
          const row = state.contentList.find(
            (row, index) => index === +rowOverIndex
          );
          const column = row.find(
            (column, index) => index === +columnOverIndex
          );
          const dragContent = column.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = column.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.contentList.map((row, index) => {
            if (index === +rowOverIndex) {
              return row.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(dragContent);
                    } else if (+contentActiveIndex === index) {
                      arr.push(dropContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
        } else if (
          +rowActiveIndex === +rowOverIndex &&
          +columnActiveIndex !== +columnOverIndex
        ) {
          const row = state.contentList.find(
            (row, index) => index === +rowOverIndex
          );
          const columnOver = row.find(
            (column, index) => index === +columnOverIndex
          );
          const columnActive = row.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = columnOver.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.contentList.map((row, index) => {
            if (index === +rowOverIndex) {
              return row.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(content);
                      arr.push(dragContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else if (index === +columnActiveIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
        } else if (+rowActiveIndex !== +rowOverIndex) {
          const rowOver = state.contentList.find(
            (row, index) => index === +rowOverIndex
          );
          const rowActive = state.contentList.find(
            (row, index) => index === +rowActiveIndex
          );
          const columnOver = rowOver.find(
            (column, index) => index === +columnOverIndex
          );
          const columnActive = rowActive.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.find(
            (content, index) => index === +contentActiveIndex
          );
          const dropContent = columnOver.find(
            (content, index) => index === +contentOverIndex
          );
          temp = state.contentList.map((row, index) => {
            if (index === +rowOverIndex) {
              return row.map((column, index) => {
                if (index === +columnOverIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentOverIndex === index) {
                      arr.push(content);
                      arr.push(dragContent);
                    } else {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
            } else if (index === +rowActiveIndex) {
              return row.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
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
          const row = state.contentList.find(
            (row, index) => index === +rowOverIndex
          );
          const columnActive = row.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.find(
            (content, index) => index === +contentActiveIndex
          );
          temp = state.contentList.map((row, index) => {
            if (index === +rowOverIndex) {
              return row.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else if (index === +columnOverIndex) {
                  return [dragContent];
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
        } else if (+rowActiveIndex !== +rowOverIndex) {
          const row = state.contentList.find(
            (row, index) => index === +rowActiveIndex
          );
          const columnActive = row.find(
            (column, index) => index === +columnActiveIndex
          );
          const dragContent = columnActive.find(
            (content, index) => index === +contentActiveIndex
          );
          temp = state.contentList.map((row, index) => {
            if (index === +rowActiveIndex) {
              return row.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
            } else if (index === +rowOverIndex) {
              return row.map((column, index) => {
                if (index === +columnOverIndex) {
                  return [dragContent];
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
        }
      } else if (overId?.includes("_row_")) {
        const rowOverIndex = overId.slice(overId.indexOf("row_") + 4);
        if (+rowActiveIndex !== +rowOverIndex) {
          temp = state.contentList.map((row, index) => {
            if (index === +rowOverIndex) {
              return [[dragContent]];
            } else if (index === +rowActiveIndex) {
              return row.map((column, index) => {
                if (index === +columnActiveIndex) {
                  const arr = [];
                  column.forEach((content, index) => {
                    if (+contentActiveIndex !== index) {
                      arr.push(content);
                    }
                  });
                  return arr;
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
        }
      }
      if (temp) {
        state.contentList = temp;
      }
    },
    updateTitle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateFontFamily: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("font-family")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("font-family")) {
                          return `font-family: &quot;${action.payload}&quot;;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("font-family")) {
                          return `font-family: &quot;${action.payload}&quot;;`;
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
                      `font-family: &quot;${action.payload}&quot;;`
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateFontWeight: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("font-weight")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("font-weight")) {
                          if (style.includes("font-weight: 700")) {
                            if (action.payload === "Regular") {
                              return "font-weight: 400;";
                            }
                          } else if (style.includes("font-weight: 400")) {
                            if (action.payload === "Bold") {
                              return "font-weight: 700;";
                            }
                          }
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("font-weight: 700")) {
                          if (action.payload === "Regular") {
                            return "font-weight: 400;";
                          }
                        } else if (style.includes("font-weight: 400")) {
                          if (action.payload === "Bold") {
                            return "font-weight: 700;";
                          }
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
                      `font-weight: ${
                        action.payload === "Bold" ? "700" : "400"
                      };`
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateTextColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
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
                          return `color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("color") &&
                          !style.includes("background-color")
                        ) {
                          return `color: ${action.payload};`;
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
                    styleList.push(`color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateLinkColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
                      let styleList = code
                        .slice(0, code.indexOf(`"`))
                        .split("; ");
                      code = code.slice(code.indexOf(`"`));
                      styleList = styleList.map((style, index) => {
                        if (index !== +styleList.length - 1) {
                          if (
                            style.includes("color") &&
                            !style.includes("background-color")
                          ) {
                            return `color: ${action.payload};`;
                          } else {
                            return style.concat(";");
                          }
                        } else {
                          if (
                            style.includes("color") &&
                            !style.includes("background-color")
                          ) {
                            return `color: ${action.payload};`;
                          } else {
                            return style;
                          }
                        }
                      });
                      newCode += styleList.join(" ");
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateAlign: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("text-align")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("text-align")) {
                          return `text-align: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("text-align")) {
                          return `text-align: ${action.payload};`;
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
                    styleList.push(`text-align: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateLineHeight: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("line-height")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("line-height")) {
                          return `line-height: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("line-height")) {
                          return `line-height: ${action.payload};`;
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
                    styleList.push(`line-height: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateLetterSpacing: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("letter-spacing")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("letter-spacing")) {
                          return `letter-spacing: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("letter-spacing")) {
                          return `letter-spacing: ${action.payload}px;`;
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
                    styleList.push(`letter-spacing: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateFontSize: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("font-size")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("font-size")) {
                          return `font-size: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("font-size")) {
                          return `font-size: ${action.payload}px;`;
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
                    styleList.push(`font-size: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateListStyleType: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("list-style-type")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("list-style-type")) {
                          return `list-style-type: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("list-style-type")) {
                          return `list-style-type: ${action.payload};`;
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
                    styleList.push(`list-style-type: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateParagraphSpacing: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("row-gap")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("row-gap")) {
                          return `row-gap: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("row-gap")) {
                          return `row-gap: ${action.payload}px;`;
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
                    styleList.push(`row-gap: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePadding: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find(
                    (style) =>
                      style.includes("padding") &&
                      !(
                        style.includes("padding-left") ||
                        style.includes("padding-right") ||
                        style.includes("padding-bottom") ||
                        style.includes("padding-top")
                      )
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (
                          style.includes("padding") &&
                          !(
                            style.includes("padding-left") ||
                            style.includes("padding-right") ||
                            style.includes("padding-bottom") ||
                            style.includes("padding-top")
                          )
                        ) {
                          return `padding: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("padding") &&
                          !(
                            style.includes("padding-left") ||
                            style.includes("padding-right") ||
                            style.includes("padding-bottom") ||
                            style.includes("padding-top")
                          )
                        ) {
                          return `padding: ${action.payload}px;`;
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
                    styleList.push(`padding: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePaddingLeft: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("padding-left")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("padding-left")) {
                          return `padding-left: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("padding-left")) {
                          return `padding-left: ${action.payload}px;`;
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
                    styleList.push(`padding-left: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePaddingRight: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("padding-right")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("padding-right")) {
                          return `padding-right: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("padding-right")) {
                          return `padding-right: ${action.payload}px;`;
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
                    styleList.push(`padding-right: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePaddingTop: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("padding-top")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("padding-top")) {
                          return `padding-top: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("padding-top")) {
                          return `padding-top: ${action.payload}px;`;
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
                    styleList.push(`padding-top: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePaddingBottom: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("padding-bottom")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("padding-bottom")) {
                          return `padding-bottom: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("padding-bottom")) {
                          return `padding-bottom: ${action.payload}px;`;
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
                    styleList.push(`padding-bottom: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    insertImage: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateWidthImage: (state, action) => {
      const row = state.contentList.find(
        (row, index) => index === +state.rowIndex
      );
      const column = row.find((column, index) => index === +state.columnIndex);
      const check = column.every((content, index) => {
        if (index === +state.contentIndex) {
          console.log(content?.id);
          if (content?.content?.includes("<a")) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      });
      if (check) {
        let temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.map((content, index) => {
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
                return arr;
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
        state.contentList = temp;
      }
    },
    updateJustifyContent: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("justify-content")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("justify-content")) {
                          return `justify-content: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("justify-content")) {
                          return `justify-content: ${action.payload};`;
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
                    styleList.push(`justify-content: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateImageUrl: (state, action) => {
      const row = state.contentList.find(
        (row, index) => index === +state.rowIndex
      );
      const column = row.find((column, index) => index === +state.columnIndex);
      const check = column.every((content, index) => {
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
          let temp = state.contentList.map((row, index) => {
            if (index === +state.rowIndex) {
              return row.map((column, index) => {
                if (index === +state.columnIndex) {
                  const arr = column.map((content, index) => {
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
                  return arr;
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
          state.contentList = temp;
        } else {
          let temp = state.contentList.map((row, index) => {
            if (index === +state.rowIndex) {
              return row.map((column, index) => {
                if (index === +state.columnIndex) {
                  const arr = column.map((content, index) => {
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
                  return arr;
                } else {
                  return column;
                }
              });
            } else {
              return row;
            }
          });
          state.contentList = temp;
        }
      }
    },
    updateImageAltText: (state, action) => {
      const columnCheck = state.contentList.find((row, index) => {
        if (index === +state.rowIndex) {
          return row.find((column, index) => index === +state.columnIndex);
        } else {
          return false;
        }
      });
      const check = columnCheck.every((content, index) => {
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
        let temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.map((content, index) => {
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
                return arr;
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
        state.contentList = temp;
      }
    },
    updateImageAction: (state, action) => {
      const columnCheck = state.contentList.find((row, index) => {
        if (index === +state.rowIndex) {
          return row.find((column, index) => index === +state.columnIndex);
        } else {
          return false;
        }
      });
      const check = columnCheck.every((content, index) => {
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
        let temp = state.contentList.map((row, index) => {
          if (index === +state.rowIndex) {
            return row.map((column, index) => {
              if (index === +state.columnIndex) {
                const arr = column.map((content, index) => {
                  if (index === +state.contentIndex) {
                    if (action.payload === "Open web page") {
                      console.log("ok");
                      return content;
                    }
                    return content;
                  } else {
                    return content;
                  }
                });
                return arr;
              } else {
                return column;
              }
            });
          } else {
            return row;
          }
        });
        state.contentList = temp;
      }
    },
    updateButtonContent: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBackgroundColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("background-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("background-color")) {
                          return `background-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("background-color")) {
                          return `background-color: ${action.payload};`;
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
                    styleList.push(`background-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderRadius: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-radius")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-radius")) {
                          return `border-radius: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-radius")) {
                          return `border-radius: ${action.payload}px;`;
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
                    styleList.push(`border-radius: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderLeftWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-left-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-left-width")) {
                          return `border-left-width: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-left-width")) {
                          return `border-left-width: ${action.payload}px;`;
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
                    styleList.push(`border-left-width: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderLeftStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-left-style")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-left-style")) {
                          return `border-left-style: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-left-style")) {
                          return `border-left-style: ${action.payload};`;
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
                    styleList.push(`border-left-style: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderLeftColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-left-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-left-color")) {
                          return `border-left-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-left-color")) {
                          return `border-left-color: ${action.payload};`;
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
                    styleList.push(`border-left-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderRightWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-right-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-right-width")) {
                          return `border-right-width: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-right-width")) {
                          return `border-right-width: ${action.payload}px;`;
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
                    styleList.push(`border-right-width: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderRightStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-right-style")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-right-style")) {
                          return `border-right-style: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-right-style")) {
                          return `border-right-style: ${action.payload};`;
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
                    styleList.push(`border-right-style: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderRightColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-right-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-right-color")) {
                          return `border-right-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-right-color")) {
                          return `border-right-color: ${action.payload};`;
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
                    styleList.push(`border-right-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderTopWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-top-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-top-width")) {
                          return `border-top-width: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-top-width")) {
                          return `border-top-width: ${action.payload}px;`;
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
                    styleList.push(`border-top-width: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderTopStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-top-style")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-top-style")) {
                          return `border-top-style: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-top-style")) {
                          return `border-top-style: ${action.payload};`;
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
                    styleList.push(`border-top-style: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderTopColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-top-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-top-color")) {
                          return `border-top-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-top-color")) {
                          return `border-top-color: ${action.payload};`;
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
                    styleList.push(`border-top-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderBottomWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-bottom-width")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-bottom-width")) {
                          return `border-bottom-width: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-bottom-width")) {
                          return `border-bottom-width: ${action.payload}px;`;
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
                    styleList.push(`border-bottom-width: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderBottomStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-bottom-style")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-bottom-style")) {
                          return `border-bottom-style: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-bottom-style")) {
                          return `border-bottom-style: ${action.payload};`;
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
                    styleList.push(`border-bottom-style: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateBorderBottomColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("border-bottom-color")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("border-bottom-color")) {
                          return `border-bottom-color: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("border-bottom-color")) {
                          return `border-bottom-color: ${action.payload};`;
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
                    styleList.push(`border-bottom-color: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateDividerBackground: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateDividerHeight: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateDividerStyle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateDividerWidth: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateHeight: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find(
                    (style) =>
                      style.includes("height") && !style.includes("-height")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (
                          style.includes("height") &&
                          !style.includes("-height")
                        ) {
                          return `height: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("height") &&
                          !style.includes("-height")
                        ) {
                          return `height: ${action.payload}px;`;
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
                    styleList.push(`height: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    addSocialIcons: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateSocialIcons: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    deleteSocialIcons: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateColumnGap: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find((style) =>
                    style.includes("column-gap")
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (style.includes("column-gap")) {
                          return `column-gap: ${action.payload}px;`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (style.includes("column-gap")) {
                          return `column-gap: ${action.payload}px;`;
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
                    styleList.push(`column-gap: ${action.payload}px;`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateHTML: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateVideo: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const { url, link, title } = action.payload;
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePlayIconColor: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updatePlayIconSize: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateVideoTitle: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    addNewIcon: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    deleteIcon: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateIcon: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    changeImageIconStatus: (state, action) => {
      state.isChangeIconImage = action.payload;
    },
    insertImageIcon: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
      state.isChangeIconImage = null;
    },
    updateIconSize: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
      state.isChangeIconImage = null;
    },
    addNewItem: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateItem: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    deleteItem: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateFlexDirection: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    separateMenu: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
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
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
    updateMargin: (state, action) => {
      let temp = state.contentList.map((row, index) => {
        if (index === +state.rowIndex) {
          return row.map((column, index) => {
            if (index === +state.columnIndex) {
              const arr = column.map((content, index) => {
                if (index === +state.contentIndex) {
                  let code = content.content;
                  const preCode = code.slice(0, code.indexOf("style=") + 7);
                  const restCode = code.slice(code.indexOf(">") - 1);
                  let styleList = code
                    .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
                    .split("; ");
                  const check = styleList.find(
                    (style) =>
                      style.includes("margin") &&
                      !(
                        style.includes("margin-left") ||
                        style.includes("margin-right") ||
                        style.includes("margin-bottom") ||
                        style.includes("margin-top")
                      )
                  );
                  if (check) {
                    styleList = styleList.map((style, index) => {
                      if (index !== +styleList.length - 1) {
                        if (
                          style.includes("margin") &&
                          !(
                            style.includes("margin-left") ||
                            style.includes("margin-right") ||
                            style.includes("margin-bottom") ||
                            style.includes("margin-top")
                          )
                        ) {
                          return `margin: ${action.payload};`;
                        } else {
                          return style.concat(";");
                        }
                      } else {
                        if (
                          style.includes("margin") &&
                          !(
                            style.includes("margin-left") ||
                            style.includes("margin-right") ||
                            style.includes("margin-bottom") ||
                            style.includes("margin-top")
                          )
                        ) {
                          return `margin: ${action.payload};`;
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
                    styleList.push(`margin: ${action.payload};`);
                  }
                  code = preCode + styleList.join(" ") + restCode;
                  content.content = code;
                  content.contentCode = HTMLReactParser(code);
                  return content;
                } else {
                  return content;
                }
              });
              return arr;
            } else {
              return column;
            }
          });
        } else {
          return row;
        }
      });
      state.contentList = temp;
    },
  },
});
