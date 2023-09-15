import axios from 'axios'
import React, { useState } from 'react'

const AddProduct = () => {

    const [product, setProductData] = useState({ name: "", price: "", description: "", image: null })

    const handleTextField = (e) => {
        setProductData({ ...product, [e.target.name]: e.target.value })
    }

    const handleImageField = (e) => {
        setProductData({ ...product, ["image"]: e.target.files[0] })
    }

    console.log(product, "07");


    const formSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('image', product.image);
        try{
            const response = await axios.post("http://localhost:8000/add-product",formData)
            if(response.data.success){
                alert(response.data.message)
            }
        }catch(err){
            alert(err)
        }
    }


    return (
        <div className='App' style={{ marginTop: "3%" }}>
            <form onSubmit={formSubmit}>
                <input type="text" name='name' placeholder='Product Name' onChange={handleTextField} /><br />
                <input type="number" name='price' placeholder='Product Price' onChange={handleTextField} /><br />
                <input type="text" name='description' placeholder='Product Description' onChange={handleTextField} /><br />
                <input type='file' name='image' placeholder='Product Image' onChange={handleImageField} /><br />
                <input type="submit" value="Add Product" />
            </form>
        </div>
    )
}

export default AddProduct