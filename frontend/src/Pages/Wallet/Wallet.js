import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import AddPoint from "./AddPoint";
import Withdraw from "./Withdraw";
import DepositHistory from "./DepositHistory";
import WithdrawHistory from "./WithdrawHistory";
import WalletHistory from "./WalletHistory";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="w-full max-w-mdd mx-auto">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`flex-1 py-2 text-center font-semibold ${activeTab === "add"
              ? "border-b-2 border-white bg-[#094c73] text-white"
              : "bg-gray-100 text-gray-700"
            }`}
          onClick={() => setActiveTab("add")}
        >
          Add Points
        </button>
        <button
          className={`flex-1 py-2 text-center font-semibold ${activeTab === "withdraw"
              ? "border-b-2 border-white bg-[#094c73] text-white"
              : "bg-gray-100 text-gray-700"
            }`}
          onClick={() => setActiveTab("withdraw")}
        >
          Withdraw Points
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-4 shadow-md">
        {activeTab === "add" ? (
          <>
            <AddPoint />
            {/* <DepositHistory /> */}
            <WalletHistory />
          </>
        ) : (
          <>
            <Withdraw />
            <WithdrawHistory/>

          </>
        )}
      </div>


     
    </div>
  );
}
