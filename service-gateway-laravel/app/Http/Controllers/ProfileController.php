<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load(['profile', 'allergies', 'preferences']);

        return response()->json([
            'user' => $user
        ]);
    }

    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        
        if ($request->has('name')) {
            $user->update(['name' => $request->name]);
        }

        $profileData = $request->only([
            'phone', 'address', 'city', 'postal_code', 'country', 'dietary_restrictions'
        ]);

        if (!empty($profileData)) {
            $user->profile()->updateOrCreate(
                ['user_id' => $user->id],
                $profileData
            );
        }

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user' => $user->load(['profile', 'allergies', 'preferences'])
        ]);
    }

    public function updateAllergies(Request $request): JsonResponse
    {
        $request->validate([
            'allergies' => 'required|array',
            'allergies.*.allergen' => 'required|string',
            'allergies.*.severity' => 'required|in:low,medium,high',
        ]);

        $user = $request->user();
        $user->allergies()->delete();

        foreach ($request->allergies as $allergy) {
            $user->allergies()->create($allergy);
        }

        return response()->json([
            'message' => 'Allergies mises à jour avec succès',
            'allergies' => $user->allergies
        ]);
    }

    public function updatePreferences(Request $request): JsonResponse
    {
        $request->validate([
            'preferences' => 'required|array',
        ]);

        $user = $request->user();
        $user->preferences()->delete();

        foreach ($request->preferences as $key => $value) {
            $user->preferences()->create([
                'preference_key' => $key,
                'preference_value' => $value,
            ]);
        }

        return response()->json([
            'message' => 'Préférences mises à jour avec succès',
            'preferences' => $user->preferences
        ]);
    }
}
