function PButton({ text, onClick, disabled }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`py-2 px-6 min-w-32 rounded-md duration-75 ${
          disabled
            ? "bg-iflab_white_dark text-iflab_gray_light hover:bg-iflab_white_light cursor-not-allowed"
            : "bg-iflab_green text-iflab_white hover:bg-iflab_green_light cursor-pointer"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default PButton;
