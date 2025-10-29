import "./styles.css"

export default function BillsCard({ allBills }) {
    return (
        <div className="bills-grid">
            {allBills.map((bill) => (
                <div key={bill.id} className="bill-card">
                    <header className="bill-card-header">
                        <h4 className="bill-title">{bill.title}</h4>
                        <span className="bill-company">{bill.company}</span>
                    </header>

                    <div className="bill-details">
                        <p className="bill-description">{bill.description}</p>
                        <div className="bill-meta">
                            <span><strong>Date:</strong> {bill.created_at}</span>
                            <span><strong>Warranty:</strong> {bill.warranty}</span>
                            <span><strong>Cost:</strong> ${bill.cost}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
