import React, { useEffect, useState } from "react";
import Table, {
  Column,
  GenericData,
} from "../components/shared/ui-components/Table";
import "./PhonesPage.scss";
import API from "../services/api";

const columns: Column[] = [
  { field: "number", title: "Phone Number" },
  { field: "is_banned", title: "Banned" },
];
interface PhoneData {
  number: string;
  is_banned: boolean;
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
      await API.post(`/phones/${newRow.number}`, null);
      await getPhones();
    } catch (error) {}
  };

  useEffect(() => {
    //bring data
    // setPhones([{ number: "im a number", is_banned: true },{ number: "im a number", is_banned: true }]);
    const abortController = new AbortController();

    getPhones();
    return ()=>{
      abortController.abort(); 
    }
  }, []);

  return (
    <section className="PhonePage">
      <h1>Phones Connected</h1>
      <div className="table-container">
        <Table
          title="Phones List"
          columns={columns}
          data={phones}
          onRowAdd={onRowAdd}
          onRowDelete={onRowDelete}
        />
      </div>
    </section>
  );
};

export default Phones;
