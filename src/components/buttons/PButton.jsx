function PButton({ text, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-iflab_green text-iflab_white py-2 px-6 min-w-32 rounded-md hover:bg-iflab_green_light duration-75 "
      >
        {text}
      </button>
    </>
  );
}

export default PButton;