import React, { useEffect, useState } from "react";
import { EditStyle } from "./style";
import EditHeader from "./editHeader/editHeader.jsx";
import Vditor from "vditor";
import { useParams } from "react-router";
import { get_essay_detail } from "../../service/detail";
import { set_user_avatar } from "../../service/user";

const EditContent = () => {
  const { id } = useParams();
  const [mdValue, setMdValue] = useState(" ");
  const [title, setTitle] = useState(null);
  const [introduction, setIntroduction] = useState(null);
  const [tab_id, setTab_id] = useState(null);
  let vditor;

  const createVidtor = (params) => {
    let { value } = params;
    value = value ? value : " ";
    let style = "classic";

    // 保存文章
    const saveDoc = () => {
      console.log(vditor.getHTML());
      setMdValue(vditor && vditor.getHTML());
    };

    vditor = new Vditor("vditor", {
      theme: "classic",
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
        },
        "",
        {
          hotkey: "⌘-p",
          name: "切换",
          tipPosition: "p",
          tip: "切换编辑器风格",
          className: "right",
          icon: `<img style="height: 16px;transform:scale(1.5)" src='http://loaf.youlan-lan.xyz/public/image/switch4.png'/>`,
          click() {
            if (style === "classic") {
              vditor.setTheme("dark");
              style = "dark";
            } else {
              vditor.setTheme("classic");
              style = "classic";
            }
          }
        }
      ],
      enable: "true",
      after() {
        vditor.setValue(value);
      },
      blur() {
        saveDoc();
      },
      upload: {
        accept: "image/*",
        multiple: false,
        filename(name) {
          return name
            .replace("/[^(a-zA-Z0-9\u4e00-\u9fa5.)]/g", "")
            .replace("/[?\\/:|<>*[]()$%{}@~]/g", "")
            .replace("/\\s/g", "");
        },
        handler(files) {
          async function uploadImage() {
            console.log(files);
            try {
              const formData = new FormData();
              formData.append("file", files[0]); //名字和后端接口名字对应
              const res = await set_user_avatar(formData);
              value += `\n <img alt=${
                res.data.data.path.split("/")[3]
              } src="http://loaf.youlan-lan.xyz${res.data.data.path}">`;
              vditor.setValue(value);
            } catch (err) {
              console.log(err);
            }
          }
          uploadImage();
        }
      }
    });

    return vditor;
  };

  // 初始化
  useEffect(() => {
    async function init() {
      if (id) {
        console.log("从草稿箱跳转过来，id为：", id);
        const res = await get_essay_detail({ id: id });
        console.log(res.data);
        setMdValue(res.data.content);
        setTitle(res.data.title);
        setIntroduction(res.data.introduction ?? "请填写文章介绍");
        setTab_id(whichTabId(res.data.name)); // 通过板块名称筛选一下 tab_id
        createVidtor({ value: res.data.content });
      } else {
        createVidtor({ value: " " });
      }
    }
    init();
  }, []);

  const whichTabId = (name) => {
    switch (name) {
      case "推荐":
        return 1;
      case "前端":
        return 2;
      case "后端":
        return 3;
      case "Android":
        return 4;
      case "IOS":
        return 5;
      case "人工智能":
        return 6;
      case "开发工具":
        return 7;
      case "代码人生":
        return 8;
      case "阅读":
        return 9;
      case "其他":
        return 10;
    }
  };

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
