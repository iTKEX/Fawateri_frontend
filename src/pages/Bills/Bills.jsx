/*
TABLE OF CONTENT
- IMPORTS
- CONSTANTS
- FUNCTIONS
*/

// IMPORTS
import "./styles.css"
import * as billsAPI from "../../utilities/bills-api"
import { useEffect, useState } from "react"
import BillsForm from "../../components/Forms/BillsForm"
import BillsCard from "../../components/BillsCard/BillsCard"
import Popup from "../../components/Popup/Popup"

export default function Bills() {

    // CONSTANTS
    const [allBills, setAllBills] = useState([])
    const [newBillAction, setNewBillAction] = useState(false);

    // FUNCTIONS
    async function addBill(formData) {
        try {
            const newBill = await billsAPI.createNewBill(formData);
            setAllBills([...allBills, newBill])
            setNewBillAction(!newBillAction)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        async function getAllBills() {
            try {
                const allBillsData = await billsAPI.getAllBills();
                setAllBills(allBillsData);

            } catch (error) {
                console.log(error)
            }
        }
        getAllBills()
    }, [])

    if (!allBills) return (<p>Loading Bills...</p>)

    return (<>
        <button onClick={() => setNewBillAction(!newBillAction)}>
            Add new Bill
        </button>
        {newBillAction &&
            <Popup newBillAction={newBillAction} setNewBillAction={setNewBillAction}>
                <BillsForm addBill={addBill} />
            </Popup>}
        <BillsCard allBills={allBills} />
    </>)
}
