import {
    FormControl,
    Input,
    FormHelperText,
    FormLabel,
    Box,
    Select,
    Heading,
    Button
} from '@chakra-ui/react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addProduct } from '../../actions/product'
import axios from '../../axiosInstance';
import ImageUpload from '../utility/ImageUpload';


const AddProduct = () => {

    const [name, setname] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')
    const [color, setcolor] = useState('')
    const [listPrice, setlistPrice] = useState('')
    const [price, setprice] = useState('')
    const [stock, setstock] = useState(0)
    const [categories, setCategories] = useState([])

    const dispatch = useDispatch()

    const getCategories = async () => {
        const res = await axios.get('/category/all')
        const { categories, message } = res.data
        console.log(categories)
        setCategories(categories)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleAddProduct = () => {
        dispatch(addProduct({
            name, imageUrl, description, category, color, listPrice, price, stock
        }))
        console.log({
            name, imageUrl, description, category, color, listPrice, price, stock
        })
    }

    return (
        <Box m={4}>
            <Heading>Add Product</Heading>
            <FormControl>
                <FormLabel>Product name</FormLabel>
                <Input onChange={(e) => { setname(e.target.value) }} type="text" />
                <FormLabel>Image URL </FormLabel>
               <ImageUpload setImage={setimageUrl} />
                <FormLabel>Product description</FormLabel>
                <Input onChange={(e) => { setdescription(e.target.value) }} type="text" />
                <FormLabel>Category</FormLabel>
                <Select onChange={(e) => {
                    const { _id } = categories.find(category => category.name == e.target.value)
                    setcategory(_id)
                }} placeholder="Select product's category">
                    {
                        categories && categories.map(category => {
                            return <option id={category._id} >{category.name}</option>
                        })
                    }
                </Select>
                <FormLabel>Product color</FormLabel>
                <Input onChange={(e) => { setcolor(e.target.value) }} type="text" />
                <FormLabel> Actual Price</FormLabel>
                <Input onChange={(e) => { setprice(e.target.value) }} type="number" />
                <FormLabel> Listing Price</FormLabel>
                <Input onChange={(e) => { setlistPrice(e.target.value) }} type="number" />
                <FormLabel> Stock</FormLabel>
                <Input onChange={(e) => { setstock(e.target.value) }} type="number" />
                <Button onClick={handleAddProduct} marginTop={4} color={'white'} bg={'blue.400'}>Submit</Button>
            </FormControl>
        </Box >
    );
}

export default AddProduct;