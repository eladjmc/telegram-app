import "./Table.scss";

import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

export interface GenericData {
  [key: string]: string | number | boolean;
}
export interface Column {
  title: string;
  field: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  title: string;
  onRowAdd: (newRow: GenericData) => Promise<void>;
  onRowUpdate?: (newData: GenericData, oldData: any) => Promise<void>;
  onRowDelete: (selectedRow: any) => Promise<void>;
}

const Table = ({
  columns,
  data,
  title,
  onRowAdd,
  onRowUpdate,
  onRowDelete,
}: TableProps) => {
  const defaultMaterialTheme = createTheme({});

  return (
    <div className="table-container">
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          editable={{
            onRowAdd,
            onRowUpdate,
            onRowDelete,
          }}
          options={{
            paging: true,
            headerStyle: {
              backgroundColor: "#C3ACD0",
              color: "#fffff",
              fontSize: "1.6rem",
              fontWeight: 500,
            },

            pageSize: 5, // make initial page size
            emptyRowsWhenPaging: true, // To avoid of having empty rows
            pageSizeOptions: [5, 10, 20, 50], // rows selection options
            paginationType: "stepped",
            // paginationPosition: "top",
            showFirstLastPageButtons: true,
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, title),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, title),
              },
            ],
            addRowPosition: "first",
            actionsColumnIndex: -1,
            rowStyle: (data, index) =>
              !(index % 2) ? {} : { background: "#F7EFE5" },
          }}
          title={title}
          columns={columns}
          data={data}
        />
      </ThemeProvider>
    </div>
  );
};
export default Table;
