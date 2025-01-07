function TButton({ text, onClick, disabled, goodAction = true }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`font-medium duration-75 ${
          disabled
            ? "text-iflab_gray_light hover:text-iflab_gray cursor-not-allowed"
            : goodAction
            ? "text-iflab_green hover:text-iflab_green_light underline cursor-pointer"
            : "text-iflab_red hover:text-iflab_red_dark underline cursor-pointer"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default TButton;
