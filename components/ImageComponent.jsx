import React from "react";

const ImageComponent = ({ image }) => {
  return (
    <div>
      {image && image.length > 0 && (
        <img src={image} width={400} height={680} />
      )}
    </div>
  );
};

export default ImageComponent;
