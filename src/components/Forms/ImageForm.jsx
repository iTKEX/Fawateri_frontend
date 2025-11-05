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
const INITIAL_FORM_STATE = { title: "", url: "" };

// UI (Component)
export default function ImageForm({ mode = "add", image = null, onAdd, onEdit, onDelete }) {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (mode === "edit" && image) {
            setFormData({ title: image.title ?? "", url: image.url ?? "" });
        } else if (mode === "add") {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [mode, image]);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (mode === "add") await onAdd?.(formData);
        else if (mode === "edit") await onEdit?.(image?.id, formData);
    }

    async function handleConfirmDelete(event) {
        event.preventDefault();
        await onDelete?.(image?.id);
    }

    if (mode === "delete") {
        return (
            <div className="formCard">
                <h3 className="formCard__title">Delete image</h3>
                <p className="formCard__hint">Are you sure you want to delete “{image?.title || "this image"}”?</p>
                <form onSubmit={handleConfirmDelete}>
                    <div className="formCard__actions">
                        <button type="submit" className="formCard__button formCard__button--danger" aria-label="Confirm delete image">
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
            <h3 className="formCard__title">{mode === "edit" ? "Edit image" : "Add new image"}</h3>

            <form onSubmit={handleSubmit} className="formCard__body">
                <div className="formCard__field">
                    <label htmlFor="image_title" className="formCard__label">Title</label>
                    <input id="image_title" name="title" type="text" required value={formData.title} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__field">
                    <label htmlFor="image_url" className="formCard__label">Image URL</label>
                    <input id="image_url" name="url" type="url" required value={formData.url} onChange={handleChange} className="formCard__input" />
                </div>

                <div className="formCard__actions">
                    <button type="submit" className="formCard__button formCard__button--primary" aria-label="Save image">
                        <FiSave />
                        {mode === "edit" ? "Save changes" : "Add image"}
                    </button>
                </div>
            </form>
        </div>
    );
}
