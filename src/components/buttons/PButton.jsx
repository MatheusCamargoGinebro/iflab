function PButton({ text, onClick, disabled, goodAction = true, icon = null }) {
  return (
    <>
      <button
        onClick={onClick}
        type="button"
        className={`py-2 ${
          !!icon ? " px-2 " : " px-6 "
        } min-w-32 rounded-md duration-75 ${
          disabled
            ? "bg-iflab_white_dark text-iflab_gray_light hover:bg-iflab_white_light cursor-not-allowed"
            : goodAction
            ? "text-iflab_white bg-iflab_green hover:bg-iflab_green_light cursor-pointer"
            : "text-iflab_white bg-iflab_red hover:bg-iflab_red_dark cursor-pointer"
        }`}
        disabled={disabled}
      >
        <h1 className="flex items-center justify-center">
          {!!icon && (
            <img
              src={icon}
              alt="text"
              className="w-5 h-5 mr-2 filter brightness-[1000%]"
            />
          )}
          {text}
        </h1>
      </button>
    </>
  );
}

export default PButton;
