<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    protected AuthService $authService;
    
    /**
     * Regex pour validation du mot de passe
     * - Au moins 12 caracteres
     * - Au moins une majuscule
     * - Au moins une minuscule
     * - Au moins un chiffre
     * - Au moins un caractere special parmi @$!%*?&#
     */
    private const PASSWORD_REGEX = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{12,}$/';

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Inscription d'un nouvel utilisateur.
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->register($request->validated());

            return response()->json([
                'message' => 'Utilisateur créé avec succès',
                'data' => $result,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la création de l\'utilisateur',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Connexion d'un utilisateur.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->login($request->validated());

            return response()->json([
                'message' => 'Connexion réussie',
                'data' => $result,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur d\'authentification',
                'errors' => $e->errors(),
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la connexion',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Déconnexion de l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $this->authService->logout($request->user());

            return response()->json([
                'message' => 'Déconnexion réussie',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la déconnexion',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Obtenir les informations de l'utilisateur connecté.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse
    {
        try {
            $user = $this->authService->me($request->user());

            return response()->json([
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération des informations utilisateur',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
