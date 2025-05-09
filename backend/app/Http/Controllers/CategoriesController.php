<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    //
    public function listar()
    {
        return response([[ "id" => 1, "name" => 'Bebidas', "icon" => '🥤' ],
        [ "id" => 2, "name" => 'Snacks', "icon" => '🍿' ],
        [ "id" => 3, "name" => 'Cafés', "icon" => '☕' ],
        [ "id" => 4, "name" => 'Biscoitos', "icon" => '🍪' ],
        [ "id" => 5, "name" => 'Chocolates', "icon" => '🍫' ],
        [ "id" => 6, "name" => 'Orgânicos', "icon" => '🌱' ],
        [ "id" => 7, "name" => 'Importados', "icon" => '🌎' ],
        [ "id" => 8, "name" => 'Promoções', "icon" => '🏷️' ],]);
    }
}
