function SButton({ text, onClick, submit }) {
  return (
    <>
      <button
        onClick={onClick}
        type={submit === true ? "submit" : "button"}
        className="min-w-32 text-iflab_green font-semibold border-2 border-iflab_green px-6 py-2 rounded-md hover:border-iflab_green_light hover:text-iflab_green_light hover:bg-iflab_white_light duration-75"
      >
        {text}
      </button>
    </>
  );
}

export default SButton;
