import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../App";

const EditPage = ()=>{
    let { id } = useParams();
    const navigate = useNavigate();
    const[isLoading,setIsLoading] = useState(false);
    const[product, setProduct] = useState({
        name:"",
        quantity:"",
        price:"",
        image:""
    })
    const [imagePreview, setImagePreview] = useState(null);

    const getProduct = async()=>{
        setIsLoading(true);
        try {
            const resp = await axios.get(`${BACKEND_URL}/api/products/${id}`);
            setProduct({
                quantity: resp.data.quantity,
                name: resp.data.name,
                price: resp.data.price,
                image: resp.data.image
             })
             setImagePreview(resp.data.image);
             setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }
    const updateProduct = async (e)=>{
        e.preventDefault();
        setIsLoading(true);

        try {
            const resp = await axios.put(`${BACKEND_URL}/api/products/${id}`, product);
            //console.log(resp)
            alert("Updating Completed");
            //setIsLoading(false);
            navigate('/');
        } catch (error) {
            setIsLoading(false);
            console.log(error)
        }

    }

    useEffect(()=>{
            getProduct();
            
    },[id]);//load intial screen

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {          
            setProduct({ ...product, image: URL.createObjectURL(file)}); // Store file object
            setImagePreview(URL.createObjectURL(file)); // Set preview for the image
        }
    };

    return(
        <div className="product-form-container">
        <h2 className="form-title">
        Edit Product
        </h2>
        <form onSubmit={updateProduct}>
            <div>
                <label>Name</label>
                <input type="text" value={product.name} onChange={(e) => setProduct({...product,name:e.target.value})} placeholder="Enter name"/>
            </div>
            <div>
                <label>Quantity</label>
                <input type="number" value={product.quantity} onChange={(e)=>setProduct({...product,quantity:e.target.value})} placeholder="Enter quantity"/>
            </div>
            <div>
                <label>Price</label>
                <input type="number" value={product.price} onChange={(e)=>setProduct({...product,price:e.target.value})} placeholder="Enter Price"/>
            </div>
            <div>
                <label>Image URL</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}  // Handle file selection
                />
                {imagePreview && (
                    <div>
                        <p>Preview:</p>
                        <img
                            src={imagePreview}
                            alt="Image Preview"
                            style={{ width: "200px", marginTop: "10px" }}
                        />
                    </div>
                )}
            </div>
            <div>
                { !isLoading && (<button className="save-button">Update</button>)}
            </div>
        </form>

</div>
    )
}

export default EditPage;