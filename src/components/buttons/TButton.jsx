function TButton({ text, onClick, disabled }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`font-medium duration-75 ${
          disabled
            ? "text-iflab_gray_light hover:text-iflab_gray cursor-not-allowed"
            : " text-iflab_green hover:text-iflab_green_light underline cursor-pointer"
        }`}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
}

export default TButton;
