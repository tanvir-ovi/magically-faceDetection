import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
  return (
    <div>
      <p className="f3 tc">this magic brain will detect your face. Give it a try!</p>
      <div className="tc center">
        <div className="form pa4 br3 shadow-5">
          <input onChange={onInputChange} className="br2 border-none f4 pa2 w-70" type="text" placeholder="Input Your Image Link..." />
          <button
            onClick={onButtonSubmit}
            className="br2 pointer border-none w-30 grow f4 link dib wihite ph3 pv2 bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;