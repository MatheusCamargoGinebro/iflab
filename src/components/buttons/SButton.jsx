function SButton({ text, onClick, disabled, goodAction = true, icon = null }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`min-w-32 font-semibold border-2 px-6 py-2 rounded-md duration-75 ${
          disabled
            ? "text-iflab_gray_light border-iflab_gray_light hover:border-iflab_gray hover:text-iflab_gray cursor-not-allowed"
            : goodAction
            ? "text-iflab_green border-iflab_green hover:border-iflab_green_light hover:text-iflab_green_light cursor-pointer"
            : "text-iflab_red border-iflab_red hover:border-iflab_red_dark hover:text-iflab_red_dark cursor-pointer"
        }`}
        disabled={disabled}
      >
        <h1 className="flex items-center justify-center">
          {!!icon && (
            <img
              src={icon}
              alt="text"
              className={`w-5 h-5 filter brightness-[0%] ${
                text ? "mr-2" : ""
              }`}
            />
          )}
          {text}
        </h1>
      </button>
    </>
  );
}

export default SButton;
