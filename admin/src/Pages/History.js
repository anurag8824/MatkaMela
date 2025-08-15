import React from 'react'

const History = () => {
  return (
    <div>
      <div class="bg-white p-3 rounded shadow-sm">
  <div class="d-flex justify-content-between flex-wrap gap-3">

    {/* <!-- Pending Bet --> */}
    <div class="flex-fill text-center">
      <a value="1" class="btn btn-primary w-100 active" href="/History">
        Pending Bet
      </a>
      <p class="mt-2 small border border-danger text-danger p-2 rounded">
        जिन गेम का रिजल्ट नही आया वो PENDING BET में दिखेंगी।
      </p>
    </div>

    {/* <!-- Declared Bet --> */}
    <div class="flex-fill text-center">
      <a value="2" class="btn btn-outline-primary w-100" href="/History-declared">
        Declared Bet
      </a>
      <p class="mt-2 small border border-danger text-danger p-2 rounded">
        जिन गेम का रिजल्ट आ गया है वो DECLARED BET में दिखेंगी।
      </p>
    </div>

  </div>

  <div class="table-responsive"><div class="table  table-history"><table class="table table-striped table-bordered table-hover"><thead><tr><th>S.NO</th><th>Date</th><th>Name</th><th>Type</th><th>Number </th><th>Points </th><th>Action</th></tr></thead><tbody class=""><tr><td colspan="8">No data available or something went wrong.</td></tr></tbody></table></div></div>
</div>

    </div>
  )
}

export default History
