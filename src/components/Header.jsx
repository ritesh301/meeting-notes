export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8 p-4 border-b dark:border-gray-700">
      <h1 className="text-2xl font-bold">PASTE-A</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          🌙
        </button>
      </div>
    </header>
  );
}
