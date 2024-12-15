import React, { useState } from "react";
import { Image } from "react-native";
import { Assets } from "../../../lib/assets";

const ProfileImage = ({ url, style, className = "", resizeMode = "cover" }) => {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Image
      source={
        imageFailed || !url ? Assets.Images.imagePlaceHolder : { uri: url }
      }
      onError={() => setImageFailed(true)}
      style={style}
      className={className}
      resizeMode={resizeMode}
    />
  );
};

export default ProfileImage;
