import "./styles.css"
import { useState } from 'react'

export default function BillsForm({ addBill }) {
    const initialState = { company: "", title: "", description: "", date: "", warranty: "", cost: "" }
    const [formData, setFormData] = useState([])

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    function handleSubmit(event) {
        event.preventDefault();
        addBill(formData)
        setFormData(initialState)
    }

    return (
        <div className="forms-card">
            <h3 className="forms-card-title">Add new bill</h3>

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
                    <button type="submit" className="btn submit">Add Bill</button>
                </div>
            </form>
        </div>
    )
}
