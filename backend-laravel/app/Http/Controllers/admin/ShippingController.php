<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\ShippingCharge;
use Illuminate\Http\Request;
use Validator;

class ShippingController extends Controller
{
    //
    public function getShipping(){
        $shipping = ShippingCharge::first();
        return response()->json([
            'status'=>200,
            'data' => $shipping
        ]);
    }
    public function updateShipping(Request $request){
        $validator=\Illuminate\Support\Facades\Validator::make($request->all(),[
            'shipping_charge' => 'required|numeric'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'errors' => $validator->errors()
            ]);
        }
        ShippingCharge::updateOrInsert([
            'id'=>1
        ],[
            'shipping_charge'=>$request->shipping_charge
        ]);
        // $shipping=ShippingCharge::find(1);
        // if($shipping==null){
        //     $model = new ShippingCharge();
        //    $model->shipping_charge = $request->shipping_charge;
        //     $model->save();
        //     return response()->json([
        //         'status'=>200,
        //         'data' => "Shipping charge saved successfully!"
        //     ]);
        // }
        // else{
        //     $shipping->shipping_charge = $request->shipping_charge;
        //     $shipping->save();
        
        // }
       
       
        return response()->json([
            'status'=>200,
            'message' => 'Shipping charge saved successfully!'
        ]);
    }
}
