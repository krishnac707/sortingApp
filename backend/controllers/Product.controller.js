import ProductModal from "../modal/Product.mdal.js";


export const AddProduct = async (req, res) => {
    try {
        console.log(req.body,req.file,"05");
        const { name, price, description } = req.body;
        const imageUrl = req.file.path
        // console.log();
        if (!name || !description || !price || !imageUrl) return res.status(400).json({ success: false, message: "Bad request" })
        const product = new ProductModal({
            name, price, description, image:imageUrl
        })
        await product.save();
        return res.status(201).json({ success: true, message: "Product added successfully" })
    } catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}

export const AllProduct = async (req, res) => {
    try {
        const allProduct = await ProductModal.find({})
        if (allProduct.length) {
            return res.status(200).json({ success: true, product: allProduct, noOfProduct: allProduct.length })
        }
        return res.status(404).json({ success: false, message: "No products found" })
    } catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}

export const FilterProduct = async (req, res) => {
    try {
        // console.log(req.query);
        const search = req.query.search || "";
        const sort = 'date';
        const page = req.query.page || 1;
        const item_per_page = 4;
        const order = req.query.order || "";

        // console.log(sort,"37");

        const query = {
            name: { $regex: search, $options: "i" }
        }

        // const sortPrefix = sort[0] == '-' ? "-" : "";
        const sortField = sort.replace(/^-/, "");
        const sortOption = { [sortField]: `${order}` }
        console.log(sortOption, "46");

        const skip = (page - 1) * item_per_page;
        const count = await ProductModal.countDocuments(query)
        const productData = await ProductModal.find(query).sort(sortOption).limit(item_per_page).skip(skip);
        const pageCount = Math.ceil(count / item_per_page)
        return res.status(200).json({ success: true, products: productData, pagination: { count, pageCount } })
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err })
    }
}