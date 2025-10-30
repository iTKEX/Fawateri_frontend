import { useEffect, useState } from "react";
import "./styles.css";

export default function BillsForm({ mode = "add", bill = null, onAdd, onEdit, onDelete, onClose }) {
    const initialState = {
        company: "",
        title: "",
        description: "",
        date: "",
        warranty: "",
        cost: "",
    };

    const [formData, setFormData] = useState(initialState);

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
            setFormData(initialState);
        }
    }, []);

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (mode === "add") {
            await onAdd?.(formData);
        } else if (mode === "edit" && bill?.id) {
            await onEdit?.(bill.id, formData);
        }
    }

    async function handleConfirmDelete(e) {
        e.preventDefault();
        if (bill?.id) {
            await onDelete?.(bill.id);
        }
    }

    if (mode === "delete" && bill) {
        return (
            <>
                <div className="page-header">
                    <h1>Delete bill</h1>
                </div>
                <h2>Are you sure you want to delete “{bill.title}”?</h2>

                <form onSubmit={handleConfirmDelete}>
                    <div className="actions">
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn danger">Yes — Delete</button>
                    </div>
                </form>
            </>
        );
    }

    return (
        <div className="forms-card">
            <h3 className="forms-card-title">
                {mode === "edit" ? "Edit bill" : "Add new bill"}
            </h3>

            <form onSubmit={handleSubmit} className="forms">
                <div className="field">
                    <label htmlFor="id_title">Title:</label>
                    <input
                        value={formData.title}
                        type="text"
                        name="title"
                        id="id_title"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_company">Company:</label>
                    <input
                        value={formData.company}
                        type="text"
                        name="company"
                        id="id_company"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_description">Description:</label>
                    <input
                        value={formData.description}
                        type="text"
                        name="description"
                        id="id_description"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_date">Date:</label>
                    <input
                        value={formData.date}
                        type="date"
                        name="date"
                        id="id_date"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_warranty">Warranty:</label>
                    <input
                        value={formData.warranty}
                        type="text"
                        name="warranty"
                        id="id_warranty"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_cost">Cost:</label>
                    <input
                        value={formData.cost}
                        type="text"
                        name="cost"
                        id="id_cost"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="actions">
                    <button type="button" className="btn" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn submit">
                        {mode === "edit" ? "Save Changes" : "Add Bill"}
                    </button>
                </div>
            </form>
        </div>
    );
}
