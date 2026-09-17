import axios from "axios"
import "../App.css"
import { Link } from 'react-router-dom'
import { BACKEND_URL } from "../App"

const Product = ( {product, getProduct} )=>{
    const deleteProduct = async (id)=>{
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return; // Stop execution if user cancels

        try {
            const resp = await axios.delete(`${BACKEND_URL}/api/products/${id}`);
            alert("Product is deleted");
            getProduct();
        } catch (error) {
            console.log(error)
        }
    }
    return(
<>
    
    <div className="product-container">
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image"/>
            <div className="product-details">
                <h2>{product.name}</h2>
                <div>Quantity: {product.quantity}</div>
                <div className="price">₹ {product.price}</div>
            </div>
            <div>
                <Link to={`/edit/${product._id}`} className="button">Edit</Link> 
                <button onClick={()=>{deleteProduct(product._id)}} className="button">Delete</button>
            </div>
        </div>
        
    </div>
</>
        
    )
}

export default Product;