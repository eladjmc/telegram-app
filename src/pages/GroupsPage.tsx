import React, { useEffect, useState } from "react";
import Table, {
  Column,
  GenericData,
} from "../components/shared/ui-components/Table";
import "./GroupsPage.scss";
import API from "../services/api";
import { Pages, useGlobalContext } from "../context/LoginContext";
import {toast, ToastContainer} from "react-toastify";
import TablePage from "../components/shared/ui-components/TablePage";

const columns: Column[] = [
  { field: "invite_link", title: "Group Invite Link" },
  { field: "invitable", title: "Invitable" },
  { field: "last_invited", title: "Last Invited" },
  { field: "participants", title: "Participants" },
];

interface GroupData {
  invite_link: string;
  invitable: boolean;
  last_invited: number;
  participants: number;
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
      const result = await API.delete(`/groups/`, { invite_link: selectedRow.invite_link });
      if (result.data.error) {
        toast.error(result.data.error);
      }
      setGroups(result.data)
    } catch (error: any) {
      toast.error("Error deleting group");
    }
  };

  const onRowAdd = async (newRow: GenericData) => {
    try {
      await API.post(`/groups/`, { invite_link: newRow.invite_link });
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
      <TablePage tableData={{
        columns,
        data: groups,
        onRowAdd,
        onRowDelete,
        loading: false,
        title: "Groups List"
      }} title={"Groups Connected"} />
      <ToastContainer />
    </section>
  );
};

export default Groups;
