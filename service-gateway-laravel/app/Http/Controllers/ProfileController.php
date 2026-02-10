<?php

namespace App\Http\Controllers;

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
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|nullable|string|max:20',
            'address' => 'sometimes|nullable|string|max:255',
            'city' => 'sometimes|nullable|string|max:100',
            'postal_code' => 'sometimes|nullable|string|max:20',
            'country' => 'sometimes|nullable|string|max:100',
            'date_of_birth' => 'sometimes|nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = $request->user();

            // Mettre à jour le nom de l'utilisateur si fourni
            if ($request->has('name')) {
                $user->update(['name' => $request->name]);
            }

            // Mettre à jour le profil
            $profileData = $request->only(['phone', 'address', 'city', 'postal_code', 'country', 'date_of_birth']);
            if (!empty($profileData)) {
                $user->profile()->updateOrCreate(
                    ['user_id' => $user->id],
                    $profileData
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
     * Ajouter une allergie à l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addAllergy(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'allergy_name' => 'required|string|max:255',
            'severity' => 'nullable|string|in:low,medium,high',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $allergy = $request->user()->allergies()->create([
                'allergy_name' => $request->allergy_name,
                'severity' => $request->severity ?? 'medium',
            ]);

            return response()->json([
                'message' => 'Allergie ajoutée avec succès',
                'data' => $allergy,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'ajout de l\'allergie',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Supprimer une allergie de l'utilisateur.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function removeAllergy(Request $request, int $id): JsonResponse
    {
        try {
            $allergy = UserAllergy::where('id', $id)
                ->where('user_id', $request->user()->id)
                ->first();

            if (!$allergy) {
                return response()->json([
                    'message' => 'Allergie non trouvée',
                ], 404);
            }

            $allergy->delete();

            return response()->json([
                'message' => 'Allergie supprimée avec succès',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'allergie',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Ajouter une préférence à l'utilisateur.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addPreference(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'preference_key' => 'required|string|max:255',
            'preference_value' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $preference = $request->user()->preferences()->create([
                'preference_key' => $request->preference_key,
                'preference_value' => $request->preference_value,
            ]);

            return response()->json([
                'message' => 'Préférence ajoutée avec succès',
                'data' => $preference,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'ajout de la préférence',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Supprimer une préférence de l'utilisateur.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function removePreference(Request $request, int $id): JsonResponse
    {
        try {
            $preference = UserPreference::where('id', $id)
                ->where('user_id', $request->user()->id)
                ->first();

            if (!$preference) {
                return response()->json([
                    'message' => 'Préférence non trouvée',
                ], 404);
            }

            $preference->delete();

            return response()->json([
                'message' => 'Préférence supprimée avec succès',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la suppression de la préférence',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
