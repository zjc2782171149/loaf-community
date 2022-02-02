import React, { useEffect, useState } from "react";
import { EditStyle } from "./style";
// import { Space } from "antd";
import EditHeader from "./editHeader/editHeader.jsx";
import Vditor from "vditor";
import { useParams } from "react-router";
import { get_essay_detail } from "../../service/detail";

const EditContent = () => {
  const { id } = useParams();
  const [mdValue, setMdValue] = useState(" ");
  const [title, setTitle] = useState(null);
  const [introduction, setIntroduction] = useState(null);
  const [tab_id, setTab_id] = useState(null);
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
    async function init() {
      createVidtor({ value: "" });
      if (id) {
        const res = await get_essay_detail({ id: id });
        setMdValue(res.data.content);
        setTitle(res.data.title);
        setIntroduction(res.data.introduction);
        setTab_id(res.data.tab_id);
      }
    }
    init();
  }, []);

  return (
    <EditStyle>
      <div className="editorWrap">
        <EditHeader
          contentEdit={mdValue}
          titleEdit={title}
          introductionEdit={introduction}
          tab_idEdit={tab_id}
        />
        <div id="vditor" />
      </div>
    </EditStyle>
  );
};

export default EditContent;
