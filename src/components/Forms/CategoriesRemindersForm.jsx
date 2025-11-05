/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 * - Hooks (State/Effects/Memo)
 * - Handlers
 */


// Imports
import { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { FiSave, FiPlus } from "react-icons/fi";

// UI (Component)
export default function CategoriesRemindersForm({
    bill,
    fetchCategories,
    onSaveCategories,
    onCreateReminder
}) {
    /* Hooks (State/Effects/Memo) */
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [isSavingCategories, setIsSavingCategories] = useState(false);

    const [reminderTitle, setReminderTitle] = useState("");
    const [reminderDate, setReminderDate] = useState("");
    const [isSavingReminder, setIsSavingReminder] = useState(false);

    const billCategoryIds = useMemo(() => {
        const categories = bill?.category || [];
        return new Set(categories.map((category) => category.id));
    }, [bill]);

    useEffect(() => setSelectedCategoryIds(new Set(billCategoryIds)), [billCategoryIds]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setIsLoading(true);
                const list = await fetchCategories?.();
                if (mounted && Array.isArray(list)) setAllCategories(list);
            } catch (error) {
                console.error(error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [fetchCategories]);

    /* Handlers */
    function toggleCategory(categoryId) {
        setSelectedCategoryIds((previous) => {
            const next = new Set(previous);
            next.has(categoryId) ? next.delete(categoryId) : next.add(categoryId);
            return next;
        });
    }

    async function handleSaveCategories(event) {
        event?.preventDefault?.();
        if (!bill?.id) return;
        try {
            setIsSavingCategories(true);
            await onSaveCategories?.(bill.id, Array.from(selectedCategoryIds));
        } catch (error) {
            console.error(error);
        } finally {
            setIsSavingCategories(false);
        }
    }

    async function handleCreateReminder(event) {
        event?.preventDefault?.();
        if (!bill?.id || !reminderTitle.trim() || !reminderDate) return;
        try {
            setIsSavingReminder(true);
            await onCreateReminder?.(bill.id, { title: reminderTitle.trim(), reminder_at: reminderDate });
            setReminderTitle("");
            setReminderDate("");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSavingReminder(false);
        }
    }

    return (
        <div className="categoriesRemindersForm">
            <div className="categoriesRemindersForm__header">
                <h3 className="categoriesRemindersForm__title">Categories & Reminders</h3>
            </div>

            <div className="categoriesRemindersForm__grid">
                {/* Categories */}
                <section className="categoriesRemindersForm__panel">
                    <h4 className="categoriesRemindersForm__title">Categories</h4>
                    <p className="categoriesRemindersForm__subtitle">
                        Pick categories for: <strong>{bill?.title}</strong>
                    </p>

                    {isLoading ? (
                        <p>Loading categories...</p>
                    ) : (
                        <>
                            {allCategories.length === 0 ? (
                                <p>No categories available.</p>
                            ) : (
                                <ul className="categoriesRemindersForm__categoryList">
                                    {allCategories.map((category) => {
                                        const checked = selectedCategoryIds.has(category.id);
                                        return (
                                            <li
                                                key={category.id}
                                                className={`categoriesRemindersForm__categoryItem ${checked ? "categoriesRemindersForm__categoryItem--checked" : ""
                                                    }`}
                                            >
                                                <label className="categoriesRemindersForm__categoryRow">
                                                    <input
                                                        type="checkbox"
                                                        checked={checked}
                                                        onChange={() => toggleCategory(category.id)}
                                                    />
                                                    <span>
                                                        <span
                                                            className="categoriesRemindersForm__categoryDot"
                                                            style={{ background: category.color }}
                                                        />
                                                        {category.title}
                                                    </span>
                                                </label>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            <div className="categoriesRemindersForm__actions">
                                <button
                                    className="formCard__button formCard__button--primary"
                                    disabled={isSavingCategories || isLoading}
                                    onClick={handleSaveCategories}
                                    aria-label="Save categories"
                                >
                                    <FiSave /> Save
                                </button>
                            </div>
                        </>
                    )}
                </section>

                {/* Reminder */}
                <section className="categoriesRemindersForm__panel">
                    <h4 className="categoriesRemindersForm__title">Add Reminder</h4>
                    <form className="formCard__body" onSubmit={handleCreateReminder}>
                        <div className="formCard__field">
                            <label htmlFor="reminder_title" className="formCard__label">Title</label>
                            <input
                                id="reminder_title"
                                type="text"
                                className="formCard__input"
                                value={reminderTitle}
                                onChange={(event) => setReminderTitle(event.target.value)}
                                required
                            />
                        </div>
                        <div className="formCard__field">
                            <label htmlFor="reminder_date" className="formCard__label">Date</label>
                            <input
                                id="reminder_date"
                                type="date"
                                className="formCard__input"
                                value={reminderDate}
                                onChange={(event) => setReminderDate(event.target.value)}
                                required
                            />
                        </div>
                        <div className="categoriesRemindersForm__actions">
                            <button className="formCard__button formCard__button--primary" type="submit" disabled={isSavingReminder}>
                                <FiPlus /> Add
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}
