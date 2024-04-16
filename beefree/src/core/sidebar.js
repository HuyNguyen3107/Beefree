const {
  default: ContentSidebar,
} = require("@/app/app/edit/components/Sidebar/components/ContentSidebar/ContentSidebar");
const {
  default: RowSidebar,
} = require("@/app/app/edit/components/Sidebar/components/RowSidebar/RowSidebar");
const {
  default: SettingSidebar,
} = require("@/app/app/edit/components/Sidebar/components/SettingSidebar/SettingSidebar");

const sidebars = [
  {
    type: "contents",
    sidebar: <ContentSidebar />,
  },
  {
    type: "rows",
    sidebar: <RowSidebar />,
  },
  {
    type: "settings",
    sidebar: <SettingSidebar />,
  },
];

export default sidebars;
