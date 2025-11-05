/**
 * Table of Contents
 * - Imports
 * - UI (Component)
 */

// Imports
import "./styles.css";
import {
    FiEdit2,
    FiTrash2,
    FiEdit,
    FiX,
    FiBell,
    FiCalendar,
} from "react-icons/fi";

// UI (Component)
export default function BillsCard({
    allBills,
    onEditClick,
    onDeleteClick,
    onAddImage,
    onEditImage,
    onDeleteImage,
    onOpenCR,
    onDeleteReminder,
}) {
    return (
        <div className="bills-card__list">
            {allBills.map((bill) => {
                const image = bill?.image && bill.image.url ? bill.image : null;

                return (
                    <article key={bill.id} className="bills-card__item">
                        {/* Media */}
                        <div className="bills-card__media">
                            <div className="bills-card__image-box">
                                {image ? (
                                    <>
                                        <img
                                            src={image.url}
                                            alt={image.title || bill.title}
                                            className="bills-card__image"
                                        />

                                        <div className="bills-card__image-actions">
                                            <button
                                                type="button"
                                                className="bills-card__image-button"
                                                onClick={() => onEditImage?.(bill, image)}
                                                aria-label="Edit image"
                                                title="Edit image"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                type="button"
                                                className="bills-card__image-button bills-card__danger"
                                                onClick={() => onDeleteImage?.(bill, image)}
                                                aria-label="Delete image"
                                                title="Delete image"
                                            >
                                                <FiX />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        className="bills-card__placeholder"
                                        onClick={() => onAddImage?.(bill)}
                                        aria-label="Add image"
                                        title="Add image"
                                    >
                                        <span className="bills-card__placeholder-icon">+</span>
                                        <span className="bills-card__placeholder-text">
                                            Add Image
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bills-card__content">
                            <div className="bills-card__top">
                                <div className="bills-card__categories">
                                    {Array.isArray(bill.category) &&
                                        bill.category.map((cat) => (
                                            <span
                                                key={cat.id}
                                                className="bills-card__category"
                                                style={{
                                                    background: cat.color ? `${cat.color}15` : "#f7f9ff",
                                                    borderColor: cat.color || "#e6e6e6",
                                                }}
                                            >
                                                <span
                                                    className="bills-card__category-dot"
                                                    style={{ background: cat.color || "#999" }}
                                                />
                                                {cat.title}
                                            </span>
                                        ))}
                                </div>

                                <div className="bills-card__actions">
                                    <button
                                        type="button"
                                        className="bills-card__image-button"
                                        onClick={() => onEditClick?.(bill)}
                                        aria-label="Edit bill"
                                        title="Edit bill"
                                    >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        type="button"
                                        className="bills-card__image-button bills-card__danger"
                                        onClick={() => onDeleteClick?.(bill)}
                                        aria-label="Delete bill"
                                        title="Delete bill"
                                    >
                                        <FiTrash2 />
                                    </button>
                                    <button
                                        type="button"
                                        className="bills-card__image-button"
                                        onClick={() => onOpenCR?.(bill)}
                                        aria-label="Categories & Reminders"
                                        title="Categories & Reminders"
                                    >
                                        <FiBell />
                                    </button>
                                </div>
                            </div>

                            {/* Header */}
                            <header className="bills-card__header">
                                <h4 className="bills-card__title">{bill.title}</h4>
                                <span className="bills-card__company">{bill.company}</span>
                            </header>

                            {/* Details */}
                            <div className="bills-card__details">
                                {bill.description && (
                                    <p className="bills-card__description">{bill.description}</p>
                                )}

                                <div className="bills-card__meta">
                                    <div className="bills-card__meta-item">
                                        <FiCalendar className="bills-card__meta-icon" />
                                        {new Date(bill.created_at ?? bill.date).toLocaleDateString()}
                                    </div>
                                    {bill.warranty && (
                                        <div className="bills-card__meta-item">
                                            <strong>Warranty:</strong> {bill.warranty}
                                        </div>
                                    )}
                                    {bill.cost != null && (
                                        <div className="bills-card__meta-item">
                                            <strong>Cost:</strong> ${bill.cost}
                                        </div>
                                    )}
                                </div>

                                {/* Reminders */}
                                {Array.isArray(bill.reminders) &&
                                    bill.reminders.map((rem) => (
                                        <div key={rem.id} className="bills-card__reminder">
                                            <div className="bills-card__reminder-main">
                                                <span className="bills-card__reminder-title">
                                                    {rem.title}
                                                </span>
                                                <span className="bills-card__reminder-date">
                                                    {rem.reminder_at}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                className="bills-card__image-button bills-card__danger"
                                                onClick={() => onDeleteReminder?.(bill.id, rem.id)}
                                                aria-label="Delete reminder"
                                                title="Delete reminder"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
