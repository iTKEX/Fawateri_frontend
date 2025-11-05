/**
 * Table of Contents
 * - Imports
 * - Constants
 * - UI (Component)
 */

// Imports
import { useEffect, useState } from "react";
import "./styles.css";
import { FiSave, FiTrash2 } from "react-icons/fi";

// Constants
const INITIAL_FORM_STATE = {
    company: "",
    title: "",
    description: "",
    date: "",
    warranty: "",
    cost: "",
};

// UI (Component)
export default function BillsForm({ mode = "add", bill = null, onAdd, onEdit, onDelete }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (mode === "edit" && bill) {
            setFormData({
                company: bill.company ?? "",
                title: bill.title ?? "",
                description: bill.description ?? "",
                date: bill.date ?? bill.created_at ?? "",
                warranty: bill.warranty ?? "",
                cost: bill.cost ?? "",
            });
        } else if (mode === "add") {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [mode, bill]);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (mode === "add") await onAdd?.(formData);
        else if (mode === "edit" && bill?.id) await onEdit?.(bill.id, formData);
    }

    async function handleConfirmDelete(event) {
        event.preventDefault();
        if (bill?.id) await onDelete?.(bill.id);
    }

    if (mode === "delete" && bill) {
        return (
            <div className="formCard">
                <h3 className="formCard__title">Delete bill</h3>
                <p className="formCard__hint">Are you sure you want to delete “{bill.title}”?</p>
                <form onSubmit={handleConfirmDelete}>
                    <div className="formCard__actions">
                        <button type="submit" className="formCard__button formCard__button--danger" aria-label="Confirm delete">
                            <FiTrash2 />
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="formCard">
            <h3 className="formCard__title">{mode === "edit" ? "Edit bill" : "Add new bill"}</h3>

            <form onSubmit={handleSubmit} className="formCard__body">
                <div className="formCard__field">
                    <label htmlFor="bill_title" className="formCard__label">Title</label>
                    <input id="bill_title" name="title" type="text" required value={formData.title} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="bill_company" className="formCard__label">Company</label>
                    <input id="bill_company" name="company" type="text" required value={formData.company} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="bill_description" className="formCard__label">Description</label>
                    <input id="bill_description" name="description" type="text" required value={formData.description} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="bill_date" className="formCard__label">Date</label>
                    <input id="bill_date" name="date" type="date" required value={formData.date} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="bill_warranty" className="formCard__label">Warranty</label>
                    <input id="bill_warranty" name="warranty" type="text" required value={formData.warranty} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="bill_cost" className="formCard__label">Cost</label>
                    <input id="bill_cost" name="cost" type="text" required value={formData.cost} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__actions">
                    <button type="submit" className="formCard__button formCard__button--primary" aria-label="Save bill">
                        <FiSave />
                        {mode === "edit" ? "Save changes" : "Add bill"}
                    </button>
                </div>
            </form>
        </div>
    );
}
