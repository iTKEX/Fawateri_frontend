// IMPORTS
import "./styles.css";
import * as billsAPI from "../../utilities/bills-api";
import { useEffect, useState } from "react";
import BillsForm from "../../components/Forms/BillsForm";
import BillsCard from "../../components/BillsCard/BillsCard";
import Popup from "../../components/Popup/Popup";

export default function Bills() {
    const [allBills, setAllBills] = useState([]);
    const [modal, setModal] = useState({ open: false, type: null, bill: null });

    const openAdd = () => setModal({ open: true, type: "add", bill: null });
    const openEdit = (bill) => setModal({ open: true, type: "edit", bill });
    const openDelete = (bill) => setModal({ open: true, type: "delete", bill });
    const closeModal = () => setModal({ open: false, type: null, bill: null });

    async function addBill(formData) {
        try {
            const newBill = await billsAPI.createNewBill(formData);
            setAllBills((bills) => [...bills, newBill]);
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    async function editBill(id, formData) {
        try {
            const updated = await billsAPI.updateBill(id, formData);
            setAllBills((bills) =>
                bills.map((bill) => (bill.id === id ? updated : bill))
            );
            closeModal();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteBill(id) {
        try {
            const respone = await billsAPI.deleteBill(id);
            if (respone?.success !== false) {
                setAllBills((bills) => bills.filter((bill) => bill.id !== id));
                closeModal();
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getAllBills() {
            try {
                const allBillsData = await billsAPI.getAllBills();
                setAllBills(allBillsData);
            } catch (error) {
                console.log(error);
            }
        }
        getAllBills();
    }, []);

    if (!allBills) return <p>Loading Bills...</p>;

    return (
        <>
            <button onClick={openAdd}>Add new Bill</button>

            {modal.open && (
                <Popup modalAction={modal.open} setModalAction={closeModal}>
                    <BillsForm
                        mode={modal.type}
                        bill={modal.bill}
                        onAdd={addBill}
                        onEdit={editBill}
                        onDelete={deleteBill}
                        onClose={closeModal}
                    />
                </Popup>
            )}

            <BillsCard
                allBills={allBills}
                onEditClick={openEdit}
                onDeleteClick={openDelete}
            />
        </>
    );
}
