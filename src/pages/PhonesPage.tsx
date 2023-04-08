import React, { ChangeEvent, useEffect, useState } from "react";
import Table, {
  Column,
  GenericData,
} from "../components/shared/ui-components/Table";
import "./PhonesPage.scss";
import API from "../services/api";
import Modal, { ModalButton } from "../components/shared/ui-components/Modal";
import Input, { InputProps } from "../components/shared/ui-components/Input";
import {Pages, useGlobalContext} from "../context/LoginContext";
import TablePage from "../components/shared/ui-components/TablePage";

const columns: Column[] = [
  { field: "phone", title: "Phone Number" },
  { field: "is_banned", title: "Banned" },
  { field: "is_connected", title: "Connected" },
];

interface PhoneData {
  phone: string;
  is_banned: boolean;
  is_connected: boolean;
}

interface ModalData {
  phoneNumber: string;
  hashCode: string;
}

const Phones = () => {
  const [phones, setPhones] = useState<PhoneData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<ModalData | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [modalError, setModalError] = useState("");

  const { setNewPage } = useGlobalContext();

  useEffect(() => {
    setNewPage(Pages.PHONES);
  });

  const modalButtons: ModalButton[] = [
    {
      buttonText: "Submit",
      handleClick: async () => {
        if (!isModalOpen) {
          return;
        }
        try {
          const result = await API.post(
            `/phones/sign`,
            {
              phone: isModalOpen.phoneNumber,
              code: tokenInput,
            }
          );
          if (result.status === 200) {
            setIsModalOpen(null);
            setTokenInput("");
            setModalError("");
            getPhones();
          }
        } catch (error) {
          setModalError("Token Invalid, try again");
        }
      },
    },
    {
      buttonText: "Cancel",
      handleClick: () => {
        setIsModalOpen(null);
        setTokenInput("");
        setModalError("");
      },
    },
  ];

  const onTokenInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    setTokenInput(e.target.value);
    setModalError("");
  };

  const modalInput: InputProps = {
    label: "Token",
    onChange: onTokenInputChange,
    type: "text",
    value: tokenInput,
    placeholder: " ",
  };

  const getPhones = async () => {
    try {
      const result = await API.get("/phones/");
      setPhones(result.data);
    } catch (error) {}
  };

  const onRowDelete = async (selectedRow: GenericData) => {
    try {
      await API.delete(`/phones/${selectedRow.phone}`, null);
      await getPhones();
    } catch (error) {}
  };

  const onRowAdd = async (newRow: GenericData) => {
    try {
      const result = await API.post(`/phones/${newRow.phone}`, null);
      const { data } = result;
      if (!data.phone_code_hash || !data.phone || data.error) {
        //TODO: display error message
        return;
      }
      setIsModalOpen({
        phoneNumber: data.phone,
        hashCode: data.phone_code_hash,
      });
      getPhones();
    } catch (error: any) {
      if (error?.code === "ERR_BAD_REQUEST") {
        const errorMessage = error.response.data;
        // display error message
      }
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    getPhones();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <section className="PhonePage">
      <Modal
        buttons={modalButtons}
        isOpen={!!isModalOpen}
        message={<Input {...modalInput} />}
        error={modalError}
        title={"Please Insert Your Token"}
      />
      <TablePage
        tableData={{
          columns,
          data: phones,
          onRowAdd,
          onRowDelete,
          loading: false,
          title: "Phones List",
        }}
        title={"Phones Connected"}
      />
    </section>
  );
};

export default Phones;
