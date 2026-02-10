<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProfileController extends Controller
{
    /**
     * Affichage du profil de l'utilisateur avec allergies et préférences
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request)
    {
        try {
            // Récupération du profil avec les relations
            $profile = $request->user()->profile()
                ->with(['allergies', 'preferences'])
                ->first();

            if (!$profile) {
                return response()->json([
                    'message' => 'Profil non trouvé',
                ], 404);
            }

            return response()->json([
                'profile' => $profile,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la récupération du profil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Mise à jour du profil utilisateur
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'dietary_restrictions' => 'nullable|string',
                'favorite_cuisine' => 'nullable|string',
                'phone' => 'nullable|string|max:20',
                'address' => 'nullable|string',
            ]);

            // Récupération et mise à jour du profil
            $profile = $request->user()->profile;

            if (!$profile) {
                return response()->json([
                    'message' => 'Profil non trouvé',
                ], 404);
            }

            $profile->update($validated);

            return response()->json([
                'message' => 'Profil mis à jour avec succès',
                'profile' => $profile->fresh(),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la mise à jour du profil',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Gestion des allergies (ajout/suppression)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function manageAllergies(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'action' => 'required|in:add,remove',
                'allergy_ids' => 'required|array',
                'allergy_ids.*' => 'integer|exists:allergies,id',
            ]);

            $profile = $request->user()->profile;

            if (!$profile) {
                return response()->json([
                    'message' => 'Profil non trouvé',
                ], 404);
            }

            // Ajout ou suppression des allergies
            if ($validated['action'] === 'add') {
                $profile->allergies()->syncWithoutDetaching($validated['allergy_ids']);
                $message = 'Allergies ajoutées avec succès';
            } else {
                $profile->allergies()->detach($validated['allergy_ids']);
                $message = 'Allergies supprimées avec succès';
            }

            return response()->json([
                'message' => $message,
                'allergies' => $profile->allergies()->get(),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la gestion des allergies',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Gestion des préférences (ajout/suppression)
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function managePreferences(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'action' => 'required|in:add,remove',
                'preference_ids' => 'required|array',
                'preference_ids.*' => 'integer|exists:preferences,id',
            ]);

            $profile = $request->user()->profile;

            if (!$profile) {
                return response()->json([
                    'message' => 'Profil non trouvé',
                ], 404);
            }

            // Ajout ou suppression des préférences
            if ($validated['action'] === 'add') {
                $profile->preferences()->syncWithoutDetaching($validated['preference_ids']);
                $message = 'Préférences ajoutées avec succès';
            } else {
                $profile->preferences()->detach($validated['preference_ids']);
                $message = 'Préférences supprimées avec succès';
            }

            return response()->json([
                'message' => $message,
                'preferences' => $profile->preferences()->get(),
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erreur de validation',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de la gestion des préférences',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
