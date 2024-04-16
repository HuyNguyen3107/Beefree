import { createSlice } from "@reduxjs/toolkit";
import HTMLReactParser from "html-react-parser";

const initialState = {
  contentList: [],
  isUploadFile: false,
  contentIndex: null,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addContent: (state, action) => {
      const temp = [];
      if (state.contentList.length) {
        state.contentList.forEach((item, index) => {
          if (+action.payload.tagIndex === +index) {
            if (!action.payload.isAppend) {
              temp.push(action.payload.tag);
              temp.push(item);
            } else {
              temp.push(item);
              temp.push(action.payload.tag);
            }
          } else {
            temp.push(item);
          }
        });
      } else {
        temp.push(action.payload.tag);
      }
      state.contentList = temp;
    },
    updateContent: (state, action) => {
      let temp;
      if (action.payload?.tagIndex || +action.payload?.tagIndex === 0) {
        temp = state.contentList.map((content, index) => {
          if (+index === +action.payload.tagIndex) {
            content.content = action.payload.content;
            content.contentCode = action.payload.code;
            return content;
          } else {
            return content;
          }
        });
      } else if (action.payload?.contentId) {
        temp = state.contentList.map((content, index) => {
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
      } else if (action.payload?.hideEditor) {
        temp = state.contentList.map((content) => {
          if (content.isShow) {
            content.isShow = false;
          }
          return content;
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
    replicationContent: (state, action) => {
      const temp = [];
      state.contentList.forEach((content, index) => {
        const typeList = ["title", "paragraph", "list"];
        if (+index === +state.contentIndex) {
          temp.push(content);
          const newContent = {
            ...content,
          };
          if (typeList.includes(newContent.id)) {
            newContent.isShow = false;
            temp.push(newContent);
          } else {
            temp.push(content);
          }
        } else {
          temp.push(content);
        }
      });
      state.contentList = temp;
    },
    deleteContent: (state, action) => {
      const temp = [];
      state.contentList.forEach((content, index) => {
        if (+index !== +state.contentIndex) {
          temp.push(content);
        }
      });
      state.contentList = temp;
    },
    sortContentList: (state, action) => {
      const dragContent = state.contentList.find((content, index) => {
        return +action.payload.indexDrag === +index;
      });
      const dropContent = state.contentList.find((content, index) => {
        return +action.payload.indexDrop === +index;
      });
      const temp = [];
      state.contentList.forEach((content, index) => {
        if (+action.payload.indexDrag === +index) {
          temp.push(dropContent);
        } else if (+action.payload.indexDrop === +index) {
          temp.push(dragContent);
        } else {
          temp.push(content);
        }
      });
      state.contentList = temp;
    },
    updateTitle: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updateFontFamily: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
            styleList.push(`font-family: &quot;${action.payload}&quot;;`);
          }
          code = preCode + styleList.join(" ") + restCode;
          content.content = code;
          content.contentCode = HTMLReactParser(code);
          return content;
        } else {
          return content;
        }
      });
      state.contentList = temp;
    },
    updateFontWeight: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
              `font-weight: ${action.payload === "Bold" ? "700" : "400"};`
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
      state.contentList = temp;
    },
    updateTextColor: (state, action) => {
      const temp = state.contentList.map((content, index) => {
        if (index === +state.contentIndex) {
          let code = content.content;
          const preCode = code.slice(0, code.indexOf("style=") + 7);
          const restCode = code.slice(code.indexOf(">") - 1);
          let styleList = code
            .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
            .split("; ");
          const check = styleList.find((style) => style.includes("color"));
          if (check) {
            styleList = styleList.map((style, index) => {
              if (index !== +styleList.length - 1) {
                if (style.includes("color")) {
                  return `color: ${action.payload};`;
                } else {
                  return style.concat(";");
                }
              } else {
                if (style.includes("color")) {
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
      state.contentList = temp;
    },
    updateLinkColor: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
              let styleList = code.slice(0, code.indexOf(`"`)).split("; ");
              code = code.slice(code.indexOf(`"`));
              styleList = styleList.map((style, index) => {
                if (index !== +styleList.length - 1) {
                  if (style.includes("color")) {
                    return `color: ${action.payload};`;
                  } else {
                    return style.concat(";");
                  }
                } else {
                  if (style.includes("color")) {
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
      state.contentList = temp;
    },
    updateAlign: (state, action) => {
      const temp = state.contentList.map((content, index) => {
        if (index === +state.contentIndex) {
          let code = content.content;
          const preCode = code.slice(0, code.indexOf("style=") + 7);
          const restCode = code.slice(code.indexOf(">") - 1);
          let styleList = code
            .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
            .split("; ");
          const check = styleList.find((style) => style.includes("text-align"));
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
      state.contentList = temp;
    },
    updateLineHeight: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updateLetterSpacing: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updateFontSize: (state, action) => {
      const temp = state.contentList.map((content, index) => {
        if (index === +state.contentIndex) {
          let code = content.content;
          const preCode = code.slice(0, code.indexOf("style=") + 7);
          const restCode = code.slice(code.indexOf(">") - 1);
          let styleList = code
            .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
            .split("; ");
          const check = styleList.find((style) => style.includes("font-size"));
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
      state.contentList = temp;
    },
    updateListStyleType: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updateParagraphSpacing: (state, action) => {
      const temp = state.contentList.map((content, index) => {
        if (index === +state.contentIndex) {
          let code = content.content;
          const preCode = code.slice(0, code.indexOf("style=") + 7);
          const restCode = code.slice(code.indexOf(">") - 1);
          let styleList = code
            .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
            .split("; ");
          const check = styleList.find((style) => style.includes("row-gap"));
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
      state.contentList = temp;
    },
    updatePadding: (state, action) => {
      const temp = state.contentList.map((content, index) => {
        if (index === +state.contentIndex) {
          let code = content.content;
          const preCode = code.slice(0, code.indexOf("style=") + 7);
          const restCode = code.slice(code.indexOf(">") - 1);
          let styleList = code
            .slice(code.indexOf("style=") + 7, code.indexOf(">") - 1)
            .split("; ");
          const check = styleList.find((style) => style.includes("padding"));
          if (check) {
            styleList = styleList.map((style, index) => {
              if (index !== +styleList.length - 1) {
                if (style.includes("padding")) {
                  return `padding: ${action.payload}px;`;
                } else {
                  return style.concat(";");
                }
              } else {
                if (style.includes("padding")) {
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
      state.contentList = temp;
    },
    updatePaddingLeft: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updatePaddingRight: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updatePaddingTop: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
    updatePaddingBottom: (state, action) => {
      const temp = state.contentList.map((content, index) => {
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
      state.contentList = temp;
    },
  },
});
