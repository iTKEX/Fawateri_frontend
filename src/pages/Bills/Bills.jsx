/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 * - Hooks (State/Refs/Effects)
 * - Derived Data (useMemo)
 * - Handlers
 * - API Helpers
 */


// Imports
import "./styles.css";
import * as billsAPI from "../../utilities/bills-api";
import { useEffect, useMemo, useState } from "react";
import BillsForm from "../../components/Forms/BillsForm";
import BillsCard from "../../components/BillsCard/BillsCard";
import Popup from "../../components/Popup/Popup";
import ImageForm from "../../components/Forms/ImageForm";
import CategoriesRemindersForm from "../../components/Forms/CategoriesRemindersForm";
import { FiPlus, FiFilter, FiX } from "react-icons/fi";

// UI (Component)
export default function Bills() {
    // Hooks (State/Refs/Effects)
    const [allBills, setAllBills] = useState([]);
    const [modal, setModal] = useState({ open: false, type: null, bill: null });

    const [imageModal, setImageModal] = useState({ open: false, type: null, bill: null, image: null });
    const [categoriesRemindersModal, setCategoriesRemindersModal] = useState({ open: false, bill: null });

    const [filtersModal, setFiltersModal] = useState(false);
    const [filters, setFilters] = useState({ categoryIds: new Set(), dateFrom: "", dateTo: "" });

    /* Categories derived from bills */
    const allCategoriesFromBills = useMemo(() => {
        const categoryMap = new Map();
        for (const bill of allBills) {
            (bill.category || []).forEach((category) => {
                if (category && !categoryMap.has(category.id)) categoryMap.set(category.id, category);
            });
        }
        return Array.from(categoryMap.values());
    }, [allBills]);

    const categoryMap = useMemo(() => {
        const map = new Map();
        for (const c of allCategoriesFromBills) map.set(c.id, c);
        return map;
    }, [allCategoriesFromBills]);

    const selectedCategoryNames = useMemo(
        () =>
            Array.from(filters.categoryIds)
                .map((id) => categoryMap.get(id)?.title)
                .filter(Boolean),
        [filters.categoryIds, categoryMap]
    );

    /* Filter helpers */
    const toggleCategoryFilter = (categoryId) => {
        setFilters((prev) => {
            const next = new Set(prev.categoryIds);
            if (next.has(categoryId)) next.delete(categoryId);
            else next.add(categoryId);
            return { ...prev, categoryIds: next };
        });
    };

    const clearFilters = () =>
        setFilters({ categoryIds: new Set(), dateFrom: "", dateTo: "" });

    /* Display list */
    const displayBills = useMemo(() => {
        if (!allBills?.length) return [];
        const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
        const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

        return allBills.filter((bill) => {
            if (filters.categoryIds.size > 0) {
                const billCategoryIds = new Set((bill.category || []).map((c) => c.id));
                let hasAny = false;
                for (const id of filters.categoryIds) {
                    if (billCategoryIds.has(id)) { hasAny = true; break; }
                }
                if (!hasAny) return false;
            }
            const billDate = new Date(bill.created_at ?? bill.date);
            if (fromDate && billDate && billDate < fromDate) return false;
            if (toDate && billDate && billDate > toDate) return false;
            return true;
        });
    }, [allBills, filters]);

    /* API helpers */
    async function fetchCategories() { return billsAPI.getAllCategories(); }

    const openAdd = () => setModal({ open: true, type: "add", bill: null });
    const openEdit = (bill) => setModal({ open: true, type: "edit", bill });
    const openDelete = (bill) => setModal({ open: true, type: "delete", bill });
    const closeModal = () => setModal({ open: false, type: null, bill: null });

    const openAddImage = (bill) => setImageModal({ open: true, type: "add", bill, image: null });
    const openEditImage = (bill, image) => setImageModal({ open: true, type: "edit", bill, image });
    const openDeleteImage = (bill, image) => setImageModal({ open: true, type: "delete", bill, image });
    const closeImageModal = () => setImageModal({ open: false, type: null, bill: null, image: null });
    const openCategoriesReminders = (bill) => setCategoriesRemindersModal({ open: true, bill });

    async function addBill(formData) {
        try { const newBill = await billsAPI.createNewBill(formData); setAllBills((prev) => [...prev, newBill]); closeModal(); }
        catch (error) { console.log(error); }
    }
    async function editBill(id, formData) {
        try { const updatedBill = await billsAPI.updateBill(id, formData); setAllBills((prev) => prev.map((b) => (b.id === id ? updatedBill : b))); closeModal(); }
        catch (error) { console.log(error); }
    }
    async function deleteBill(id) {
        try { const result = await billsAPI.deleteBill(id); if (result?.success !== false) setAllBills((prev) => prev.filter((b) => b.id !== id)); closeModal(); }
        catch (error) { console.log(error); }
    }

    async function addImage(billId, formData) {
        try { const updatedBill = await billsAPI.upsertBillImage(billId, formData); setAllBills((prev) => prev.map((b) => (b.id === billId ? updatedBill : b))); closeImageModal(); }
        catch (error) { console.log(error); }
    }
    async function editImage(billId, _imageId, formData) {
        try { const updatedBill = await billsAPI.upsertBillImage(billId, formData); setAllBills((prev) => prev.map((b) => (b.id === billId ? updatedBill : b))); closeImageModal(); }
        catch (error) { console.log(error); }
    }
    async function deleteImage(billId) {
        try { const updatedBill = await billsAPI.deleteBillImage(billId); setAllBills((prev) => prev.map((b) => (b.id === billId ? updatedBill : b))); closeImageModal(); }
        catch (error) { console.log(error); }
    }

    useEffect(() => {
        (async () => {
            try { const list = await billsAPI.getAllBills(); setAllBills(list); }
            catch (error) { console.log(error); }
        })();
    }, []);

    async function saveBillCategories(billId, categoryIds) {
        const updated = await billsAPI.setBillCategories(billId, categoryIds);
        setAllBills((prev) => prev.map((b) => (b.id === billId ? updated : b)));
    }

    async function createReminder(billId, payload) {
        const updated = await billsAPI.createReminder(billId, payload);
        setAllBills((prev) => prev.map((b) => (b.id === billId ? updated : b)));
    }

    async function deleteReminder(billId, reminderId) {
        try {
            const updated = await billsAPI.deleteReminder(billId, reminderId);
            setAllBills((prev) => prev.map((b) => (b.id === billId ? updated : b)));
        } catch (error) { console.log(error); }
    }

    return (
        <section className="bills">
            {/* Toolbar */}
            <div className="bills__toolbar">
                {/* Filter button – sits left of Add */}
                <button
                    type="button"
                    className="bills__button"
                    onClick={() => setFiltersModal(true)}
                    aria-label="Open filters"
                    title="Open filters"
                >
                    <FiFilter className="bills__button-icon" />
                    <span className="bills__button-label">Filters</span>
                </button>

                {/* Add bill – far right */}
                <button
                    type="button"
                    className="bills__button bills__button--primary"
                    onClick={openAdd}
                    aria-label="Add new bill"
                    title="Add new bill"
                >
                    <FiPlus className="bills__button-icon" />
                    <span className="bills__button-label">Add Bill</span>
                </button>
            </div>

            {/* Active filters line */}
            {(filters.categoryIds.size > 0 || filters.dateFrom || filters.dateTo) && (
                <div className="bills__active-filters">
                    <span className="bills__active-title">Active filters:</span>
                    {selectedCategoryNames.length > 0 && (
                        <span className="bills__active-chip">
                            Categories: {selectedCategoryNames.join(", ")}
                        </span>
                    )}
                    {filters.dateFrom && <span className="bills__active-chip">From {filters.dateFrom}</span>}
                    {filters.dateTo && <span className="bills__active-chip">To {filters.dateTo}</span>}
                    <button
                        type="button"
                        className="bills__chip-clear"
                        onClick={clearFilters}
                        aria-label="Clear filters"
                        title="Clear filters"
                    >
                        <FiX />
                    </button>
                </div>
            )}

            {/* Filters Popup */}
            <Popup modalAction={filtersModal} setModalAction={setFiltersModal}>
                <div className="bills__filters-card">
                    <h3 className="bills__filters-title">Filter Bills</h3>

                    <div className="bills__filters-body">
                        <div className="bills__field">
                            <label className="bills__label">Categories</label>
                            {allCategoriesFromBills.length === 0 ? (
                                <p className="bills__muted">No categories yet.</p>
                            ) : (
                                <ul className="bills__filters-list">
                                    {allCategoriesFromBills.map((category) => {
                                        const checked = filters.categoryIds.has(category.id);
                                        return (
                                            <li key={category.id}>
                                                <label className="bills__filters-row">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleCategoryFilter(category.id)}
                                                    />
                                                    <span
                                                        className="bills__filters-dot"
                                                        style={{ background: category.color }}
                                                    />
                                                    <span>{category.title}</span>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>

                        <div className="bills__field">
                            <label htmlFor="flt_from" className="bills__label">Created From</label>
                            <input
                                id="flt_from"
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))}
                                className="bills__input"
                            />
                        </div>

                        <div className="bills__field">
                            <label htmlFor="flt_to" className="bills__label">Created To</label>
                            <input
                                id="flt_to"
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))}
                                className="bills__input"
                            />
                        </div>

                        <div className="bills__actions">
                            <button
                                type="button"
                                className="bills__button bills__button--primary"
                                onClick={() => setFiltersModal(false)}
                                aria-label="Apply filters"
                                title="Apply filters"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>

            {/* Modals */}
            <Popup modalAction={modal.open} setModalAction={() => setModal({ open: false, type: null, bill: null })}>
                <BillsForm
                    mode={modal.type}
                    bill={modal.bill}
                    onAdd={addBill}
                    onEdit={editBill}
                    onDelete={deleteBill}
                />
            </Popup>

            <Popup modalAction={imageModal.open} setModalAction={() => setImageModal({ open: false, type: null, bill: null, image: null })}>
                <ImageForm
                    mode={imageModal.type}
                    image={imageModal.image}
                    onAdd={(data) => addImage(imageModal.bill.id, data)}
                    onEdit={(imageId, data) => editImage(imageModal.bill.id, imageId, data)}
                    onDelete={() => deleteImage(imageModal.bill.id)}
                />
            </Popup>

            <Popup modalAction={categoriesRemindersModal.open} setModalAction={() => setCategoriesRemindersModal({ open: false, bill: null })}>
                <CategoriesRemindersForm
                    bill={categoriesRemindersModal.bill}
                    fetchCategories={fetchCategories}
                    onSaveCategories={saveBillCategories}
                    onCreateReminder={createReminder}
                />
            </Popup>

            {/* Cards */}
            <div className="bills__cards">
                <BillsCard
                    allBills={displayBills}
                    onEditClick={openEdit}
                    onDeleteClick={openDelete}
                    onAddImage={openAddImage}
                    onEditImage={openEditImage}
                    onDeleteImage={openDeleteImage}
                    onOpenCR={openCategoriesReminders}
                    onDeleteReminder={deleteReminder}
                />
            </div>
        </section>
    );
}
