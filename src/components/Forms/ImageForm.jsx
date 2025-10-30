import { useEffect, useState } from "react";
import "./styles.css";

export default function ImageForm({
    mode = "add",
    image = null,
    onAdd,
    onEdit,
    onDelete,
    onClose,
}) {
    const initialState = { title: "", url: "" };
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (mode === "edit" && image) {
            setFormData({
                title: image.title ?? "",
                url: image.url ?? "",
            });
        } else if (mode === "add") {
            setFormData(initialState);
        }
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((s) => ({ ...s, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (mode === "add") {
            await onAdd?.(formData);
        } else if (mode === "edit") {
            await onEdit?.(image?.id, formData);
        }
    }

    async function handleConfirmDelete(event) {
        event.preventDefault();
        await onDelete?.(image?.id);
    }

    if (mode === "delete") {
        return (
            <>
                <div className="page-header">
                    <h1>Delete image</h1>
                </div>
                <h2>Are you sure you want to delete “{image?.title || "this image"}”?</h2>
                <form onSubmit={handleConfirmDelete}>
                    <div className="actions">
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn danger">
                            Yes — Delete
                        </button>
                    </div>
                </form>
            </>
        );
    }

    return (
        <div className="forms-card">
            <h3 className="forms-card-title">
                {mode === "edit" ? "Edit image" : "Add new image"}
            </h3>

            <form onSubmit={handleSubmit} className="forms">
                <div className="field">
                    <label htmlFor="id_title">Title:</label>
                    <input
                        type="text"
                        id="id_title"
                        name="title"
                        value={formData.title}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="field">
                    <label htmlFor="id_url">Image URL:</label>
                    <input
                        type="url"
                        id="id_url"
                        name="url"
                        value={formData.url}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="actions">
                    <button type="button" className="btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="btn submit">
                        {mode === "edit" ? "Save Changes" : "Add Image"}
                    </button>
                </div>
            </form>
        </div>
    );
}
