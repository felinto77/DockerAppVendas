<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function listar(Request $request)
    {
        $categoryId = $request->query("category_id");
        
        $query = DB::table("products")->select(['id', 'name', 'price', 'category_id']);
        
        if ($categoryId) {
            $query->where("category_id", $categoryId);
        }
        
        $produtos = $query->get();
        
        return response()->json($produtos)
               ->header('Access-Control-Allow-Origin', '*');
    }

    public function cadastrar(Request $request)
    {
        $productId = DB::table("products")->insertGetId($request->all());
        
        return response()->json(['id' => $productId], 201)
               ->header('Access-Control-Allow-Origin', '*');
    }

    public function atualizar(Request $request, $id)
    {
        $updated = DB::table("products")
                  ->where("id", $id)
                  ->update($request->all());
        
        return response()->json(['success' => (bool)$updated])
               ->header('Access-Control-Allow-Origin', '*');
    }

    public function deletar($id)
    {
        $deleted = DB::table("products")->where("id", $id)->delete();
        
        return response()->json(['success' => (bool)$deleted])
               ->header('Access-Control-Allow-Origin', '*');
    }
}