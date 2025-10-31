import "./styles.css";

export default function BillsCard({
    allBills,
    onEditClick,
    onDeleteClick,
    onAddImage,
    onEditImage,
    onDeleteImage,
}) {
    return (
        <div className="bills-grid">
            {allBills.map((bill) => {
                const img = bill?.image && bill.image.url ? bill.image : null;

                return (
                    <div key={bill.id} className="bill-card">
                        <div className="card-media">
                            <div className="image-slot">
                                {img ? (
                                    <img
                                        src={img.url}
                                        alt={img.title || bill.title}
                                        className="image-thumb"
                                    />
                                ) : (
                                    <button
                                        className="image-placeholder"
                                        onClick={() => onAddImage?.(bill)}
                                        aria-label="Add image"
                                    >
                                        <span className="plus">+</span>
                                    </button>
                                )}
                            </div>

                            {img ? (
                                <div className="image-actions under-media">
                                    <button className="btn small" onClick={() => onEditImage?.(bill, img)}>
                                        Edit Image
                                    </button>
                                    <button className="btn small danger" onClick={() => onDeleteImage?.(bill, img)}>
                                        Delete Image
                                    </button>
                                </div>
                            ) : null}
                        </div>

                        <div className="card-content">
                            <div className="bill-actions-row">
                                <button className="btn xsmall" onClick={() => onEditClick(bill)}>Edit</button>
                                <button className="btn xsmall danger" onClick={() => onDeleteClick(bill)}>Delete</button>
                            </div>

                            <header className="bill-header-row">
                                <h4 className="bill-title">{bill.title}</h4>
                                <span className="bill-company">{bill.company}</span>
                            </header>

                            <div className="bill-details">
                                <p className="bill-description">{bill.description}</p>
                                <div className="bill-meta">
                                    <span><strong>Date:</strong> {bill.created_at ?? bill.date}</span>
                                    <span><strong>Warranty:</strong> {bill.warranty}</span>
                                    <span><strong>Cost:</strong> ${bill.cost}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
