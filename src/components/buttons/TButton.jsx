function TButton({ text, onClick, submit }) {
    return (
      <>
        <button
          onClick={onClick}
          type={submit === true ? "submit" : "button"}
          className="text-iflab_green font-medium hover:text-iflab_green_light underline duration-75"
        >
          {text}
        </button>
      </>
    );
  }
  
  export default TButton;