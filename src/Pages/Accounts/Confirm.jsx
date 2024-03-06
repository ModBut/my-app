export default function Confirm({handleConfirm, setOpenConfirm, transactionAmount}) {

    return (
        <div className="modal">
            <div className="modalContainer">
                <button>X</button>
                <div className="title"></div>
                    <h1>Confirm</h1>
                <div className="body"></div>
                    <p>Are you sure to add {transactionAmount} ?</p>
                <div className="footer">
                    <button onClick={() => setOpenConfirm(false)}>No</button>
                    <button onClick={handleConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}