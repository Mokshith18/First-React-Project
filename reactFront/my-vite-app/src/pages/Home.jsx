import axios from "axios";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Product from "../components/Product";
import { BACKEND_URL } from "../App";

const Home = ()=>{
    const[products, setProduct] = useState([]);
    const[isLoading, setIsLoading] = useState(false);

    const getProduct = async ()=>{
        try {
            setIsLoading(true);
            const resp = await axios.get(`${BACKEND_URL}/api/products/`);
            //console.log(resp.data);
            setProduct(resp.data)
            setIsLoading(false);
        } catch (error) {
         console.log(error)   
        }
    }

    useEffect(()=>{
        getProduct();
    },[]);//load intial screen

    return(
        <div>
            <div >
                <Link to="/create" className='button'>Create</Link>
            </div>
            <div>
                {isLoading ?(
                        "Loading"
                ):(
                    <>
                        {products.length > 0 ? (
                            <>
                            {
                                products.map((product,index) => {
                                 return(
                                        <Product key={index} product={product} getProduct={getProduct}/>
                                    )
                            })
                        }
                            </>
                        ) : (
                            <div>
                                There is no product
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Home;