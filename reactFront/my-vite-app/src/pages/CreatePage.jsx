import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../App";
const CreatePage = ()=>{
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const prod = {
        name :name,
        quantity : quantity,
        price: price,
        image: image
    }

    const saveProduct = async(e)=>{
        e.preventDefault();
        if(name === "" || quantity === "" || price === "" || image === ""){
            alert('Please fill out all input completely');
            return;
        }
        try {
            setIsLoading(true);
            const res = await axios.post(`${BACKEND_URL}/api/products/`,prod);
            alert(`Saved ${res.data.name} succesfully`);
            setIsLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    
    return(
        <div className="product-form-container">
            <h2 className="form-title">
            Create a Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text"    
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Enter name"/>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e)=>setQuantity(e.target.value)} 
                    placeholder="Enter quantity"/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input 
                    type="number" 
                    value={price} 
                    onChange={(e)=>setPrice(e.target.value)}
                    placeholder="Enter Price"/>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} placeholder="URL"/>
                </div>
                {image && (
                <div>
                    <p>Preview:</p>
                    <img src={image} alt="Uploaded" style={{ width: "200px", marginTop: "10px" }} />
                </div>
                )}
                <div>
                    { !isLoading && (<button className="save-button">Save</button>)}
                </div>
            </form>

    </div>
    )
}

export default CreatePage;