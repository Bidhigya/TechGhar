<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\OtherSpec;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSpec;
use App\Models\TempImage;
use Illuminate\Support\Facades\File;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    //
    //This method will return all the products
    public function index()
    {
        $products = Product::orderBy("created_at", "asc")->with(['product_images', 'product_ports'])->get();
        return response()->json([
            'status' => 200,
            "data" => $products,

        ], 200);
    }
    //This method will store a new product
    public function store(Request $request)
    {
        //validate the request

        $validator = Validator::make($request->all(), [
            "title" => "required",
            "price" => "required|numeric",
            "category" => "required|integer",
            // "sku"=> "required|unique:products,sku",
            "is_featured" => "required",
            "status" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ], 400);
        }

        //Store the product in db
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        // $product->sku=$request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->image = $request->image;
        // $product->barcode=$request->barcode;
        $product->is_featured = $request->is_featured;
        $product->save();

        if (!empty($request->ports)) {

            foreach ($request->ports as $portId) {
                $productPort = new ProductSpec();
                $productPort->port_id = $portId;
                $productPort->product_id = $product->id;
                $productPort->save();
            }
        }

        //save the product images
        if (!empty($request->gallery)) {
            foreach ($request->gallery as $key => $tempImageId) {
                $tempImage = TempImage::find($tempImageId);

                // Large Thumbnail
                $extArray = explode('.', $tempImage->name);
                $ext = end($extArray);
                $rand = rand(1000, 10000);

                $imageName = $product->id . '-' . $rand . time() . '.' . $ext;  //2-123445.jpg
                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/largeThumb/' . $imageName));

                //Small Thumbnail

                $manager = new ImageManager(Driver::class);
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400, 460);
                $img->save(public_path('uploads/products/smallThumb/' . $imageName));

                $productImage = new ProductImage();
                $productImage->image = $imageName;
                $productImage->product_id = $product->id;
                $productImage->save();

                if ($key == 0) {
                    $product->image = $imageName;
                    $product->save();                //product image update
                }
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product added successfully',
            'data' => $product
        ], 200);
    }
    //This method will return a single product
    public function show($id, Request $request)
    {
        $product = Product::with(['product_images', 'product_ports'])->find($id);
        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
            ]);
        }
        $productPortsId = $product->product_ports()->pluck('port_id');
        return response()->json([
            'status' => 200,
            'message' => 'Product fetched successfully.',
            'data' => $product,
            'productPorts' => $productPortsId
        ], 200);
    }
    //This method will update a single product
    public function update($id, Request $request)
    {
        $product = Product::find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',

            ], 404);
        }

        $validator = Validator::make($request->all(), [
            "title" => "required",
            "price" => "required|numeric",
            "category" => "required|integer",
            // "sku"=> "required|unique:products,sku,".$id.'id',
            "is_featured" => "required",
            "status" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ], 400);
        }

        //Store the product in db

        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        // $product->sku=$request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;

        // $product->barcode=$request->barcode;
        $product->is_featured = $request->is_featured;
        $product->save();

        if (!empty($request->ports)) {
            ProductSpec::where('product_id', $product->id)->delete();
            foreach ($request->ports as $portId) {
                $productPort = new ProductSpec();
                $productPort->port_id = $portId;
                $productPort->product_id = $product->id;
                $productPort->save();
            }
        }

        return response()->json([
            'status' => 200,
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }
    //This method will delete a single product
    public function destroy($id)
    {
        $product = Product::with('product_images')->find($id);

        if ($product == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.',
            ], 404);
        }
        $product->delete();

        if ($product->product_images) {
            foreach ($product->product_images as $productImage) {
                $largeThumbPath = public_path('uploads/products/largeThumb/' . $productImage->image);
                $smallThumbPath = public_path('uploads/products/smallThumb/' . $productImage->image);

                // Check and delete large thumbnail
                if (File::exists($largeThumbPath)) {
                    File::delete($largeThumbPath);
                }

                // Check and delete small thumbnail
                if (File::exists($smallThumbPath)) {
                    File::delete($smallThumbPath);
                }

                // Optionally delete the ProductImage record
                $productImage->delete();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Product deleted successfully',
        ], 200);
    }

    public function saveProductImage(Request $request)
    {
        $validator = Validator::make(request()->all(), [
            'image' => 'required|image|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->errors(),
            ], 400);
        }





        $image = $request->file('image');
        $imageName = $request->product_id . '-' . time() . '.' . $image->extension();  //25323763.jpg







        // Large Thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->scaleDown(1200);
        $img->save(public_path('uploads/products/largeThumb/' . $imageName));

        //Small Thumbnail

        $manager = new ImageManager(Driver::class);
        $img = $manager->read($image->getPathName());
        $img->coverDown(400, 460);
        $img->save(public_path('uploads/products/smallThumb/' . $imageName));

        // Insert a record in product_images tables
        $productImage = new ProductImage();
        $productImage->image = $imageName;
        $productImage->product_id = $request->product_id;
        $productImage->save();



        return response()->json([
            'status' => 200,
            'message' => 'Product Image added successfully',
            'data' => $productImage,

        ], 200);
    }

    public function updateDefaultImage(Request $request)
    {
        $product = Product::find($request->product_id);
        $product->image = $request->image;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => 'Product Default Image Changed successfully',


        ], 200);
    }
    public function deleteProductImage($id)
    {
        $productImage = ProductImage::find($id);
        if ($productImage == null) {
            return response()->json([
                'status' => 404,
                'message' => 'Image not Found',


            ], 404);
        }
        File::delete(public_path('uploads/products/largeThumb/' . $productImage->image));
        File::delete(public_path('uploads/products/smallThumb/' . $productImage->image));

        $productImage->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Product Image deleted successfully',


        ], 200);
    }


    /**
     * Validate cart quantities against current stock (for checkout).
     */
    public function validateCart(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        $items = $request->input('items');
        $errors = [];

        foreach ($items as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $available = min($product->qty, 10); // Enforce max 10 per item
                if ($available === 0) {
                    $errors[] = [
                        'product_id' => $item['product_id'],
                        'message' => "{$product->title} is out of stock."
                    ];
                } elseif ($item['qty'] > $available) {
                    $errors[] = [
                        'product_id' => $item['product_id'],
                        'message' => "Quantity exceeds available stock. Only {$available} available for {$product->title}."
                    ];
                }
            } else {
                $errors[] = [
                    'product_id' => $item['product_id'],
                    'message' => 'Product not found.'
                ];
            }
        }

        if (!empty($errors)) {
            return response()->json(['status' => 422, 'errors' => $errors], 422);
        }

        return response()->json(['status' => 200, 'message' => 'Cart validated successfully.']);
    }
}
