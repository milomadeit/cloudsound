import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./CreateASpot.css";
import { postCommentThunk } from "../../store/comments";
import { useHistory} from 'react-router-dom';


function CreateSongComment() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage,setPreviewImage]=useState("");
  const [image1,setImage1]=useState("");
  const [image2,setImage2]=useState("");
  const [image3,setImage3]=useState("");
  const [image4,setImage4]=useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors]=useState({});
  const user= useSelector((state) => state.session.user);
  if(!user){return history.push(`/`)};
  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
const err = {};
        if (!previewImage.length){
            err.previewImage = "Preview Image is required";

        setValidationErrors(err);
    return}
    /*if(previewImage.slice(-4)!==".png" && previewImage.slice(-4)!==".jpg" && previewImage.slice(-5)!==".jpeg"){
        err.previewImage = "Image URL must end in .png, .jpg, or .jpeg";

        setValidationErrors(err);
    return
    }
    */
    if(image1.length && image1.slice(-4)!==".png" && image1.slice(-4)!==".jpg" && image1.slice(-5)!==".jpeg"){
        err.image1 = "Image URL must end in .png, .jpg, or .jpeg";

        setValidationErrors(err);
    return
    }
    if(image2.length && image2.slice(-4)!==".png" && image2.slice(-4)!==".jpg" && image2.slice(-5)!==".jpeg"){
        err.image2 = "Image URL must end in .png, .jpg, or .jpeg";

        setValidationErrors(err);
    return
    }
    if(image3.length && image3.slice(-4)!==".png" && image3.slice(-4)!==".jpg" && image3.slice(-5)!==".jpeg"){
        err.image3 = "Image URL must end in .png, .jpg, or .jpeg";

        setValidationErrors(err);
    return
    }
    if(image4.length && image4.slice(-4)!==".png" && image4.slice(-4)!==".jpg" && image4.slice(-5)!==".jpeg"){
        err.image4 = "Image URL must end in .png, .jpg, or .jpeg";

        setValidationErrors(err);
    return
    }




    setErrors({});


    const payload={
        country, address, city, state, lat, lng, description, name, price
    }
let images={};
if(image1){images.image1=image1};
if(image2){images.image2=image2};
if(image3){images.image3=image3};
if(image4){images.image4=image4};


   dispatch(createNewSpot({ payload},{previewImage},{images})).then(newSpot=>history.push(`/spots/${newSpot.id}`)).catch(
      async (res) => {

        const myData = await res.json();


        if (myData && myData.errors) {
            setErrors(myData.errors);

         };

});


}



  return (
    <div className="create-a-spot">
    <h1>Create a spot</h1>
    <h2>Where's your place located?</h2>
    <h3>Guests will only get your exact address once they booked a reservation.</h3>
     <form onSubmit={handleSubmit}>

            <div className="errors">{errors.country}</div>
           <div className="input-fields-1">
            <label>
                Country:
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Country"
                />
            </label>
            <div className="errors">{errors.address}</div>
            <label>
                Address:
                <input
                type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                />
            </label>
            <div className="errors">{errors.city}</div>
            <label>
                City:
                <input
                type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                />
            </label>
            <div className="errors">{errors.state}</div>
            <label>
                State:
                <input
                type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="STATE"
                />
            </label>
            <div className="errors">{errors.lat}</div>
            <label>
                Latitude:
                <input
                type="number"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="Latitude"
                />
            </label>
              <div className="errors">{errors.lng}</div>
            <label>
                Longitude:
                <input
                type="number"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="Longitude"
                />
            </label>
            </div>
            <div className="input-fields-2">
            <h2>Describe your place to guests</h2>
            <h3>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</h3>

            <label>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder=" Please write at least 30 characters"
                />
            </label>
            <div className="errors">{errors.description}</div>

            <h2>Create a title for your spot</h2>
            <h3>Catch guests' attention with a spot title that highlights what makes your place special.</h3>

            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name of your spot"
                />
            </label>
            <div className="errors">{errors.name}</div>
            <h2>Set a base price for your spot</h2>
            <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>


            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price per night (USD)"
                />
            </label>
            <div className="errors">{errors.price}</div>
            <h2>Liven up your spot with photos</h2>
            <h3>Submit a link to at least one photo to publish your spot.</h3>
</div>
<div className="input-fields-3">
              <label>
                Preview Image:
            <input
            type="text"
            value={previewImage}

            onChange={(e) => setPreviewImage(e.target.value)}
            placeholder="Preview Image URL"
             />
             <div className="errors">{validationErrors.previewImage}</div>
</label>
<input
            type="text"
            value={image1}

            onChange={(e) => setImage1(e.target.value)}
            placeholder="Image URL"
             />
             <div className="errors">{validationErrors.image1}</div>
             <input
            type="text"
            value={image2}

            onChange={(e) => setImage2(e.target.value)}
            placeholder="Image URL"
             />
             <div className="errors">{validationErrors.image2}</div>
             <input
            type="text"
            value={image3}

            onChange={(e) => setImage3(e.target.value)}
            placeholder="Image URL"
             />
             <div className="errors">{validationErrors.image3}</div>
             <input
            type="text"
            value={image4}

            onChange={(e) => setImage4(e.target.value)}
            placeholder="Image URL"
             />
             <div className="errors">{validationErrors.image4}</div>

            <button id="submit-for-create-spot"type="submit" >Create Spot</button>
</div>
        </form>
        </div>


  );
}

export default CreateASpot;


//if () return (<Redirect to="/" />);


/*
setCountry("");
setAddress("");
setCity("");
setState("");
setLat("");
setLng("");
setDescription("");
setName("");
setPrice("");
setPreviewImage("");
setImage1("");
setImage2("");
setImage3("");
setImage4("");
*/
