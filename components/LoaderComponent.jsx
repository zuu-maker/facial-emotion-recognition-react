import React from "react";
import { SyncLoader } from "react-spinners";

const LoaderComponent = ({ show, uploading, progress }) => {
  return (
    <div>
      {show ? (
        <div className="p-2">
          <SyncLoader color="#36d7b7" />
          <p className="text-sm text-gray-500">
            {uploading ? (
              <span>{Math.round(progress) + "% "} Uploading...</span>
            ) : (
              <span>Predicting...</span>
            )}
          </p>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default LoaderComponent;
