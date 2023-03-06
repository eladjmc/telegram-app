import React, { useEffect, useState } from "react";
import Table, {
  Column,
  GenericData,
} from "../components/shared/ui-components/Table";
import "./PhonesPage.scss";
import API from "../services/api";

const columns: Column[] = [
  { field: "number", title: "Phone Number" },
  { field: "isBanned", title: "Banned" },
];
interface PhoneData {
  number: string;
  isBanned: boolean;
}

const Phones = () => {
  const [phones, setPhones] = useState<PhoneData[]>([]);

  const getPhones = async () => {
    try {
      const result = await API.get("/phones");
      setPhones(result.data);
    } catch (error) {}
  };

  const onRowDelete = async (selectedRow: GenericData) => {
    try {
      await API.delete(`/phones/${selectedRow.number}`);
      await getPhones();
    } catch (error) {}
  };

  const onRowAdd = async (newRow: GenericData) => {
    try {
      await API.post("/phones", newRow);
      await getPhones();
    } catch (error) {}
  };

  useEffect(() => {
    //bring data
    getPhones();
    setPhones([{number:"im a number", isBanned:true}])
  }, []);

  return (
    <section className="PhonePage">
      <Table
        title="Phones List"
        columns={columns}
        data={phones}
        onRowAdd={onRowAdd}
        onRowDelete={onRowDelete}
      />
    </section>
  );
};

export default Phones;
