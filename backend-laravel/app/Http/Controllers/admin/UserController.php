<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index(): JsonResponse
    {
        $users = User::orderBy('id', 'asc')->get();

        return response()->json([
            'status' => 200,
            'data'   => UserResource::collection($users),
        ], 200);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'email'         => 'required|string|email|max:255|unique:users',
            'password'      => 'required|string|min:8|confirmed',
            'role'          => 'sometimes|in:customer,admin',
            'address'       => 'nullable|string|max:255',
            'mobile'        => 'nullable|string|max:20',
            'city'          => 'nullable|string|max:100',
            'profile_image' => 'nullable|string|max:255',
            'zip'           => 'nullable|string|max:20',
            'state'         => 'nullable|string|max:100',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['role'] = $validated['role'] ?? 'customer';

        $user = User::create($validated);

        return response()->json([
            'status'  => 201,
            'message' => 'User created successfully',
            'data'    => new UserResource($user),
        ], 201);
    }

    /**
     * Display the specified user.
     */
    public function show(User $user): JsonResponse
    {
        return response()->json([
            'status' => 200,
            'data'   => new UserResource($user),
        ], 200);
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name'          => 'sometimes|required|string|max:255',
            'email'         => 'sometimes|required|string|email|max:255|unique:users,email,' . $user->id,
            'role'          => 'sometimes|in:customer,admin',
            'address'       => 'nullable|string|max:255',
            'mobile'        => 'nullable|string|max:20',
            'city'          => 'nullable|string|max:100',
            'profile_image' => 'nullable|string|max:255',
            'zip'           => 'nullable|string|max:20',
            'state'         => 'nullable|string|max:100',
        ]);

        $user->update($validated);

        return response()->json([
            'status'  => 200,
            'message' => 'User updated successfully',
            'data'    => new UserResource($user),
        ], 200);
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->json([
            'status'  => 200,
            'message' => 'User deleted successfully',
        ], 200);
    }

    /**
     * Change password for the authenticated user.
     */
   public function changePassword(Request $request): JsonResponse
{
    $validated = $request->validate([
        'current_password' => 'required|string',
        'password'         => 'required|string|min:6|confirmed',
    ]);

    $user = $request->user();  // Authenticated user

    if (!$user) {
        return response()->json([
            'status' => 401,
            'message' => 'Unauthenticated',
        ], 401);
    }

    if (!Hash::check($validated['current_password'], $user->password)) {
        throw ValidationException::withMessages([
            'current_password' => ['The provided password does not match our records.'],
        ]);
    }

    $user->password = Hash::make($validated['password']);
    $user->save();

    return response()->json([
        'status'  => 200,
        'message' => 'Password changed successfully',
    ]);
}
}