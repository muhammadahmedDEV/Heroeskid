import React, { useState } from "react";
// import Avatar from "react-avatar-edit";
// import Grid from '@material-ui/core/Grid'
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "antd";
import Compressor from "compressorjs";
import Swal from "sweetalert2";
import ReactCrop from 'react-image-crop';

import Avatar from '@material-ui/core/Avatar';
import AvatarImage from '../../assets/icons/avatar.png';
import { useStyles } from './styles';
import 'react-image-crop/dist/ReactCrop.css'
// STYLES
import "./styles.scss";

interface ComponentProps {
  preview: string;
  setFieldValue: (value: any) => void;
  edit?: boolean;
  label: string;
}
const options = {
  checkOrientation: true,
};
Compressor.setDefaults(options);
const UserAvatar = ({
  preview,
  setFieldValue,
  edit,
  label,
}: ComponentProps) => {
  const imageRecieved = preview;
  const bc = "avatar";
  const [src, setSrc] = useState("");
  const [imageObject, setImageOjbect] = useState();
  const [imgEdit, setImgEdit] = useState(false);
  const [Crop, setCrop] = useState({
    width: 60,
    height: 60,
    x: 55,
    y: 5,
    // aspect: 2/2
    // unit: '%',
  });
  const [editPicture, setEdit] = useState(edit);
  const onClose = () => {
    if (label === 'Organization Logo') { // org logo
      setFieldValue({ avatar: '' })
    }
    if (label === 'Picture') { // org contact person avatar
      setFieldValue({ contact_avatar: '' })
    }
    if (label === 'Profile Photo') { // professional's avatar
      setFieldValue({ avatar: '' })
    }
  };
  const onCrop = (imageBase64: any) => {
    if (imageBase64) {
      if (label === 'Organization Logo') { // org logo
        setFieldValue({ avatar: imageBase64 })
      }
      if (label === 'Picture') { // org contact person avatar
        setFieldValue({ contact_avatar: imageBase64 })
      }
      if (label === 'Profile Photo') { // professional's avatar
        setFieldValue({ avatar: imageBase64 })
      }
    } else {
      if (label === 'Organization Logo') { // org logo
        setFieldValue({ avatar: imageRecieved })
      }
      if (label === 'Picture') { // org contact person avatar
        setFieldValue({ contact_avatar: imageRecieved })
      }
      if (label === 'Profile Photo') { // professional's avatar
        setFieldValue({ avatar: imageRecieved })
      }
    }
  };
  function getCroppedImg(image: any, crop: any, fileName: any) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');
    if (label === 'Organization Logo') { // org logo
      setFieldValue({ avatar: base64Image })
    }
    if (label === 'Picture') { // org contact person avatar
      setFieldValue({ contact_avatar: base64Image })
    }
    if (label === 'Profile Photo') { // professional's avatar
      setFieldValue({ avatar: base64Image })
    }

    // As a blob
    // return new Promise((resolve, reject) => {
    //   canvas.toBlob(blob => {
    //     blob.name = fileName;
    //     resolve(blob);
    //   }, 'image/jpeg', 1);
    // });
  }
  const cropHandler = (elem: any) => {
    setCrop(elem)
  }
  const onImageLoaded = (image: any) => {
    setImageOjbect(image)
  };
  const onCropComplete = async (elem: any) => {
    if (imageObject && imageObject) {
      const croppedImageUrl = await getCroppedImg(
        imageObject,
        Crop,
        "newFile.jpeg"
      );
    }
  };
  const onBeforeFileLoad = (elem: any) => {

    // Check if selected file is a valid image
    if (
      elem && elem.target && elem.target.files[0] && elem.target.files[0].type === "image/jpeg" ||
      elem && elem.target && elem.target.files[0] && elem.target.files[0].type === "image/png"
    ) {
      if (elem.target.files[0].size <= 8000000) {
        const maxDimention = 500;
        let quality = 0.1;
        // tslint:disable-next-line: no-unused-expression
        var file = elem.target.files[0];
        // setImageOjbect(file)
        new Compressor(elem.target.files[0], {
          quality,
          success(result) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const reader = new FileReader();
            reader.onload = (fileLoadedEvent: any) => {
              const img = new Image();
              img.onload = async () => {
                const largerDimention = Math.max(img.width, img.height);
                let factor = 1;
                if (largerDimention > maxDimention) {
                  factor = largerDimention / maxDimention;
                }
                const width = img.width / factor;
                const height = img.height / factor;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                const src = canvas.toDataURL("image/jpeg", 0.7);
                setSrc(src);
                // console.log(src,'srcccccccccccccccccccccccccccccccccccc')
                if (label === 'Organization Logo') { // org logo
                  setFieldValue({ avatar: src })
                }
                if (label === 'Picture') { // org contact person avatar
                  setFieldValue({ contact_avatar: src })
                }
                if (label === 'Profile Photo') { // professional's avatar
                  setFieldValue({ avatar: src })
                }
                // setBannerFileList([{ ...event.file, url: src }, ...bannerFileList.slice(-1)]);
                // setImgUrl(src);
                // setFieldsValue({ banner: src });
              };
              img.src = fileLoadedEvent.target.result;
            };
            reader.readAsDataURL(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      }
      else {
        elem.target.value = "";
        setSrc("");
        Swal.fire({
          title: "Maximum size exceeded",
          text: "Please select image of maximum 7 MB",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    } else {
      elem.target.value = "";
      setSrc("");
      Swal.fire({
        title: "Not an image",
        text: "Select JPG, PNG or JPEG image",
        icon: "info",
        confirmButtonText: "Ok",
      });
    }
  };
  const editHandler = (e:any) =>{
    e.preventDefault();
    setImgEdit(true)
  }
  const setProfile = () => {
    setEdit(false);
    setFieldValue({ avatar: "" });
  };
  const classes = useStyles();

  return (
    <div className={`${bc}`}>
      {/* // <Avatar
        //   // minCropRadius={40}
        //   cropRadius={100}
        //   width={200}
        //   height={200}
        //   onCrop={onCrop}
        //   onClose={onClose}
        //   onBeforeFileLoad={onBeforeFileLoad}
        //   src={src}
        //   imageWidth={260}
        //   label=
        // /> */}

      { imgEdit == true ? 
           src || imageRecieved ?
            <ReactCrop
              onChange={cropHandler}
              src={src ? src : imageRecieved ? imageRecieved : AvatarImage}
              crop={Crop}
              //  keepSelection={true}
              minHeight={50}
              minWidth={50}
              className="large"
              //  locked={true}
              onComplete={onCropComplete}
              onImageLoaded={onImageLoaded}
            />
        :
        <img
          alt="picture"
          id="imageData"
          src={AvatarImage}
          className="large"
        />
        :
        <img
        alt="picture"
        id="imageData"
        src={src ? src : imageRecieved ? imageRecieved : AvatarImage}
        className="large"
      />
      }
      { src || imageRecieved && imageRecieved !== "data:image/png;base64,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" ?  <button className="edit-btn"  onClick={editHandler}>Edit Image</button>:""}

      <input
        accept="image/*"
        className="upload-input"
        id="contained-button-file"
        multiple
        type="file"
        onChange={onBeforeFileLoad}
      />
      <label className="padding-upper" htmlFor="contained-button-file">
        <div className="uploadButton">
          {"Upload " + label}
        </div>
      </label>

    </div>
  );
};

export default UserAvatar;
