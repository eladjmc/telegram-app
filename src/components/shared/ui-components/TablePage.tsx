import React from "react";
import Table, { TableProps } from "./Table";
import "./TablePage.scss";

interface TablePageProps {
  tableData: TableProps;
  title: string;
}

const TablePage = ({ tableData, title }: TablePageProps) => {
  return (
    <div>
      <h1>
        {title}
      </h1>
      <Table {...tableData} />
    </div>
  );
};

export default TablePage;
