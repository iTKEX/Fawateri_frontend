// IMPORTS
import "./styles.css";
import * as billsAPI from "../../utilities/bills-api";
import { useEffect, useState } from "react";
import BillsForm from "../../components/Forms/BillsForm";
import BillsCard from "../../components/BillsCard/BillsCard";
import Popup from "../../components/Popup/Popup";
import ImageForm from "../../components/Forms/ImageForm";

export default function Bills() {
    const [allBills, setAllBills] = useState([]);
    const [modal, setModal] = useState({ open: false, type: null, bill: null });

    const [imgModal, setImgModal] = useState({
        open: false,
        type: null,
        bill: null,
        image: null,
    });

    const openAdd = () => setModal({ open: true, type: "add", bill: null });
    const openEdit = (bill) => setModal({ open: true, type: "edit", bill });
    const openDelete = (bill) => setModal({ open: true, type: "delete", bill });
    const closeModal = () => setModal({ open: false, type: null, bill: null });

    const openAddImage = (bill) =>
        setImgModal({ open: true, type: "add", bill, image: null });
    const openEditImage = (bill, image) =>
        setImgModal({ open: true, type: "edit", bill, image });
    const openDeleteImage = (bill, image) =>
        setImgModal({ open: true, type: "delete", bill, image });
    const closeImgModal = () =>
        setImgModal({ open: false, type: null, bill: null, image: null });

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
            setAllBills((bills) => bills.map((bill) => (bill.id === id ? updated : bill)));
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteBill(id) {
        try {
            const response = await billsAPI.deleteBill(id);
            if (response?.success !== false) {
                setAllBills((bills) => bills.filter((bill) => bill.id !== id));
                closeModal();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addImage(billId, formData) {
        try {
            const updatedBill = await billsAPI.upsertBillImage(billId, formData);
            setAllBills((bills) => bills.map((bill) => (bill.id === billId ? updatedBill : bill)));
            closeImgModal();
        } catch (err) {
            console.log(err);
        }
    }

    async function editImage(billId, _imageId, formData) {
        try {
            const updatedBill = await billsAPI.upsertBillImage(billId, formData);
            setAllBills((bills) => bills.map((bill) => (bill.id === billId ? updatedBill : bill)));
            closeImgModal();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteImage(billId) {
        try {
            const updatedBill = await billsAPI.deleteBillImage(billId);
            setAllBills((bills) => bills.map((bill) => (bill.id === billId ? updatedBill : bill)));
            closeImgModal();
        } catch (error) {
            console.log(error);
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

            {imgModal.open && (
                <Popup modalAction={imgModal.open} setModalAction={closeImgModal}>
                    <ImageForm
                        mode={imgModal.type}
                        image={imgModal.image}
                        onAdd={(data) => addImage(imgModal.bill.id, data)}
                        onEdit={(imageId, data) => editImage(imgModal.bill.id, imageId, data)}
                        onDelete={() => deleteImage(imgModal.bill.id)}
                        onClose={closeImgModal}
                    />
                </Popup>
            )}

            <BillsCard
                allBills={allBills}
                onEditClick={openEdit}
                onDeleteClick={openDelete}
                onAddImage={openAddImage}
                onEditImage={openEditImage}
                onDeleteImage={openDeleteImage}
            />
        </>
    );
}
