function StockCard({ code, name, price, change }) {
  return (
    <div className="m-6 p-6 bg-white rounded-xl shadow-md">

      <h3 className="text-xl font-bold">
        {code} - {name}
      </h3>

      <p className="text-3xl font-bold mt-3">
        ¥{price}
      </p>

      <p className="text-green-600 mt-2">
        ▲ {change}
      </p>

      <div className="mt-4 text-gray-600">
        <p>Volume: 120,500</p>
        <p>Market Cap: ¥15.2B</p>
      </div>

    </div>
  )
}

export default StockCard