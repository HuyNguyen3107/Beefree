export const convertDataToHTML = (data) => {
  const colSpans = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
  };
  return `
  <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/primeicons/7.0.0/primeicons.css"
        integrity="sha512-TrpBJRPu1GwAu1cMDKEHnDbLCnciebxralpA806EEIdNpmbuCAi0hZRBdbNHVl2fgOW96lnYyLIPqY/iL2saNg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

        <style>
          @media screen and (max-width: 575.98px) {
            .mobile {
              width: 480px !important;
            }
          }
        </style>

    </head>

    <body>
        <div class="builder px-6 py-6 mx-auto" id="builder">
      <div style="${data?.generalStyle}">
        ${
          data?.rows?.length
            ? data?.rows
                ?.map((row, rowIndex) => {
                  return `<div
                id="${"builder_row_" + rowIndex}"
              >
                <div
                  id="${"drag_handle_row_" + rowIndex}"
                >
                  <div
                    style="${row?.rowStyle}"
                    id="${"builder_content_" + rowIndex}"
                  >
                    <div style="${
                      data?.contentGeneralStyle + " " + row?.contentAreaStyle
                    }" className="h-full mobile">
                      <div
                        class="${
                          row?.columns?.length > 1 ? "grid grid-cols-6" : ""
                        }"
                      >
                        ${
                          row?.columns?.length
                            ? row?.columns
                                ?.map((column, columnIndex) => {
                                  let colSpan = "";
                                  if (row?.columns?.length > 1) {
                                    if (column?.colSpan) {
                                      colSpan = colSpans[column?.colSpan];
                                    }
                                  }
                                  return `<div id="${
                                    "builder_row_" +
                                    rowIndex +
                                    "_column_" +
                                    columnIndex
                                  }" class="${colSpan}">
                                <div
                                  style="${column?.columnStyle}"
                                  className="h-full"
                                >
                                  ${
                                    column?.contents?.length
                                      ? column?.contents
                                          ?.map((tag, index) => {
                                            return `<div
                                          id="${
                                            "builder_row_" +
                                            rowIndex +
                                            "_column_" +
                                            columnIndex +
                                            "_content_" +
                                            index
                                          }" class="w-full">
                                          <div
                                            id="${
                                              "drag_handle_row_" +
                                              rowIndex +
                                              "_column_" +
                                              columnIndex +
                                              "_content_" +
                                              index
                                            }" class="w-full flex flex-col justify-center items-center">
                                            <div
                                              class="w-full"
                                              id="${
                                                "builder_row_" +
                                                rowIndex +
                                                "_column_" +
                                                columnIndex +
                                                "_content_" +
                                                index
                                              }">
                                              ${tag?.content}
                                            </div>
                                          </div>
                                        </div>`;
                                          })
                                          .join("")
                                      : ""
                                  }
                                </div>
                              </div>`;
                                })
                                .join("")
                            : ""
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
                })
                .join("")
            : ""
        }
      </div>
    </div>
    </body>

    </html>`;
};

export const convertHTMLToData = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const rows = Array.from(doc.querySelectorAll(".builder_content"));
  const data = {
    generalStyle: doc.querySelector(".builder").style.cssText,
    contentGeneralStyle: doc.querySelector(".builder_content").style.cssText,
    rows: rows.map((row) => {
      return {
        rowStyle: row.style.cssText,
        contentAreaStyle: row.querySelector(".h-full").style.cssText,
        columns: Array.from(row.querySelectorAll(".builder_column")).map(
          (column) => {
            return {
              columnStyle: column.style.cssText,
              contents: Array.from(
                column.querySelectorAll(".builder_content")
              ).map((content) => {
                return {
                  content: content.innerHTML,
                };
              }),
            };
          }
        ),
      };
    }),
  };
  return data;
};
