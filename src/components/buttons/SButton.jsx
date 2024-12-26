function SButton({ text, onClick, disabled }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`min-w-32 font-semibold border-2 px-6 py-2 rounded-md duration-75 ${
          disabled
            ? "text-iflab_gray_light border-iflab_gray_light hover:border-iflab_gray hover:text-iflab_gray cursor-not-allowed"
            : "text-iflab_green  border-iflab_green hover:border-iflab_green_light hover:text-iflab_green_light cursor-pointer"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default SButton;
