import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { updateContent } = builderSlice.actions;
import HTMLReactParser from "html-react-parser";

const TextEditor = ({ tagContent, tagIndex, styleEditor }) => {
  // console.log(tagContent);
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState(tagContent);
  const [tag, setTag] = useState("");
  useEffect(() => {
    if (tagContent.includes("<h")) {
      setTag(
        `<h1 style="font-size: 36px; font-weight: 700; color: blueviolet; text-align: left; width: 100%; padding: 0.5rem;"></h1>`
      );
    } else if (tagContent.includes("<ul")) {
      setTag(
        `<ul style="font-size: 16px;
        font-weight: 400;
        text-align: left;
        list-style-type: disc;
        width: 100%;
        padding: 0.5rem; list-style-position: inside; display: flex; flex-direction: column;">
        <li>Empty content is not allowed</li>
        </ul>`
      );
    } else if (tagContent.includes("<p")) {
      setTag(
        `<div style="font-size: 16px;
        font-weight: 400;
        text-align: left;
        width: 100%;
        padding-left: 0.5rem;
        padding-right: 0.5rem; display: flex; flex-direction: column;">
        <p></p>
        </div>`
      );
    }
  }, []);

  useEffect(() => {
    setContent(tagContent);
  }, [tagContent]);

  const handleChange = (newContent) => {
    if (newContent === "") {
      newContent = tag;
    }
    if (newContent.includes("<h")) {
      if (newContent.lastIndexOf("<h") !== newContent.indexOf("<h")) {
        const headTag = newContent.slice(1, 3);
        const temp = [];
        let tempContent = newContent;
        while (tempContent !== "") {
          const preContent = tempContent.slice(
            0,
            tempContent.indexOf("</h") + 5
          );
          tempContent = tempContent.slice(tempContent.indexOf("</h") + 5);
          temp.push(preContent);
        }
        const contentList = temp.map((item) => {
          const styleContent = item.slice(
            item.indexOf(`"`) + 1,
            item.lastIndexOf(`"`)
          );
          let styleList = styleContent.split("; ");
          styleList = styleList.map((item, index) => {
            if (index !== styleList.length - 1) {
              return item.concat(";");
            }
            return item;
          });
          const arr = [
            "font-weight: 700;",
            "text-align: left;",
            "width: 100%;",
            "padding: 0.5rem;",
          ];
          styleList = styleList.filter((item) => {
            if (arr.includes(item)) {
              return false;
            }
            return true;
          });
          return `<span style="${styleList.join(" ")}">${item
            .slice(item.indexOf(">") + 1, item.lastIndexOf("<"))
            .replaceAll(`\n`, "")
            .trim()}</span>`;
        });
        newContent = `<${headTag} style="font-weight: 700; text-align: left; width: 100%; padding: 0.5rem;">${contentList.join(
          ""
        )}</${headTag}>`;
      } else {
        if (newContent.slice(newContent.indexOf("</h") + 5)) {
          newContent = newContent.slice(0, newContent.indexOf("</h") + 5);
        }
      }
    }
    setContent(newContent);
    dispatch(
      updateContent({
        content: newContent,
        tagIndex,
        code: HTMLReactParser(newContent),
      })
    );
  };

  return (
    <div className={"w-full " + styleEditor} id={"text_editor_" + tagIndex}>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          handleChange(newContent);
        }}
      />
    </div>
  );
};

export default TextEditor;
