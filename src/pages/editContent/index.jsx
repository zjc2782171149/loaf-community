import React, { useEffect, useState } from "react";
import { EditStyle } from "./style";
// import { Space } from "antd";
import EditHeader from "./editHeader/editHeader.jsx";
import Vditor from "vditor";

const EditContent = () => {
  const [mdValue, setMdValue] = useState(" ");
  const createVidtor = (params) => {
    let { value } = params;
    value = value ? value : " ";

    // 保存文章
    const saveDoc = () => {
      console.log(vditor.getHTML());
      setMdValue(vditor && vditor.getHTML());
    };

    const vditor = new Vditor("vditor", {
      // theme: "dark",
      height: 800,
      mode: "sv", //及时渲染模式
      placeholder: "开始撰写你的文章吧",
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "upload",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "edit-mode",
        {
          name: "more",
          toolbar: [
            "both",
            "code-theme",
            "content-theme",
            "export",
            "outline",
            "preview",
            "devtools",
            "info",
            "help"
          ]
        },
        "|",
        {
          hotkey: "⌘-S",
          name: "save",
          tipPosition: "s",
          tip: "保存",
          className: "right",
          icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/save.svg'/>`,
          click() {
            saveDoc();
          }
        }
      ],
      enable: "true",
      after() {
        vditor.setValue(value);
      },
      blur() {
        saveDoc();
      }
    });

    return vditor;
  };

  // 初始化
  useEffect(() => {
    createVidtor({ value: "" });
  }, []);

  return (
    <EditStyle>
      <div className="editorWrap">
        <EditHeader content={mdValue} />
        <div id="vditor" />
      </div>
    </EditStyle>
  );
};

export default EditContent;
