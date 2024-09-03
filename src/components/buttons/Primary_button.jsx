function Primary_button({ text, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-iflab_green text-iflab_white py-2 px-4 min-w-24 rounded-md hover:bg-iflab_green_light duration-75 "
      >
        {text}
      </button>
    </>
  );
}

export default Primary_button;