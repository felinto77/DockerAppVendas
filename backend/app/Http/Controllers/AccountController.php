<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        // Verifica se o usuário está autenticado

        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Não autenticado'
            ], 401);
        }

        // Verifica as permissões 

        if ($request->user()->cannot('viewAny', User::class)) {
            return response()->json([
                'success' => false,
                'message' => 'Acesso não autorizado'
            ], 403);
        }

        //usuários paginados

        $users = User::select(['id', 'name', 'email', 'cpf', 'birthdate', 'created_at'])
                    ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $users
        ]);

        
        
    }
}