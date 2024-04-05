import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import { builderSlice } from "@/redux/slice/builderSlice";
const { updateContent } = builderSlice.actions;
import HTMLReactParser from "html-react-parser";

const TextEditor = ({ tagContent, tagIndex, styleEditor }) => {
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
        padding: 0.5rem;">
        <li>Empty content is not allowed</li>
        </ul>`
      );
    } else if (tagContent.includes("<p")) {
      setTag(
        `<p style="font-size: 16px;
        font-weight: 400;
        text-align: left;
        width: 100%;
        padding-left: 0.5rem;
        padding-right: 0.5rem;"></p>`
      );
    }
  }, []);

  return (
    <div className={"w-full " + styleEditor} id={"text_editor_" + tagIndex}>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          if (newContent === "") {
            newContent = tag;
          }
          if (newContent.includes("<h")) {
            newContent = newContent.slice(0, newContent.indexOf("</h1>") + 5);
          }
          setContent(newContent);
          dispatch(
            updateContent({
              tagIndex,
              code: HTMLReactParser(newContent),
            })
          );
        }}
      />
    </div>
  );
};

export default TextEditor;
