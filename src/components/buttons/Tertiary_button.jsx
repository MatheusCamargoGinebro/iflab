function Tertiary_button({ text, onClick }) {
    return (
      <>
        <button
          onClick={onClick}
          className="text-iflab_green font-medium hover:text-iflab_green_light underline duration-75"
        >
          {text}
        </button>
      </>
    );
  }
  
  export default Tertiary_button;