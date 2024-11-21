"use client";
import React, {useEffect, useState} from "react";
import Editor from "@monaco-editor/react";
import {useSelector} from "react-redux";
import {convertDataToHTML} from "@/core/convert";

function CopyHTML() {
    const data = useSelector((state) => state.builder.data);
    const [code, setCode] = useState("");
    useEffect(() => {
        setCode(convertDataToHTML(data));
    }, []);
    return (
        <>
            <Editor
                height="400px"
                language="html"
                theme="vs-dark"
                value={code}
                options={{
                    inlineSuggest: true,
                    fontSize: "16px",
                    formatOnType: true,
                    autoClosingBrackets: true,
                    minimap: {scale: 2},
                    autoClosingComments: true,
                    autoClosingDelete: true,
                    autoClosingOvertype: true,
                    autoClosingQuotes: true,
                    autoDetectHighContrast: true,
                    autoIndent: true,
                    automaticLayout: true,
                    autoSurround: true,
                    trimAutoWhitespace: true,
                }}
            />
        </>
    );
}

export default CopyHTML;
