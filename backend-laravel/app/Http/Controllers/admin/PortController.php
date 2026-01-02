<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Port;
use App\Http\Resources\PortResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class PortController extends Controller
{
    /**
     * Display a listing of the ports.
     */
    public function index(): JsonResponse
    {
        $ports = Port::orderBy('id', 'asc')->get();

        return response()->json([
            'status' => 200,
            'data'   => PortResource::collection($ports),
        ], 200);
    }

    /**
     * Store a newly created port.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:ports,name',
        ]);

        $port = Port::create($validated);

        return response()->json([
            'status'  => 201,
            'message' => 'Color created successfully',
            'data'    => new PortResource($port),
        ], 201);
    }

    /**
     * Display the specified port.
     */
    public function show(Port $port): JsonResponse
    {
        return response()->json([
            'status' => 200,
            'data'   => new PortResource($port),
        ], 200);
    }

    /**
     * Update the specified port.
     */
    public function update(Request $request, Port $port): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:ports,name,' . $port->id,
        ]);

        $port->update($validated);

        return response()->json([
            'status'  => 200,
            'message' => 'Color updated successfully',
            'data'    => new PortResource($port),
        ], 200);
    }

    /**
     * Remove the specified port.
     */
    public function destroy(Port $port): JsonResponse
    {
        $port->delete();

        return response()->json([
            'status'  => 200,
            'message' => 'Color deleted successfully',
        ], 200);
    }
}