import {twi} from "tw-to-css";

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
        <title>Beefree</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/primeicons/7.0.0/primeicons.css"
        integrity="sha512-TrpBJRPu1GwAu1cMDKEHnDbLCnciebxralpA806EEIdNpmbuCAi0hZRBdbNHVl2fgOW96lnYyLIPqY/iL2saNg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdn.jsdelivr.net/npm/react-icons@5.3.0/lib/iconContext.min.js"></script>
        <style>
          @media screen and (max-width: 575.98px) {
            .mobile {
              width: 480px !important;
            }
          }
        </style>

    </head>

    <body>
      <div class="builder" id="builder" style="margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; padding-top: 1.5rem; padding-bottom: 1.5rem;">
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
                        "height: 100%; " + data?.contentGeneralStyle + " " + row?.contentAreaStyle
                    }" class="mobile">
                      <div
                        style="${
                        row?.columns?.length > 1 ? "display: grid; grid-template-columns: repeat(6, minmax(0, 1fr));" : ""
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
                                    }" style="${twi(colSpan)}">
                                <div
                                  style="${"height: 100%; " + column?.columnStyle}"
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
                                                    }" style="width: 100%;">
                                          <div
                                            id="${
                                                        "drag_handle_row_" +
                                                        rowIndex +
                                                        "_column_" +
                                                        columnIndex +
                                                        "_content_" +
                                                        index
                                                    }" style="display: flex; width: 100%; flex-direction: column; align-items: center; justify-content: center;">
                                            <div
                                              style="width: 100%;"
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
