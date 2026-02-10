<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;

class MenuClient
{
    protected Client $client;
    protected string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.menu.url');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => config('services.menu.timeout'),
            'http_errors' => false,
        ]);
    }

    /**
     * Effectuer une requête GET vers le service Menu.
     *
     * @param string $path
     * @param array $query
     * @param array $headers
     * @return array
     */
    public function get(string $path, array $query = [], array $headers = []): array
    {
        try {
            $response = $this->client->get($path, [
                'query' => $query,
                'headers' => $headers,
            ]);

            return $this->parseResponse($response);
        } catch (GuzzleException $e) {
            Log::error('Erreur lors de la requête GET au service Menu', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 500,
                'body' => ['error' => 'Erreur de communication avec le service Menu'],
                'headers' => [],
            ];
        }
    }

    /**
     * Effectuer une requête POST vers le service Menu.
     *
     * @param string $path
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function post(string $path, array $data = [], array $headers = []): array
    {
        try {
            $response = $this->client->post($path, [
                'json' => $data,
                'headers' => $headers,
            ]);

            return $this->parseResponse($response);
        } catch (GuzzleException $e) {
            Log::error('Erreur lors de la requête POST au service Menu', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 500,
                'body' => ['error' => 'Erreur de communication avec le service Menu'],
                'headers' => [],
            ];
        }
    }

    /**
     * Effectuer une requête PUT vers le service Menu.
     *
     * @param string $path
     * @param array $data
     * @param array $headers
     * @return array
     */
    public function put(string $path, array $data = [], array $headers = []): array
    {
        try {
            $response = $this->client->put($path, [
                'json' => $data,
                'headers' => $headers,
            ]);

            return $this->parseResponse($response);
        } catch (GuzzleException $e) {
            Log::error('Erreur lors de la requête PUT au service Menu', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 500,
                'body' => ['error' => 'Erreur de communication avec le service Menu'],
                'headers' => [],
            ];
        }
    }

    /**
     * Effectuer une requête DELETE vers le service Menu.
     *
     * @param string $path
     * @param array $headers
     * @return array
     */
    public function delete(string $path, array $headers = []): array
    {
        try {
            $response = $this->client->delete($path, [
                'headers' => $headers,
            ]);

            return $this->parseResponse($response);
        } catch (GuzzleException $e) {
            Log::error('Erreur lors de la requête DELETE au service Menu', [
                'path' => $path,
                'error' => $e->getMessage(),
            ]);

            return [
                'status' => 500,
                'body' => ['error' => 'Erreur de communication avec le service Menu'],
                'headers' => [],
            ];
        }
    }

    /**
     * Analyser la réponse HTTP.
     *
     * @param $response
     * @return array
     */
    protected function parseResponse($response): array
    {
        $contentType = $response->getHeader('Content-Type')[0] ?? '';
        $body = (string) $response->getBody();

        // Déterminer le format de la réponse
        if (str_contains($contentType, 'application/json')) {
            $parsedBody = json_decode($body, true) ?? [];
        } elseif (str_contains($contentType, 'application/xml') || str_contains($contentType, 'text/xml')) {
            $parsedBody = ['xml' => $body];
        } else {
            $parsedBody = ['data' => $body];
        }

        return [
            'status' => $response->getStatusCode(),
            'body' => $parsedBody,
            'headers' => $response->getHeaders(),
        ];
    }
}
