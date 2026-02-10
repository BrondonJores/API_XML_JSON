<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class ProxyController extends Controller
{
    /**
     * Proxy vers le service de menus
     * 
     * @param Request $request
     * @param string $path
     * @return \Illuminate\Http\JsonResponse
     */
    public function proxyMeals(Request $request, $path = '')
    {
        try {
            // Configuration du client HTTP
            $client = new Client([
                'base_uri' => env('MENU_SERVICE_URL', 'http://service-menu-java:8080'),
                'timeout' => 30,
            ]);

            // Préparation des headers à transmettre
            $headers = [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ];

            // Ajout du token d'authentification si présent
            if ($request->bearerToken()) {
                $headers['Authorization'] = 'Bearer ' . $request->bearerToken();
            }

            // Construction de l'URL complète
            $url = '/api/meals/' . ltrim($path, '/');

            // Préparation des options de la requête
            $options = [
                'headers' => $headers,
                'query' => $request->query(),
            ];

            // Ajout du corps de la requête pour POST, PUT, PATCH
            if (in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
                $options['json'] = $request->all();
            }

            // Envoi de la requête au service distant
            $response = $client->request(
                $request->method(),
                $url,
                $options
            );

            // Retour de la réponse avec le même code de statut
            return response()->json(
                json_decode($response->getBody()->getContents(), true),
                $response->getStatusCode()
            );
        } catch (RequestException $e) {
            // Gestion des erreurs HTTP
            if ($e->hasResponse()) {
                return response()->json(
                    json_decode($e->getResponse()->getBody()->getContents(), true),
                    $e->getResponse()->getStatusCode()
                );
            }

            return response()->json([
                'message' => 'Erreur lors de la communication avec le service de menus',
                'error' => $e->getMessage(),
            ], 503);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur interne du proxy',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Proxy vers le service de commandes
     * 
     * @param Request $request
     * @param string $path
     * @return \Illuminate\Http\JsonResponse
     */
    public function proxyOrders(Request $request, $path = '')
    {
        try {
            // Configuration du client HTTP
            $client = new Client([
                'base_uri' => env('ORDERS_SERVICE_URL', 'http://service-orders-python:5000'),
                'timeout' => 30,
            ]);

            // Préparation des headers à transmettre
            $headers = [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ];

            // Ajout du token d'authentification si présent
            if ($request->bearerToken()) {
                $headers['Authorization'] = 'Bearer ' . $request->bearerToken();
            }

            // Construction de l'URL complète
            $url = '/api/orders/' . ltrim($path, '/');

            // Préparation des options de la requête
            $options = [
                'headers' => $headers,
                'query' => $request->query(),
            ];

            // Ajout du corps de la requête pour POST, PUT, PATCH
            if (in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
                $options['json'] = $request->all();
            }

            // Envoi de la requête au service distant
            $response = $client->request(
                $request->method(),
                $url,
                $options
            );

            // Retour de la réponse avec le même code de statut
            return response()->json(
                json_decode($response->getBody()->getContents(), true),
                $response->getStatusCode()
            );
        } catch (RequestException $e) {
            // Gestion des erreurs HTTP
            if ($e->hasResponse()) {
                return response()->json(
                    json_decode($e->getResponse()->getBody()->getContents(), true),
                    $e->getResponse()->getStatusCode()
                );
            }

            return response()->json([
                'message' => 'Erreur lors de la communication avec le service de commandes',
                'error' => $e->getMessage(),
            ], 503);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erreur interne du proxy',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
