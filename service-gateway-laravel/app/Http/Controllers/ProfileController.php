<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\UserAllergy;
use App\Models\UserPreference;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Obtenir le profil de l'utilisateur connecté.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        try {
            $user = $request->user()->load(['profile', 'allergies', 'preferences']);

            return response()->json([
                'data' => $user,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération du profil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mettre à jour le profil de l'utilisateur.
     *
     * @param ProfileUpdateRequest $request
     * @return JsonResponse
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        try {
            $user = $request->user();
            $validated = $request->validated();

            // Mettre à jour le nom et l'email de l'utilisateur si fournis
            if (isset($validated['name']) || isset($validated['email'])) {
                $user->update([
                    'name' => $validated['name'] ?? $user->name,
                    'email' => $validated['email'] ?? $user->email,
                ]);
            }

            // Mettre à jour le budget du profil si fourni
            if (isset($validated['budget'])) {
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    ['budget' => $validated['budget']]
                );
            }

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'data' => $user->load('profile'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du profil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Gérer les allergies de l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updateAllergies(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'allergies' => 'required|array',
            'allergies.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = $request->user();
            
            // Supprimer les anciennes allergies
            $user->allergies()->delete();
            
            // Ajouter les nouvelles allergies
            foreach ($request->allergies as $allergen) {
                $user->allergies()->create([
                    'allergen' => $allergen,
                ]);
            }

            return response()->json([
                'message' => 'Allergies mises à jour avec succès',
                'data' => $user->load('allergies'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour des allergies',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Gérer les préférences de l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updatePreferences(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'preferences' => 'required|array',
            'preferences.*' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = $request->user();
            
            // Supprimer les anciennes préférences
            $user->preferences()->delete();
            
            // Ajouter les nouvelles préférences
            foreach ($request->preferences as $preference) {
                $user->preferences()->create([
                    'preference' => $preference,
                ]);
            }

            return response()->json([
                'message' => 'Préférences mises à jour avec succès',
                'data' => $user->load('preferences'),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour des préférences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
