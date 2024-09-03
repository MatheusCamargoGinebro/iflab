function Secundary_button({ text, onClick }) {
    return (
      <>
        <button
          onClick={onClick}
          className="min-w-24 text-iflab_green border-2 border-iflab_green p-2 rounded-md hover:border-iflab_green_light hover:text-iflab_green_light duration-75"
        >
          {text}
        </button>
      </>
    );
  }
  
  export default Secundary_button;