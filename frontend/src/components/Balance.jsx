export default function Balance({balance}) {

    return (
        <div className="flex ">
            <div className="text-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold text-lg ml-4">
                Rs {balance}
            </div>
        </div>
    )
}