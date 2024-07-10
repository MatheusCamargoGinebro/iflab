function Text_Input({placeholder, icon, alt}){
    return (
        <>
          <div className="w-full flex border-b-2 border-b-iflab_gray_light hover:border-b-iflab_green_light duration-75">
            <input
              type="text"
              className="w-full bg-gray-200 p-2 outline-none"
              placeholder={placeholder ? placeholder : "..."}
            />
            <img src={icon} alt={alt ? alt : "icon"} className="h-5 w-5 m-2 select-none" />
          </div>
        </>
      );
}

export default Text_Input;