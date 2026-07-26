function Header() {
  return (
    <header className="bg-gray-900 text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        🇯🇵 Japan Stock
      </h1>

      <nav>
        <button className="px-4 py-2 rounded bg-blue-600">
          Watchlist
        </button>
      </nav>
    </header>
    
  )
}

export default Header