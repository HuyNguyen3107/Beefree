import ButtonToolEditor from "@/app/app/edit/components/Sidebar/components/ButtonToolEditor/ButtonToolEditor";
import DivideToolEditor from "@/app/app/edit/components/Sidebar/components/DivideToolEditor/DevideToolEditor";
import GifToolEditor from "@/app/app/edit/components/Sidebar/components/GifToolEditor/GifToolEditor";
import HTMLToolEditor from "@/app/app/edit/components/Sidebar/components/HTMLToolEditor/HTMLToolEditor";
import IconToolEditor from "@/app/app/edit/components/Sidebar/components/IconToolEditor/IconToolEditor";
import ImageToolEditor from "@/app/app/edit/components/Sidebar/components/ImageToolEditor/ImageToolEditor";
import ListToolEditor from "@/app/app/edit/components/Sidebar/components/ListToolEditor/ListToolEditor";
import MenuToolEditor from "@/app/app/edit/components/Sidebar/components/MenuToolEditor/MenuToolEditor";
import ParagraphToolEditor from "@/app/app/edit/components/Sidebar/components/ParagraphToolEditor/ParagraphToolEditor";
import SocialToolEditor from "@/app/app/edit/components/Sidebar/components/SocialToolEditor/SocialToolEditor";
import SpaceToolEditor from "@/app/app/edit/components/Sidebar/components/SpaceToolEditor/SpaceToolEditor";
import StickerToolEditor from "@/app/app/edit/components/Sidebar/components/StickerToolEditor/StickerToolEditor";
import TitleToolEditor from "@/app/app/edit/components/Sidebar/components/TitleToolEditor/TitleToolEditor";
import VideoToolEditor from "@/app/app/edit/components/Sidebar/components/VideoToolEditor/VideoToolEditor";

const editors = [
  {
    id: "title",
    editor: <TitleToolEditor />,
  },
  {
    id: "paragraph",
    editor: <ParagraphToolEditor />,
  },
  {
    id: "list",
    editor: <ListToolEditor />,
  },
  {
    id: "image",
    editor: <ImageToolEditor />,
  },
  {
    id: "button",
    editor: <ButtonToolEditor />,
  },
  {
    id: "divider",
    editor: <DivideToolEditor />,
  },
  {
    id: "spacer",
    editor: <SpaceToolEditor />,
  },
  {
    id: "social",
    editor: <SocialToolEditor />,
  },
  {
    id: "html",
    editor: <HTMLToolEditor />,
  },
  {
    id: "video",
    editor: <VideoToolEditor />,
  },
  {
    id: "icons",
    editor: <IconToolEditor />,
  },
  {
    id: "menu",
    editor: <MenuToolEditor />,
  },
  {
    id: "sticker",
    editor: <StickerToolEditor />,
  },
  {
    id: "gif",
    editor: <GifToolEditor />,
  },
];

export default editors;
