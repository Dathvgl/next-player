export default function DefaultLoading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-var(--height-header-body))]">
      <div className="border-gray-700 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
    </div>
  );
}
