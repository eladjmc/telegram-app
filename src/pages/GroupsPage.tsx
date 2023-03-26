import React, { useEffect, useState } from "react";
import Table, {
  Column,
  GenericData,
} from "../components/shared/ui-components/Table";
import "./GroupsPage.scss";
import API from "../services/api";
import {Pages, useGlobalContext} from "../context/LoginContext";

const columns: Column[] = [
  { field: "invite_link", title: "Group Invite Link" },
  { field: "invitable", title: "Invitable" },
  { field: "last_invited", title: "Last Invited" },
  { field: "participants", title: "Participants" },
];

interface GroupData {
  invite_link: string;
  invitable: boolean,
  last_invited: number,
  participants: number
}

const Groups = () => {
  const [groups, setGroups] = useState<GroupData[]>([]);
  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage(Pages.GROUPS);
  });

  const getGroups = async () => {
    try {
      const result = await API.get("/groups/");
      setGroups(result.data);
    } catch (error) {}
  };

  const onRowDelete = async (selectedRow: GenericData) => {
    try {
      await API.delete(`/groups/${selectedRow.invite_link}`);
      await getGroups();
    } catch (error) {}
  };

  const onRowAdd = async (newRow: GenericData) => {
    try {
      await API.post(`/groups/${newRow.invite_link}`, null);
      await getGroups();
    } catch (error) {}
  };

  const onRowUpdate = async (newData: GenericData, oldData: any) => {
    try {
      await API.put(`/groups/${oldData.invite_link}`, newData);
      await getGroups();
    } catch (error) {}
  };

  useEffect(() => {
    const abortController = new AbortController();

    getGroups();

    return () => {
      
      abortController.abort();
    };
  }, []);

  return (
    <section className="GroupsPage">
      <h1>Groups Connected</h1>
      <div className="table-container">
        (
          <Table
            title="Groups List"
            columns={columns}
            data={groups}
            onRowAdd={onRowAdd}
            onRowDelete={onRowDelete}
            onRowUpdate={onRowUpdate}
          />
        )
      </div>
    </section>
  );
};

export default Groups;
